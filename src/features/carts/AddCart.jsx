import { useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateCartForm from "./CreateCartForm"
import CartTable from "./CartTable"


function AddCart() {
    return (
        <Modal>
            {/*//* open prop to only let one modal be open at a time */}
            <Modal.OpenButton open='cart-form'>
                <Button>Add new cart</Button>
            </Modal.OpenButton>
            <Modal.Window name='cart-form'>
                <CreateCartForm/>
            </Modal.Window>

            <Modal.OpenButton open='table'>
                <Button>Show table</Button>
            </Modal.OpenButton>
            <Modal.Window name='table'>
              <span><CartTable/></span>
            </Modal.Window>
        </Modal>
    )
}

//* version 1 (without compound components AddCart responsible for opening and closing the modal, but we want to move that responsibility to the modal)
// function AddCart() {
//     const [modalState, setModalState] = useState(false)
//     function handleModal(){
//     setModalState((show)=>(!show))
// }

//     return (
//         <div>
//       <Button onClick={handleModal}>Add new cart</Button>
//       {modalState && 
//       <Modal onCloseModal={handleModal}> {/* give modal onClose prop to close the modal */}
//       <CreateCartForm onCloseModal={handleModal}/>
//       </Modal>
//       }
//         </div>
//     )
// }

export default AddCart
