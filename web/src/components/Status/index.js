import React from "react";

import { Container } from "./styles";

function Status({ online, children }) {
  return <Container online={online}>{children}</Container>;
}

export default Status;
