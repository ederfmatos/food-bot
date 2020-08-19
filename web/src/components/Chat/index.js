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
} from "./styles";

import Status from "../Status";

function Chat() {
  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Container>
      <Header>
        <UserAvatar
          src="https://pm1.narvii.com/6410/289cb2566499e20940047f14775d8d3b2bb8ce08_00.jpg"
          alt="avatar"
        />

        <AboutContainer>
          <UserName>Irineu da Silva</UserName>
          <Status online={true}>Online</Status>
        </AboutContainer>
      </Header>

      <ChatHistory>
        {messages.map((message, index) => (
          <Message>
            <MessageTime myMessage={index % 2 === 0}>
              22:27:13, Hoje
            </MessageTime>
            <MessageText myMessage={index % 2 === 0}>
              Essa é uma mensagem automatica
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
