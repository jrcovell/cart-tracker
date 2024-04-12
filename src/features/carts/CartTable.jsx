import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCarts } from "../../services/apiCarts";
import Spinner from "../../ui/Spinner";
import CartRow from "./CartRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CartTable() {
//& const x = useQuery({ //* useQuery custom hook from react-query
const {isLoading, data: carts, error} = useQuery({ 
  queryKey: ['cart'], //* stores result of getCart in cache with key 'cart' 
  queryFn: getCarts,  //* used to fetch data from api (needs to return a promise) (getCarts from apiCarts.js)
}) 
//& console.log(x) //* logs the data from the api data:, isLoading: true, error: undefined, isStale, etc.

//& if (isLoading) return <p>Loading...</p> //* if data is loading, display 'Loading...'
if (isLoading) return <Spinner/> //* same as above but with a spinner component

  return (
    <Table role="table"> {/*//* role="table" identifier for html, lets browser know this is a table */}
      <TableHeader role="row">
        <div></div>
        <div>Number</div>
        <div>Active</div>
        <div>Description?</div>
      </TableHeader>
      {carts.map((cart) => <CartRow cart={cart} key={cart.id} />)} {/*//* maps over the carts array and returns a CartRow component for each cart */}
    </Table>
  )
}

export default CartTable;
