WAPI.waitNewMessages(false, async messages => {
  for (let i = 0; i < messages.length; i++) {
    debugger;
    let message = messages[i];

    window.log(`Message from ${message.chatId.user} checking..`);

    if (intents.blocked.indexOf(message.chatId.user) >= 0) {
      window.log('number is blocked by BOT. no reply');
      return;
    }

    if (message.type == 'chat') {
      if (message.isGroupMsg == true) {
        window.log(
          'Message received in group and group reply is off. so will not take any actions.'
        );
        return;
      }

      const exactMatch = intents.bot.find(obj =>
        obj.exact.find(ex => ex == message.body.toLowerCase())
      );

      let response = '';
      if (exactMatch != undefined) {
        response = await resolveSpintax(exactMatch.response);
        window.log(`Replying with ${response}`);
      } else {
        response = await resolveSpintax(intents.noMatch);
        window.log(
          `No exact match found. So replying with ${response} instead`
        );
      }

      const PartialMatch = intents.bot.find(obj =>
        obj.contains.find(ex => message.body.toLowerCase().search(ex) > -1)
      );

      if (PartialMatch != undefined) {
        response = await resolveSpintax(PartialMatch.response);
        window.log(`Replying with ${response}`);
      } else {
        console.log('No partial match found');
      }

      WAPI.sendSeen(message.chatId._serialized);
      WAPI.sendMessage2(message.chatId._serialized, response);

      if ((exactMatch || PartialMatch).file != undefined) {
        window
          .getFile((exactMatch || PartialMatch).file)
          .then(base64Data => {
            WAPI.sendImage(
              base64Data,
              message.chatId._serialized,
              (exactMatch || PartialMatch).file
            );
          })
          .catch(error => {
            window.log('Error in sending file\n' + error);
          });
      }
    }
  }
});
