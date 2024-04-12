import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCart } from "../../services/apiCarts";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCartForm() {
const {register, handleSubmit, reset} = useForm() //* register and handleSubmit are destructured from useForm


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
  // console.log(data) //* exact shape needed for supabase {number: "123", description: "test", image: File}
  mutate(data) //* data is passed to the mutate function
}

function onError(errors) {
  console.log(errors)
}

  return (
    <Form onSubmit={handleSubmit(onSubmitData, onError)}> 
    {/* //* onSubmit called when form is submitted(when button is clicked)  */}
      <FormRow>
        <Label htmlFor="number">Cart Number</Label>
        <Input type="text" id="number"{...register('number' ,{ required: 'Cart number is required', min: {
          value: 1, message: 'Cart number must be greater than 0'},
        })} 
        // {/* register(from react-hook-form) adds onBlur/onChange to input */ }
        />
      </FormRow>

      {/* <FormRow>
        <Label htmlFor="active">Active</Label>
        <Input type="boolean" id="active" {...register('active')} />
      </FormRow> */}


      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" defaultValue="" {...register('description', 
      {validate: value => value.length > 10 || 'Description must be at least 10 characters'}
      )}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cart photo</Label>
        <FileInput id="image" accept="image/*" {...register('image')}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute. Resets the form */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCartForm;
