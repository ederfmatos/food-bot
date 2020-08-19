import React from "react";

import { Container, PeopleAvatar, AboutContainer, Name } from "./styles";

import Status from "../Status";

function PeopleListItem({ user }) {
  return (
    <Container>
      <PeopleAvatar
        src="https://pm1.narvii.com/6410/289cb2566499e20940047f14775d8d3b2bb8ce08_00.jpg"
        alt="avatar"
      />

      <AboutContainer>
        <Name>Irireu da Silva</Name>

        <Status online={true}>online</Status>
      </AboutContainer>
    </Container>
  );
}

export default PeopleListItem;
