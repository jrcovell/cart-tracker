import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCart } from "../../services/apiCarts";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      //   queryClient.setQueryData(["user"], user); // would also work (would need to add user to onSuccess function above)
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateUser, isUpdating };
}
