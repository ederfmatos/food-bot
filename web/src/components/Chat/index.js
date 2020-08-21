import React, { useEffect, createRef, useCallback, useState } from "react";

import {
  Container,
  Header,
  UserAvatar,
  AboutContainer,
  UserName,
  ChatHistory,
  Message,
  MessageText,
  MessageTime,
  Footer,
  TextArea,
  SendButton,
  ToggleBotButton,
} from "./styles";

import { Status, Dropdown } from "../";
import { useSocket } from "../../contexts/socket";
const { remote } = window.require("electron");

const dropdownItems = [
  {
    key: "block_user",
    label: "Bloquear Usuário",
  },
  {
    key: "minimize",
    label: "Minimizar",
    onClick: () => remote.getCurrentWindow().minimize(),
  },
  {
    key: "close",
    label: "Fechar",
    onClick: () => remote.getCurrentWindow().close(),
  },
];

function Chat() {
  const [message, setMessage] = useState("");
  const historyRef = createRef();

  const { addMessage, currentUser, emit } = useSocket();

  const sendMessage = useCallback(() => {
    emit("sendMessage", { id: currentUser.id, message });

    addMessage({
      myMessage: true,
      text: message,
      timestamp: new Date().getTime(),
    });
  }, [message]);

  useEffect(() => {
    setMessage("");

    if (historyRef.current) {
      historyRef.current.scrollTo(0, historyRef.current.scrollHeight);
    }
  }, [currentUser, currentUser.messages]);

  return (
    <Container>
      <Header>
        <UserAvatar
          src={
            currentUser.avatar ||
            "https://api.adorable.io/avatars/245/abott@adorable.png"
          }
          online={currentUser.online}
          alt="avatar"
        />
        <AboutContainer>
          <UserName>{currentUser.name}</UserName>
          <Status online={currentUser.online} />
        </AboutContainer>

        <Dropdown id="dropdown_actions" items={dropdownItems}>
          <ToggleBotButton />
        </Dropdown>
      </Header>

      <ChatHistory ref={historyRef}>
        {(currentUser.messages || []).map((message, index) => (
          <Message key={`message-${currentUser.name}-${index}`}>
            <MessageTime myMessage={message.myMessage}>
              {new Date(message.timestamp).toLocaleTimeString()}
            </MessageTime>

            <MessageText myMessage={message.myMessage}>
              {message.text}
            </MessageText>
          </Message>
        ))}
      </ChatHistory>

      <Footer>
        <TextArea
          placeholder="Sua mensagem aqui"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={(event) => {
            if (event.keyCode == 13 && message) {
              sendMessage();
            }
          }}
        ></TextArea>

        <SendButton disabled={!Boolean(message)} onClick={sendMessage}>
          Enviar
        </SendButton>
      </Footer>
    </Container>
  );
}

export default Chat;
