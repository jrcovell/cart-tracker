import { useForm } from "react-hook-form";
import { useCreateBooking } from "./useCreateBooking";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { useCarts } from "../carts/useCarts";
import { useGolfers } from "../golfers/useGolfers";
import { useBooking } from "./useBooking";

function EditBookingForm() {
  const { booking } = useBooking();
  console.log(booking);
  console.log(booking.startTime);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      startTime: booking.startTime,
      endTime: booking.endTime,
      startDate2: booking.startDate2,
      cartId: booking.cartId,
      golferId: booking.golferId,
      notes: booking.notes,
    },
  });

  const { carts, isPending: isPendingCarts } = useCarts();
  const { golfers, isPending: isPendingGolfers } = useGolfers();
  const { createBooking, isCreating } = useCreateBooking();
  const { errors } = formState;

  function onSubmitData(data) {
    console.log(data);
    // editBooking(data);
    // reset();
  }

  function onError(errors) {
    // console.error(errors);
  }

  if (isPendingCarts || isPendingGolfers) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmitData, onError)}>
      {/* //* onSubmit called when form is submitted(when button is clicked)  */}

      <FormRow label="Date" error={errors?.date?.message}>
        <Input
          type="date"
          id="startDate2"
          disabled={isCreating}
          {...register("startDate2", { required: "Date is required" })}
          error={errors?.date?.message}
        />
      </FormRow>

      <FormRow label="Start Time" error={errors?.startTime?.message}>
        <Input
          type="time"
          id="startTime"
          disabled={isCreating}
          {...register("startTime", { required: "Start Time is required" })}
        />
      </FormRow>

      <FormRow label="End Time" error={errors?.endTime?.message}>
        <Input
          type="time"
          id="endTime"
          disabled={isCreating}
          {...register("endTime", { required: "End Time is required" })}
        />
      </FormRow>

      <FormRow label="Cart Number" error={errors?.cart?.message}>
        <select
          id="cartId"
          disabled={isCreating}
          {...register("cartId", { required: "Cart is required" })}
        >
          {carts.map((cart) => (
            <option key={cart.id} value={cart.id}>
              {cart.number}
            </option>
          ))}
        </select>
      </FormRow>

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

      <FormRow label="Notes" error={errors?.notes?.message}>
        <Input
          type="text"
          id="notes"
          disabled={isCreating}
          {...register("notes")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute. Resets the form */}
        {/* optional chaining here in case form is used outside of modal(will not receive the onCloseModal prop) */}

        <Button>Edit Booking</Button>
      </FormRow>
    </Form>
  );
}

export default EditBookingForm;