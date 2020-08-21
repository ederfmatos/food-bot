import React, { useEffect, createRef } from "react";

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

function Chat({ user }) {
  const historyRef = createRef();

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTo(0, historyRef.current.scrollHeight);
    }
  }, [user, user.messages]);

  return (
    <Container>
      <Header>
        <UserAvatar
          src={
            user.avatar ||
            "https://api.adorable.io/avatars/245/abott@adorable.png"
          }
          online={user.online}
          alt="avatar"
        />
        <AboutContainer>
          <UserName>{user.name}</UserName>
          <Status online={user.online} />
        </AboutContainer>

        <Dropdown id="dropdown_actions" items={dropdownItems}>
          <ToggleBotButton />
        </Dropdown>
      </Header>

      <ChatHistory ref={historyRef}>
        {(user.messages || []).map((message, index) => (
          <Message key={`message-${user.name}-${index}`}>
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
        <TextArea placeholder="Sua mensagem aqui"></TextArea>
        <SendButton>Enviar</SendButton>
      </Footer>
    </Container>
  );
}

export default Chat;
