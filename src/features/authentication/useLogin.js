import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi} from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

const { mutate: login, isPending } = useMutation({
    mutationFn: ({email,password}) => loginApi({ //* mutation bc change occurs on server (user becomes authenticated)
        email,password}),
        onSuccess: (user) => // data renamed to user in this case
        {
        queryClient.setQueryData(['user'], user.user); // set the user in the cache so we don't have to fetch it constantly in useUser.js (better performance)
        //console.log('SUCCESS', user) SUCCESS {user: {…}, session: {…}}
        navigate('/dashboard', {replace: true}); //replace: true = replace the current URL in the history stack. (stops user from going back to login page)
        },
        onError: (error) => {
            console.log('ERROR', error) // ERROR Error: Invalid login credentials
            toast.error(error.message)
        }
});

return { login, isPending };

}