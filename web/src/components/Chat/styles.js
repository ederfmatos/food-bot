import styled, { css } from "styled-components";

import { lighten, darken } from "polished";
import { gray, green, blue } from "../../styles/colors";

export const Container = styled.div`
  width: 920px;
  background: #f2f5f8;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  color: #434651;
`;

export const Header = styled.header`
  padding: 20px;
  border-bottom: 2px solid white;
  display: flex;
`;

export const UserAvatar = styled.img`
  width: 50px;
  border-radius: 50%;
  position: relative;
  border: 2px solid ${green};

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: red;
  }
`;

export const AboutContainer = styled.div`
  padding-left: 20px;
  margin-top: 6px;
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

export const ChatHistory = styled.ul`
  padding: 30px 30px 20px;
  border-bottom: 2px solid white;
  overflow: hidden;
  overflow-y: scroll;
  height: 600px;

  ::-webkit-scrollbar-track {
    background: #cccccc99;
  }

  ::-webkit-scrollbar-thumb {
    background: ${darken(0.01, "#999")};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
`;

export const Message = styled.li`
  margin-bottom: 15px;
  min-height: 80px;
`;

export const MessageText = styled.span`
  color: white;
  padding: 18px 20px;
  font-size: 16px;
  border-radius: 7px;
  background: ${green};
  min-width: 200px;
  max-width: 70%;
  display: inline-block;

  ${(props) =>
    props.myMessage &&
    css`
      float: right;
      background: ${blue};
    `}
`;

export const MessageTime = styled.time`
  color: ${lighten(0.6, gray)};
  display: block;
  margin-bottom: 5px;
  position: relative;

  ${(props) =>
    props.myMessage &&
    css`
      right: -760px;
    `}
`;

export const Footer = styled.footer`
  width: 100%;
  height: 105px;
  padding: 10px 20px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TextArea = styled.textarea`
  width: 90%;
  max-width: 90%;
  min-width: 90%;
  height: 80px;
  max-height: 80px;
  min-height: 80px;
  border: none;
  padding: 10px;
`;

export const SendButton = styled.button`
  height: 80px;
  width: 75px;
  border: none;
  cursor: pointer;
  background: #fff;
  transition: all 0.2s;
  border-radius: 8px;

  &:hover {
    background: #ddd;
  }
`;
