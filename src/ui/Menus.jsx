import { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
//test

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) =>
    props.position
      .x}px; //* passing in coordinates of the button to position the menu directly under.
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null); //* stored here so we can pass it to the list component from the toggle component
  const closeMenu = () => setOpenId("");
  // const openMenu = setOpenId //* simplified ver 1.
  // const openMenu = (id) => setOpenId(id)  //* simplified ver 2.
  function openMenu(id) {
    setOpenId(id);
  }
  return (
    <MenusContext.Provider
      value={{ openId, openMenu, closeMenu, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, closeMenu, openMenu, position, setPosition } =
    useContext(MenusContext);
  function handleClick(e) {
    e.stopPropagation(); //* stop the event from bubbling up to the parent element (the button in this case
    openId === "" || openId !== id ? openMenu(id) : closeMenu();
    // if(openId === id) return console.log('clock') //! if the menu is already open, close it not working

    const rect = e.target.closest("button").getBoundingClientRect(); //* closest will find the closest button parent. getBoundingClientRect will give the coordinates of the button
    //* console.log(rect) // DOMRect { x: 0, y: 0, width: 32, height: 32, top: 0, right: 32, bottom: 32, left: 0 }
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, closeMenu, position } = useContext(MenusContext);
  const ref = useOutsideClick(closeMenu, false); //* close the menu when clicking outside of the menu. false to listen to the bubbling phase (not the capturing phase set to true in useOutsideClick.js)

  if (openId !== id) return null;

  return createPortal(
    //* this menu will float on top of ui(like a modal) so portal
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { closeMenu } = useContext(MenusContext);
  function handleClick() {
    onClick?.(); //* onClick on exist for 'duplicate' atm
    closeMenu();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu; //* just the styled component
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
