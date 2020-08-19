import styled from "styled-components";

export const Container = styled.span`
  color: gray;
  position: relative;
  padding-left: 20px;

  &::after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    background: ${(props) => (props.online ? "green" : "red")};
    bottom: 5px;
    left: 0;
  }
`;
