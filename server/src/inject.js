function removeArrayItems(list, count) {
  return list.slice(0, list.length - count);
}

class App {
  constructor() {
    setTimeout(() => {
      this.socket = io('http://localhost:4000');
      this.socket.emit('hello', 'Backend');
      this.sendContacts();
      this.sendContactsId = setInterval(() => this.sendContacts(), 5000);
      this.setSocketEvents();
    }, 4000);

    this.attendances = [];
  }

  setSocketEvents() {
    this.socket.on('findCurrentUser', this.findCurrentUser.bind(this));
    this.socket.on('sendMessage', this.sendMessage.bind(this));
  }

  async findCurrentUser(id) {
    try {
      window.log('Find user');

      const { contact } = WAPI.getChatById(id);

      const response = {
        id,
        name:
          contact.pushname ||
          contact.name ||
          contact.formattedName ||
          contact.shortName,
        avatar: contact.profilePicThumbObj.eurl,
        phoneNumber: contact.id.user,
      };

      const [online, messages] = await Promise.all([
        WAPI.isChatOnline(id),
        WAPI.getAllMessagesInChat(id, true),
      ]);

      // if (!WAPI.areAllMessagesLoaded(id)) {
      //   WAPI.loadAndGetAllMessagesInChat(id);
      // }

      response.online = online;
      response.messages = messages
        .filter(
          message =>
            Boolean(message.content) && !message.filename && !message.filehash
        )
        .map(message => ({
          timestamp: message.timestamp * 1000,
          text: message.content,
          myMessage: message.fromMe,
          type: message.subtype,
        }));

      this.socket.emit('findUserById', response);
    } catch (error) {
      window.log(`Error: ${error}`);
    }
  }

  sendMessage({ id, message }) {
    WAPI.sendMessage2(id, message);
  }

  async sendContacts() {
    try {
      const chats = await WAPI.getAllChatsWithMessages().then(JSON.parse);

      const contacts = await Promise.all(
        chats.map(
          chat =>
            new Promise(async resolve => {
              const { contact, isGroup } = WAPI.getChatById(chat.id);

              if (isGroup) {
                return resolve(null);
              }

              const response = {
                id: chat.id,
                name:
                  contact.pushname ||
                  contact.name ||
                  contact.formattedName ||
                  contact.shortName,
                avatar: contact.profilePicThumbObj.eurl,
                phoneNumber: contact.id.user,
                online: await WAPI.isChatOnline(chat.id),
              };

              return resolve(response);
            })
        )
      );

      this.socket.emit('sendContacts', contacts.filter(Boolean));
    } catch (error) {
      window.log(`Error: ${error}`);
    }
  }

  receiveMessage(message) {
    this.socket.emit('receiveMessage', message);
  }

  start() {
    this.waitNewMessages();
  }

  waitNewMessages() {
    WAPI.waitNewMessages(false, async messages => {
      for (const message of messages) {
        this.receiveMessage({
          timestamp: message.timestamp * 1000,
          text: message.content,
          myMessage: false,
          user: message.chat.id._serialized,
        });

        if (this.isBlockedMessage(message)) {
          continue;
        }

        const response = this.addNewAttendance(message);
        if (typeof response === 'string') {
          return WAPI.sendMessage2(message.chatId._serialized, response);
        }

        if (Array.isArray(response)) {
          return response.forEach(item =>
            WAPI.sendMessage2(message.chatId._serialized, item)
          );
        }
      }
    });
  }

  getResponse(attendance) {
    if (!attendance.started) {
      attendance.started = true;
      return this.getInitialMessage(messages, attendance);
    }

    try {
      return this.showOptions(attendance, 0, messages, messages);
    } catch (error) {
      window.log(`Ocorreu um erro: ${error}`);
      return 'Foi mal, deu um erro aqui';
    }
  }

  addNewAttendance(message) {
    let attendance = this.findAttendance(message);

    if (!attendance) {
      attendance = this.createAttendance(message);
    }

    attendance.messages.push({ text: message.body });

    this.attendances.push(attendance);
    return this.getResponse(attendance);
  }

