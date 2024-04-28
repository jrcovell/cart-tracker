import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";


function SignupForm() {
const {register, formState, getValues, handleSubmit} = useForm() // register is a function that registers the input fields. formState is an object that contains the form state

const {errors} = formState

function onSubmit(data) {
//*  console.log(data) //{fullName: 'sratar', email: 'arstars@aol.com', password: 'ienienien', passwordConfirm: 'ienienien'}

}

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register('fullName', {required: "This field is required"})} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" {...register('email', {required: "This field is required", 
      pattern: {value: /\S+@\S+\.\S+/, message: "Provide a valid email address"}
      })} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" {...register('password', {required: "This field is required", minLength: {value: 8, message: 'Password must be at least 8 characters'}})} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register('passwordConfirm', {required: "This field is required",
      validate: (value) => value === getValues().password || "Passwords do not match"
      })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
