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


//sort booking by time
const sortValue = searchParams.get('sort') || 'startDate-asc' // if there is no sort value, default to 'startTime-asc'
const [field, direction] = sortValue.split('-') // split the sort value into field and direction
const sort = {field, direction} // set sort to field and direction

//& const x = useQuery({ //* useQuery custom hook from react-query
const {isPending, data: bookings, error} = useQuery({ 
    queryKey: ['bookings', filter, sort], //* stores result of getCart in cache with key 'cart'. whenever filter/sort changes, the cache is invalidated and new data is fetched.
    queryFn: () => getBookings({filter ,sort}),  //* used to fetch data from api (needs to return a promise) (getCarts from apiCarts.js)
  }) 
  //& console.log(x) //* logs the data from the api data:, isLoading: true, error: undefined, isStale, etc.
  
  //& if (isLoading) return <p>Loading...</p> //* if data is loading, display 'Loading...'

return {isPending, bookings, error}

}