  createAttendance(message) {
    return {
      id: message.from,
      createdAt: new Date().getTime(),
      customer: {
        id: message.from,
        name: message.sender.pushname,
        phoneNumber: message.from.replace('@c.us', ''),
      },
      finishedAt: null,
      messages: [],
      started: false,
    };
  }

  findAttendance(message) {
    return this.attendances.find(
      attendance =>
        attendance.customer.id === message.from &&
        attendance.finishedAt === null
    );
  }

  getSalution() {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) {
      return 'Bom dia';
    }

    if (hours < 18) {
      return 'Boa tarde';
    }

    return 'Boa noite';
  }

  isBlockedMessage(message) {
    if (
      intents.availableContacts.length > 0 &&
      !intents.availableContacts.includes(message.sender.name)
    ) {
      return true;
    }

    return message.isGroupMsg || message.type !== 'chat';
  }

  leftPad(value, totalWidth, paddingChar = '0') {
    const length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar) + value;
  }

  showOptions(attendance, index, option, parent = null) {
    const value = parseInt(attendance.messages[index].text, 10);

    if (!option.parent) {
      option.parent = parent;
    }

    const choose = index === 0 ? option : option.options[value];

    if (!choose) {
      return this.handleInvalidOption(attendance, index, option, parent);
    }

    if (index !== 0 && choose.options && choose.options.back !== true) {
      this.createBackOptions(choose, attendance, index, option);
    }

    if (choose.action) {
      return this.handleOptionAction(choose, attendance);
    }

    if (!choose.options) {
      return this.handleOptionNotImplemented(attendance, index, option, parent);
    }

    if (attendance.messages.length - 1 > index) {
      return this.showOptions(attendance, index + 1, choose, option);
    }

    return this.getMessageFromOptions(choose.options);
  }

  handleOptionNotImplemented(attendance, index, option, parent) {
    attendance.messages = removeArrayItems(attendance.messages, 1);
    return [
      'Opção não implementada ainda',
      this.showOptions(attendance, index - 1, option, parent),
    ];
  }

  handleOptionAction(option, attendance) {
    if (typeof option.action === 'string') {
      if (!this[option.action]) {
        throw new Error(`${option.action} is not a function`);
      }

      return this[option.action](attendance);
    }

    return option.action();
  }

  getMessageFromOptions(options) {
    return `Escolha uma opção:

    ${Object.values(options)
      .map(item => item.message)
      .join('\n')}
    `
      .split('\n')
      .map(item => item.trim())
      .join('\n');
  }

  createBackOptions(option, attendance, index, parent) {
    option.options = {
      ...option.options,
      back: true,
      [Object.keys(option.options).length + 1]: {
        message: `${this.leftPad(
          Object.keys(option.options).length + 1,
          2
        )} - Voltar uma opção`,
        value: Object.keys(option.options).length + 1,
        action: () => {
          attendance.messages = removeArrayItems(attendance.messages, 2);
          return this.showOptions(attendance, index - 1, parent);
        },
      },
    };
  }

  handleInvalidOption(attendance, index, option, parent) {
    attendance.messages = removeArrayItems(attendance.messages, 1);
    return [
      'Opção inválida',
      this.showOptions(attendance, index - 1, option, parent),
    ];
  }

  getInitialMessage({ message, options }, attendance) {
    return `${message
      .join('\n')
      .replace('{SAUDACAO}', this.getSalution())
      .replace('{NAME}', attendance.customer.name)}

    ${Object.values(options)
      .filter(Boolean)
      .map(op => op.message)
      .join('\n')};
    `
      .split('\n')
      .map(item => item.trim())
      .join('\n');
  }

  finishAttendance(attendance) {
    attendance.finishedAt = new Date().getTime();
    return `Ok, estou encerrando seu atendimento por aqui, muito obrigado! 🖖`;
  }
}
const app = new App();
app.start();
