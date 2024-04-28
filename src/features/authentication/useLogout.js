import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: logout, isPending} = useMutation({
        mutationFn: logoutApi, // logoutApi removes the session from local storage
        onSuccess: () => {
        queryClient.removeQueries(); // remove all queries from the cache. could specify (ex. 'user'). Shown in react-query devtools
        navigate("/login", {replace: true})
        }
    });
    return {logout, isPending}
}