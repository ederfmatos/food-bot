import React, { useState, useCallback, useEffect, createRef } from "react";

import { Container, DropdownItem } from "./styles";

function Dropdown({ items, children, id }) {
  const [visible, setVisible] = useState(false);
  const container = createRef();

  const handleButtonClick = useCallback(() => {
    setVisible((val) => !val);
  }, [setVisible]);

  const handleClickOutside = useCallback(
    (event) => {
      if (container.current && !container.current.contains(event.target)) {
        setVisible(false);
      }
    },
    [container]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleItemClick = useCallback((event, item) => {
    event.preventDefault();
    event.stopPropagation();

    return (
      (item.onClick && item.onClick() && setVisible(false)) || setVisible(false)
    );
  }, []);

  return (
    <Container
      id={id}
      visible={visible}
      onClick={handleButtonClick}
      ref={container}
    >
      {children}

      {visible &&
        items.map((item) => (
          <DropdownItem
            key={item.key}
            onClick={(e) => handleItemClick(e, item)}
          >
            {item.label}
          </DropdownItem>
        ))}
    </Container>
  );
}

export default Dropdown;
