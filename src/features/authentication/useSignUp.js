import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      // console.log('SUCCESS', user)
      toast.success(
        "Account created successfully! Please verify user's email address"
      ); // can use \ to escape the single quote here
    },
  });

  return { signUp, isPending };
}
