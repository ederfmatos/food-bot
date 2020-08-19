import React, { useEffect } from "react";

import { PeopleListItem, Chat } from "../../components";
import { Container, PeopleList, PeopleListContent } from "./styles";
import { useSocket } from "../../contexts/socket";

export default function Home() {
  const users = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  const socket = useSocket();

  return (
    <Container>
      <PeopleList>
        <div className="search">
          <input type="text" placeholder="Pesquisar por cliente" />
        </div>

        <PeopleListContent>
          {users.map((user) => (
            <PeopleListItem key={user} user={user} />
          ))}
        </PeopleListContent>
      </PeopleList>

      <Chat />
    </Container>
  );
}
