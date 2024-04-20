import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CartRow from "./CartRow";
import { useCarts } from "./useCarts";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

/* //* Using Table component from ui (compounded component)
const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;
*/

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
const {isPending, carts, error} = useCarts() 

if (isPending) return <Spinner/> //* same as above but with a spinner component

//* wrap table in menus component
  return (
    <Menus> 
    <Table columns='1fr 0.5fr 0.5fr 2fr 1fr'> 
      <Table.Header>
        <div>Icon</div>
        <div>Number</div>
        <div>Active</div>
        <div>Description?</div>
      </Table.Header>
      <Table.Body data={carts} render={(cart) => <CartRow cart={cart} key={cart.id}/>}/>
    </Table>
    </Menus>
  )
}

export default CartTable;
