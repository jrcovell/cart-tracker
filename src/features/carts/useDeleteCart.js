//^ not in hooks folder because it is only applicable to this feature(cart)

import { useMutation, useQueryClient } from "@tanstack/react-query"; //* useMutation is a react-query hook that is used to mutate data(useQuery is used to fetch data)
import { deleteCart as deleteCartApi } from "../../services/apiCarts"; //* deleteCart is a function that is called when the mutation is triggered. deleteCart defined in apiCarts.js
import toast from "react-hot-toast";


export default function useDeleteCart() {

const queryClient = useQueryClient(); //* useQueryClient is a react-query hook that is used to access the queryClient

const {isPending: isDeleting, mutate: deleteCart} = useMutation({ //* useMutation is a react-query hook that is used to mutate data(useQuery is used to fetch data)
  mutationFn: (id) => deleteCartApi(id), //* mutationFn is a function that is called when the mutation is triggered. deleteCartApi defined in apiCarts.js 
  onSuccess: () => {
  toast.success('cart deleted');
  queryClient.invalidateQueries({
    queryKey: ["cart"], //* queryKey is the key of the query that is to be invalidated
  }) //* onSuccess is a"@tanstack/react-query" function that is called when the mutation is successful. queryClient is a react-query hook that is used to invalidate queries. invalidating the query will refetch the data, updating the UI.
},
onError: (err) => toast.error(err.message), //* onError is a function that is called when the mutation fails. alert is a function that displays an alert box with the error message
});

return {isDeleting, deleteCart} //* isDeleting is a boolean that is true when the mutation is in progress. deleteCart is a function that is called to delete a cart
}