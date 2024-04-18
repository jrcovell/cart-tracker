//^ Version prior to making modal a compound component to handle opening and closing state and flexibility of adding multiple modals


import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

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


//* createPortal allows us to render a component outside of dom tree while keeping props working. good for modals, dropdowns, etc.
//* modal works without portal, but makes it immune to future updates (ex. setting css 'hidden' somewhere in the app that would cut off modal if it was part of the dom tree)
function Modal({children, onCloseModal}) {
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

