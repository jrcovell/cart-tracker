import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { HiExclamationCircle } from "react-icons/hi";

// center the modal
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

// blur the background
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

//^ steps to make a compound component
//^ 1. create a context
const ModalContext = createContext();

//^2. create a parent component
function Modal({ children }) {
  //* empty string so we can set multiple modals by name
  const [selectedModal, setSelectedModal] = useState("");
  const closeModal = () => setSelectedModal("");
  //* generated from open prop in AddCart.jsx
  const openModal = (open) => setSelectedModal(open);

  return (
    <ModalContext.Provider
      value={{ selectedModal, setSelectedModal, closeModal, openModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

//^3. create a child components that will implement the context functionality

function OpenButton({ children, open }) {
  const { openModal } = useContext(ModalContext);
  //* creates a clone of the child component(ex. <Button>Add new cart</Button>) and allows us to add props to it.
  //* onClick sets value defined to selectedModal state (to determine which modal to open)(ex. open='cart-form')
  return cloneElement(children, { onClick: () => openModal(open) });
}

function Window({ children, name, monitorLocation }) {
  const { selectedModal, closeModal } = useContext(ModalContext);

  const ref = useOutsideClick(closeModal);

  /* //* refactored to useOutsideClick hook
//* useRef to reference the modal element <StyledModal> 
const ref= useRef()

  //* close modal when clicked outside of it
  useEffect(function() { 
    function handleClickedOutside(e) {
      //* if the modal exists and the clicked element is not inside the modal, close the modal
      if(ref.current && !ref.current.contains(e.target)) {
        setSelectedModal('')
        console.log('clicked outside')
      }
    }
    //* setting true to capture the event in the capturing phase(downwards) default is false(bubbling phase moving up the tree)
    document.addEventListener('click', handleClickedOutside, true)
    //* remove event listener when modal is closed
    return () => document.removeEventListener('click', handleClickedOutside, true)
      }, [ref, setSelectedModal])
*/

  //* if the name of the modal does not match the selectedModal, return null
  if (name !== selectedModal) return null;

  //* don't want user to be able to close the modal if monitorLocation is true, so disable close button when tracking and outsideClick hook
  if (name === "track-cart") {
    return createPortal(
      <Overlay>
        <StyledModal>
          {monitorLocation ? (
            <Button onClick={closeModal}>
              <HiXMark />
            </Button>
          ) : null}
          <div>{cloneElement(children, { onCloseModal: closeModal })}</div>
        </StyledModal>
      </Overlay>,
      document.body
    );
  }

  //* if name matches, render that modal below
  if (name === selectedModal) {
    //* cloneElement here to retrieve styling logic issued from onCloseModal(old state that was originally used to close the modal in AddCart.jsx)(used to tell form it is a modal version of the form, style accordingly)
    return createPortal(
      <Overlay>
        <StyledModal ref={ref}>
          <Button onClick={closeModal}>
            <HiXMark />
          </Button>
          <div>{cloneElement(children, { onCloseModal: closeModal })}</div>
        </StyledModal>
      </Overlay>,
      document.body
      //* render the modal to the body, instead of in the dom tree normally (child of the parent component AddCart.jsx)
    );
  }
}

//^4. Add child components as properties of the parent component

Modal.OpenButton = OpenButton;
Modal.Window = Window;

export default Modal;

/*
  return createPortal ( 
    <Overlay>
   <StyledModal>
    <Button onClick={onCloseModal}><HiXMark/></Button>
    <div>
    {children}
    </div>
   </StyledModal>
    </Overlay>,
    document.body 
    //* render the modal to the body, instead of in the dom tree normally (child of the parent component AddCart.jsx) 
  );
}

export default Modal

*/
