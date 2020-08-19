import styled from "styled-components";

export const Container = styled.ul`
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 1;

  padding-top: ${(props) => (props.visible ? "25px" : 0)};
`;

export const DropdownItem = styled.li`
  border: 1px solid #44475366;
  border-top-width: 0;
  width: 100%;
  text-align: center;
  padding: 10px 20px;
  background: #f9f9f9;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #444753;
    color: #fff;
  }

  &:first-of-type {
    border-top-width: 1px;
    margin-top: 5px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-of-type {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
