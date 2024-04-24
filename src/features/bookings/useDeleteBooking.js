//^ not in hooks folder because it is only applicable to this feature(cart)

import { useMutation, useQueryClient } from "@tanstack/react-query"; //* useMutation is a react-query hook that is used to mutate data(useQuery is used to fetch data)
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings"; 
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export default function useDeleteBooking() {
  const navigate = useNavigate();

const queryClient = useQueryClient(); //* useQueryClient is a react-query hook that is used to access the queryClient

const {isPending: isDeleting, mutate: deleteBooking} = useMutation({ 
  mutationFn: (id) => deleteBookingApi(id),  
  onSuccess: () => {
  toast.success('booking deleted');
  queryClient.invalidateQueries({active: true})
  navigate('/')
},
onError: (err) => toast.error(err.message), 
});

return {isDeleting, deleteBooking}
}