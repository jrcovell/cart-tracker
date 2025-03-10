import { useForm } from "react-hook-form";
import { useCreateBooking } from "./useCreateBooking";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { useCarts } from "../carts/useCarts";
import { useGolfers } from "../golfers/useGolfers";

function CreateBookingForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {},
  });

  const { carts, isPending: isPendingCarts } = useCarts();
  const { golfers, isPending: isPendingGolfers } = useGolfers();
  const { createBooking, isCreating } = useCreateBooking();
  const { errors } = formState;

  let startTime = new Date();
  startTime.setHours(7, 0, 0, 0); // Set start time to 7:00am
  const endTime = new Date().setHours(17, 0, 0); // Set end time to 5:00pm

  const timeIntervals = [];
  let currentTime = new Date(startTime);

  while (currentTime <= endTime) {
    timeIntervals.push(currentTime);
    currentTime = new Date(currentTime.getTime() + 10 * 60000); // Add 10 minutes
  }

  function onSubmitData(data) {
    createBooking(data);
    reset(); // resets the form
    onCloseModal();
  }

  function onError(errors) {
    // console.error(errors);
  }

  if (isPendingCarts || isPendingGolfers) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmitData, onError)}
      type={onCloseModal ? "modal" : "standard"}
    >
      {/* //* onSubmit called when form is submitted(when button is clicked)  */}
      <FormRow label="Golfer" error={errors?.golfers?.message}>
        <select
          id="golferId"
          disabled={isCreating}
          {...register("golferId", { required: "Golfers are required" })}
        >
          {golfers.map((golfer) => (
            <option key={golfer.id} value={golfer.id}>
              {golfer.fullName}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Start Date" error={errors?.date?.message}>
        <Input
          type="date"
          id="startDate2"
          disabled={isCreating}
          {...register("startDate2", { required: "Date is required" })}
          error={errors?.date?.message}
        />
      </FormRow>

      <FormRow label="Start Time" error={errors?.startTime?.message}>
        <select
          id="startTime"
          disabled={isCreating}
          {...register("startTime", { required: "Start time is required" })}
        >
          {timeIntervals.map((time) => (
            <option key={time} value={time.toTimeString().slice(0, 8)}>
              {time.toTimeString().slice(0, 8)}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Cart Number" error={errors?.cart?.message}>
        <select id="cartId" disabled={isCreating} {...register("cartId")}>
          {carts.map((cart) => (
            <option key={cart.id} value={cart.id}>
              {cart.number}
            </option>
          ))}
        </select>
      </FormRow>

      {/* <FormRow label="Start Time" error={errors?.startTime?.message}>
        <Input
          type="time"
          id="startTime"
          disabled={isCreating}
          {...register("startTime", { required: "Start time is required" })}
          error={errors?.startTime?.message}
        />
      </FormRow> */}

      <FormRow>
        {/* type is an HTML attribute. Resets the form */}
        {/* optional chaining here in case form is used outside of modal(will not receive the onCloseModal prop) */}
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button>Create new Booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
