import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() { // gets the current user and store it in cache
    const {isPending, data: user, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => getCurrentUser()
    });
    
// isAuthenticated = user is authenticated if user.role === 'authenticated'
    return { isPending, user, isAuthenticated: user?.role === 'authenticated'}
}