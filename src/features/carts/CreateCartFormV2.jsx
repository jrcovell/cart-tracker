//^ prior to adding edit functionality to the form
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import {useForm } from "react-hook-form";
import { createCart } from "../../services/apiCarts";


function CreateCartForm() {
const {register, handleSubmit, reset, getValues, formState} = useForm() //* register and handleSubmit are destructured from useForm
// console.log(getValues().number) //* gets the value of the form input with the name 'number'
const {errors} = formState //* destructuring errors from formState (shows error messages on the form)

const queryClient = useQueryClient() //* needed to invalidate the query after adding a new cart(so data is refetched)
const {mutate, isLoading: isCreating} = useMutation({ //* whenever we change something(add, delete, update) we use useMutation(react-query hook)
mutationFn: createCart,
// mutationFn: newCart => createCart(newCart), //* same as above
onSuccess: () => {
  toast.success('Cart added')
  queryClient.invalidateQueries({ queryKey:['cart']}) //* invalidates the query so data is refetched
  reset() //* resets the form after adding a new cart
},
onError: (error) => {
  toast.error(error.message)
  
},

})


function onSubmitData(data) {
  // console.log(data) //* exact shape needed for supabase {number: "123", description: "test", image: {File}}
  // mutate(data) //* data is passed to the mutate function
  mutate({...data, image: data.image[0]}) //* image is an array so we need to pass the first element of the array
}

function onError(errors) {
//* not being used. errors are being handled in the form with formState. Could be useful if we wanted to log errors to a third party service (like Sentry)
  // console.log(errors) //* {number: "Cart number is required", description: "Description is required", image: "Image is required"}
}


  return (
    
    <Form onSubmit={handleSubmit(onSubmitData, onError)}> 
    {/* //* onSubmit called when form is submitted(when button is clicked)  */}

      <FormRow label="Number" error={errors?.number?.message}>
        <Input type="text" id="number" disabled={isCreating} {...register('number' ,{ required: 'Cart number is required', min: {
          value: 1, message: 'Cart number must be greater than 0'},
        })} 
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message} >
        <Textarea type="number" id="description" disabled={isCreating}  defaultValue="" {...register('description', 
      {required: 'Description is required', validate: value => value.length > 10 || 'Description must be at least 10 characters'}
      )}/>
      </FormRow>

      <FormRow label="Image" error={errors?.image?.message} disabled={isCreating}>
        <FileInput id="image" accept="image/*" disabled={isCreating} {...register("image", {required: "Image is required"})}/>
      </FormRow>

      <FormRow disabled={isCreating}>
        {/* type is an HTML attribute. Resets the form */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button >Add cabin</Button>
      </FormRow>

    </Form>
  );
}

export default CreateCartForm;

