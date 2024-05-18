import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";
import { useCreateCart } from "./useCreateCart";
import { useEditCart } from "./useEditCart";
import { getLocation } from "../../services/apiCarts";

function CreateCartForm({ cartToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cartToEdit; //* destructuring id from cartToEdit and renaming it to editId. editValues is the rest of the object. (for the edit form)
  const isEditSession = Boolean(editId); //* determines if using the form for editing or creating a new cart

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}, //* if isEditSession is true, use editValues, otherwise use undefined
  }); //* register and handleSubmit are destructured from useForm
  // console.log(getValues().number) //* gets the value of the form input with the name 'number'
  const { errors } = formState; //* destructuring errors from formState (shows error messages on the form)

  const { isCreating, createCart } = useCreateCart();
  const { isEditing, editCabin } = useEditCart();

  const isWorking = isCreating || isEditing; //* isWorking is true if isCreating or isEditing is true
  console.log(getLocation(cartToEdit.id));

  /* //* now useCreateCart is a custom hook
const {mutate: createCart, isLoading: isCreating} = useMutation({ //* whenever we change something(add, delete, update) we use useMutation(react-query hook)
mutationFn: createEditCart,
// mutationFn: newCart => createCart(newCart), //* same as above
onSuccess: () => {
  toast.success('Cart added')
  queryClient.invalidateQueries({ queryKey:['cart']}) //* invalidates the query so data is refetched
  reset() //* resets the form after adding a new cart
},
onError: (error) => {
  toast.error(error.message)
  
},})
*/

  /* //* now useEditCart is a custom hook
const {mutate: editCabin, isLoading: isEditing} = useMutation({ //* whenever we change something(add, delete, update) we use useMutation(react-query hook)
  mutationFn: ({newCartData, id}) => createEditCart(newCartData, id),
  // mutationFn: newCart => createCart(newCart), //* same as above
  onSuccess: () => {
    toast.success('Cart successfully edited')
    queryClient.invalidateQueries({ queryKey:['cart']}) //* invalidates the query so data is refetched
    reset() //* resets the form after adding a new cart
  },
  onError: (error) => {
    toast.error(error.message)
  },
  });
*/

  function onSubmitData(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0]; //* if image is a string, use that, otherwise use the first element of the array (again choosing which form of the image to use (file or bucket path))

    if (isEditSession)
      editCabin(
        { newCartData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            // console.log(data) //* {id: 1, number: "1", description: "test", image: "https://example.com/image.jpg", active: true}
            onCloseModal?.(); //* close the modal after successfully editing a cart
          },
        }
      );
    else
      createCart(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset(); //* resets the form after adding a new cart(moved here after making custom hook useCreateCart)
            onCloseModal?.(); //* close the modal after successfully adding a new cart
          },
        }
      ); //* image is an array so we need to pass the first element of the array
  }

  function onError(errors) {
    //* not being used. errors are being handled in the form with formState. Could be useful if we wanted to log errors to a third party service (like Sentry)
    // console.log(errors) //* {number: "Cart number is required", description: "Description is required", image: "Image is required"}
  }

  return (
    // set type prop to 'modal' if form is used inside a modal(for styling purposes) check by seeing if onCloseModal exists(only exists in modal component)
    <Form
      onSubmit={handleSubmit(onSubmitData, onError)}
      type={onCloseModal ? "modal" : "standard"}
    >
      {/* //* onSubmit called when form is submitted(when button is clicked)  */}

      <FormRow label="Number" error={errors?.number?.message}>
        <Input
          type="text"
          id="number"
          disabled={isWorking}
          {...register("number", {
            required: "Cart number is required",
            min: {
              value: 1,
              message: "Cart number must be greater than 0",
            },
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "Description is required",
            validate: (value) =>
              value.length > 10 || "Description must be at least 10 characters",
          })}
        />
      </FormRow>

      <FormRow label="Location" error={errors?.location?.message}>
        <Input
          type="text"
          id="location"
          disabled={isWorking}
          {...register("location", { required: "Location is required" })}
        />
      </FormRow>

      <FormRow
        label="Image"
        error={errors?.image?.message}
        disabled={isWorking}
      >
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "Image is required",
          })}
        />
      </FormRow>

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
        <Button>{isEditSession ? "Edit Cart" : "Create new Cart"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCartForm;
