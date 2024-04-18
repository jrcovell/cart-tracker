import {  useEffect, useRef } from "react"

export function useOutsideClick(handler) {
console.log('useOutsideClick')
const ref = useRef();


        //* close modal when clicked outside of it
        useEffect(
          function() { 
          function handleClickedOutside(e) {
            //* if the modal exists and the clicked element is not inside the modal, close the modal
            if(ref.current && !ref.current.contains(e.target)) {
              console.log('clicked outside')
              handler()
            }
          }
          //* setting true to capture the event in the capturing phase(downwards) default is false(bubbling phase moving up the tree)
          document.addEventListener('click', handleClickedOutside, true)
          //* remove event listener when modal is closed
          return () => document.removeEventListener('click', handleClickedOutside, true)
            }, 
            [handler]
          );
    
return ref;
          
}
