import React from "react";

import { Container, PeopleAvatar, AboutContainer, Name } from "./styles";

import Status from "../Status";

function PeopleListItem({ user, ...rest }) {
  return (
    <Container {...rest}>
      <PeopleAvatar
        src={
          user.avatar ||
          "https://api.adorable.io/avatars/245/abott@adorable.png"
        }
        alt="avatar"
        online={user.online}
      />

      <AboutContainer>
        <Name>{user.name}</Name>

        <Status online={user.online} />
      </AboutContainer>
    </Container>
  );
}

export default PeopleListItem;
