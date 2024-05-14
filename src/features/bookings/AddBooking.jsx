import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";

function AddBooking() {
  return (
    <div>
      <Modal>
        {/*//* open prop to only let one modal be open at a time */}
        <Modal.OpenButton open="booking-form">
          <Button>Add new booking</Button>
        </Modal.OpenButton>
        <Modal.Window name="booking-form">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
