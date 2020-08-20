import React from "react";

import { Container } from "./styles";

function Status({ online }) {
  return <Container online={online}>{online ? "Online" : "Offline"}</Container>;
}

export default Status;
