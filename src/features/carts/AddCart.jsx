import { useState } from "react"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateCartForm from "./CreateCartForm"

function AddCart() {
    const [modalState, setModalState] = useState(false)
    function handleModal(){
    setModalState((show)=>(!show))
}

    return (
        <div>
      <Button onClick={handleModal}>Add new cart</Button>
      {modalState && 
      <Modal onCloseModal={handleModal}> {/* give modal onClose prop to close the modal */}
      <CreateCartForm onCloseModal={handleModal}/>
      </Modal>
      }
        </div>
    )
}

export default AddCart
