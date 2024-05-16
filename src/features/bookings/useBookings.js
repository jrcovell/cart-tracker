//^ used to fetch data from api and store it in cache

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { NUMBER_OF_ITEMS } from "../../utils/globals";

export function useBookings() {
  const queryClient = useQueryClient(); //& useQueryClient hook from react-query(using it to prefetch data(pagination below))
  const [searchParams] = useSearchParams();

  // filter booking status
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue }; //if there is no filter value or filter value is 'all', set filter to null, do not filter.

  /*
//* grabs all bookings where cartId is greater than or equal to 20
? null : {field: 'cartId', value: 20, method: 'gte'} //& option to dynamically filter bookings with < or > status values {field: 'cartId', value: filterValue, method: 'gte'} (greater than or equal to filterValue)
*/

  //& option to dynamically filter bookings with < or > status values {field: 'cartId', value: filterValue, method: 'gte'} (greater than or equal to filterValue)

  //sort booking by time
  const sortValue = searchParams.get("sort") || "startDate-asc"; // if there is no sort value, default to 'startTime-asc'
  const [field, direction] = sortValue.split("-"); // split the sort value into field and direction
  const sort = { field, direction }; // set sort to field and direction

  // pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //& const x = useQuery({ //* useQuery custom hook from react-query
  const {
    isPending,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // data initially undefined after adding page variable, so set default to empty object to avoid error
    queryKey: ["bookings", filter, sort, page], //* stores result of getCart in cache with key 'cart'. whenever filter/sort changes, the cache is invalidated and new data is fetched.
    queryFn: () => getBookings({ filter, sort, page }), //* used to fetch data from api (needs to return a promise) (getCarts from apiCarts.js)
  });

  // per pagination. only want to show active bookings, but still keep completed bookings for data
  const activeBookings = bookings?.filter(
    (booking) => booking.status !== "completed"
  );

  //& console.log(x) //* logs the data from the api data:, isLoading: true, error: undefined, isStale, etc.
  //pre fetching data
  const pageCount = Math.ceil(count / NUMBER_OF_ITEMS); //
  if (page < pageCount)
    // don't prefetch if on the last page

    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    }); // prefetches the next page of data to improve performance(visible in react query dev tools)

  if (page > 1)
    // don't prefetch if on the first page
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    }); // prefetches the previous page

  return { isPending, bookings, activeBookings, count, error };
}
