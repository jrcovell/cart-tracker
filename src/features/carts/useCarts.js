//^ used to fetch data from api and store it in cache

import { useQuery } from "@tanstack/react-query";
import { getCarts } from "../../services/apiCarts";

export function useCarts() {


//& const x = useQuery({ //* useQuery custom hook from react-query
const {isPending, data: carts, error} = useQuery({ 
    queryKey: ['cart'], //* stores result of getCart in cache with key 'cart' 
    queryFn: getCarts,  //* used to fetch data from api (needs to return a promise) (getCarts from apiCarts.js)
  }) 
  //& console.log(x) //* logs the data from the api data:, isLoading: true, error: undefined, isStale, etc.
  
  //& if (isLoading) return <p>Loading...</p> //* if data is loading, display 'Loading...'

return {isPending, carts, error}

}