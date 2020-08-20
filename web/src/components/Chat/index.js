import React from "react";

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

function Chat({ user }) {
  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

      <ChatHistory>
        {messages.map((message, index) => (
          <Message key={message}>
            <MessageTime myMessage={index % 2 === 0}>
              22:27:13, Hoje
            </MessageTime>
            <MessageText myMessage={index % 2 === 0}>
              Essa é uma mensagem automatica hgbfdbdjklfb fhbdfjdh fldkjfbd
              {index === 3 &&
                "bjvkdjvsdb hgbs s bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  bjvkdjvsdb hgbs s  "}
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
