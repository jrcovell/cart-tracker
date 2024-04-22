//^ used to fetch data from api and store it in cache

import { useQuery } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
const [searchParams] = useSearchParams();

// filter booking status
const filterValue = searchParams.get('status');
const filter = !filterValue || filterValue === 'all' 
? null : {field: 'status', value: filterValue}; //if there is no filter value or filter value is 'all', set filter to null, do not filter.

/*
//* grabs all bookings where cartId is greater than or equal to 20
? null : {field: 'cartId', value: 20, method: 'gte'} //& option to dynamically filter bookings with < or > status values {field: 'cartId', value: filterValue, method: 'gte'} (greater than or equal to filterValue)
*/


//& option to dynamically filter bookings with < or > status values {field: 'cartId', value: filterValue, method: 'gte'} (greater than or equal to filterValue)


//& const x = useQuery({ //* useQuery custom hook from react-query
const {isPending, data: bookings, error} = useQuery({ 
    queryKey: ['bookings', filter], //* stores result of getCart in cache with key 'cart'. whenever filter changes, the cache is invalidated and new data is fetched.
    queryFn: () => getBookings({filter}),  //* used to fetch data from api (needs to return a promise) (getCarts from apiCarts.js)
  }) 
  //& console.log(x) //* logs the data from the api data:, isLoading: true, error: undefined, isStale, etc.
  
  //& if (isLoading) return <p>Loading...</p> //* if data is loading, display 'Loading...'

return {isPending, bookings, error}

}