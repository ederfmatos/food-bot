import styled, { css } from "styled-components";
import { FaBars } from "react-icons/fa";
import { lighten, darken } from "polished";
import { gray, green, blue } from "../../styles/colors";

export const Container = styled.main`
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

  #dropdown_actions {
    position: absolute;
    right: 15px;
    top: 30px;
  }
`;

export const UserAvatar = styled.img`
  width: 50px;
  border-radius: 50%;
  position: relative;
  border: 2px solid ${(props) => (props.online ? green : "red")};
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
  scroll-behavior: auto;
  display: flex;
  flex-direction: column;

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
  margin: 10px 0;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${(props) =>
    props.myMessage &&
    css`
      align-items: flex-end;
    `};
`;

export const MessageText = styled.span`
  color: white;
  padding: 18px 20px;
  font-size: 16px;
  border-radius: 7px;
  background: ${green};
  /* min-width: 200px; */
  max-width: 70%;
  word-break: break-all;
  white-space: pre-line;

  ${(props) =>
    props.myMessage &&
    css`
      background: ${blue};
    `};
`;

export const MessageTime = styled.time`
  color: ${lighten(0.6, gray)};
  margin-bottom: 5px;
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

  &:disabled {
    cursor: not-allowed;
    pointer-events: all !important;
    background: #eee;

    &:hover {
      background: #eee !important;
    }
  }

  &:hover {
    background: #ddd;
  }
`;

export const ToggleBotButton = styled(FaBars)`
  font-size: 26px;
  position: absolute;
  right: 15px;
  top: 0px;
  cursor: pointer;
`;
