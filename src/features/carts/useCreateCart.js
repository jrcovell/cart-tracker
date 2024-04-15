import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEditCart } from "../../services/apiCarts"
import toast from "react-hot-toast"


export function useCreateCart() {
const queryClient = useQueryClient() //* needed to invalidate the query after adding a new cart(so data is refetched)

const {mutate: createCart, isLoading: isCreating} = useMutation({ //* whenever we change something(add, delete, update) we use useMutation(react-query hook)
mutationFn: createEditCart,
// mutationFn: newCart => createCart(newCart), //* same as above
onSuccess: () => {
  toast.success('Cart added')
  queryClient.invalidateQueries({ queryKey:['cart']}) //* invalidates the query so data is refetched
//   reset() //* resets the form after adding a new cart (cannot be used here part of react-hook-form)
},
onError: (error) => {
  toast.error(error.message)
  
},})

return {createCart, isCreating}
}

/* delete this
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
