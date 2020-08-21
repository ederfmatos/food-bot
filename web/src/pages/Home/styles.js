import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const PeopleList = styled.aside`
  width: 280px;

  .search {
    padding: 20px;
  }

  input {
    border-radius: 3px;
    border: none;
    padding: 14px;
    color: white;
    background: #6a6c75;
    width: 100%;
    font-size: 14px;

    ::placeholder {
      color: white;
    }
  }

  .fa-search {
    position: relative;
    left: -25px;
  }
`;

export const PeopleListContent = styled.ul`
  padding: 20px 5px;
  max-height: 715px;
  padding-left: 20px;
  overflow-y: auto !important;

  ::-webkit-scrollbar-track {
    background: #92959e;
  }

  ::-webkit-scrollbar-thumb {
    background: #1e1f2666;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
`;
