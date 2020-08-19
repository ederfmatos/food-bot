import React from "react";

import { PeopleListItem, Chat } from "../../components";
import { Container, PeopleList, PeopleListContent } from "./styles";

export default function Home() {
  const users = [1, 2, 3, 4, 5, 6, 7, 8, 0];

  return (
    <Container>
      <PeopleList>
        <div class="search">
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
