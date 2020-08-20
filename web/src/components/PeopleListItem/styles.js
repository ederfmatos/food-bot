import styled from "styled-components";

export const Container = styled.li`
  list-style: none;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-space-between;
  align-content: center;
  cursor: pointer;
  position: relative;
  padding: 4px;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    transition: all 0.2s;
    left: 0;
    border-radius: 8px;
  }
`;

export const PeopleAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
  border: 2px solid ${(props) => (props.online ? "green" : "red")};

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const AboutContainer = styled.div`
  margin-top: 8px;
  padding-left: 8px;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span``;
