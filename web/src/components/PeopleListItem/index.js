import React from "react";

import { Container, PeopleAvatar, AboutContainer, Name } from "./styles";

import Status from "../Status";

function PeopleListItem({ user }) {
  return (
    <Container>
      <PeopleAvatar
        src={
          user.avatar ||
          "https://api.adorable.io/avatars/245/abott@adorable.png"
        }
        alt="avatar"
      />

      <AboutContainer>
        <Name>{user.name}</Name>

        <Status online={true}>online</Status>
      </AboutContainer>
    </Container>
  );
}

export default PeopleListItem;
