import Spinner from "../../ui/Spinner";
import CartRow from "./CartRow";
import { useCarts } from "./useCarts";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Button from "../../ui/Button";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useState } from "react";

/* //* Using Table component from ui (compounded component)
const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;
*/

function CartTable() {
  const { isPending, carts, error } = useCarts();
  const [searchParams] = useSearchParams(); //* from Filter.jsx
  const [monitorLocation, setMonitorLocation] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  if (isPending) return <Spinner />; //* same as above but with a spinner component

  if (!carts.length) return <Empty resourceName="carts" />;

  //* filter logic
  const filteredCarts = searchParams.get("type") || "allCarts"; //* short circuit to default to allCarts (usually null)
  // console.log(filteredCarts) //* (allCarts || activeCarts)

  let filteredCartsList;
  if (filteredCarts === "allCarts") {
    filteredCartsList = carts;
  }
  if (filteredCarts === "activeCarts") {
    filteredCartsList = carts.filter((cart) => cart.active !== null);
  }

  //* sort logic
  const sortValue = searchParams.get("sort") || "ascending"; //* short circuit to default to ascending (usually null)

  let sortedCartsList; //* takes the filteredCartsList and sorts it based on the sortValue
  if (sortValue === "ascending") {
    sortedCartsList = filteredCartsList.sort((a, b) => a.number - b.number);
  }
  if (sortValue === "descending") {
    sortedCartsList = filteredCartsList.sort((a, b) => b.number - a.number);
  }

  //* wrap table in menus component

  if (monitorLocation) {
    return (
      <>
        <Spinner />
        <Button
          onClick={() => {
            setMonitorLocation(false);
            clearInterval(intervalId);
          }}
          // clearInterval(intervalId)
        >
          Stop Tracking
        </Button>
      </>
    );
  }
  return (
    <Menus>
      <Table columns="0.5fr 0.3fr 2fr 0.5fr 1fr">
        <Table.Header>
          <div>Icon</div>
          <div>Number</div>
          <div>Description</div>
          <div>Track Location</div>
        </Table.Header>
        <Table.Body
          data={filteredCartsList}
          render={(cart) => <CartRow cart={cart} key={cart.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CartTable;
