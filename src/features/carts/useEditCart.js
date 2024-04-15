//^ hook used to edit cart

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCart } from "../../services/apiCarts";
import toast from "react-hot-toast";

export function useEditCart() {
    const queryClient = useQueryClient() //* needed to invalidate the query after adding a new cart(so data is refetched)


const {mutate: editCabin, isPending: isEditing} = useMutation({ //* whenever we change something(add, delete, update) we use useMutation(react-query hook)
    mutationFn: ({newCartData, id}) => createEditCart(newCartData, id),
    // mutationFn: newCart => createCart(newCart), //* same as above
    onSuccess: () => {
      toast.success('Cart successfully edited')
      queryClient.invalidateQueries({ queryKey:['cart']}) //* invalidates the query so data is refetched
    },
    onError: (error) => {
      toast.error(error.message)
    },
    });

return {editCabin, isEditing}
}