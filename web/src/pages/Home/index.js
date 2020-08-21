import React from "react";

import { PeopleListItem, Chat } from "../../components";
import { Container, PeopleList, PeopleListContent } from "./styles";
import { useSocket } from "../../contexts/socket";

export default function Home() {
  const { chats, setCurrentUser } = useSocket();

  return (
    <Container>
      <PeopleList>
        <div className="search">
          <input type="text" placeholder="Pesquisar por cliente" />
        </div>

        <PeopleListContent>
          {chats.map((chat) => (
            <PeopleListItem
              key={chat.id}
              user={chat}
              onClick={() => setCurrentUser(chat)}
            />
          ))}
        </PeopleListContent>
      </PeopleList>

      <Chat />
    </Container>
  );
}
