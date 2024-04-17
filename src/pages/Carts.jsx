
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CartTable from "../features/carts/CartTable";

import AddCart from "../features/carts/AddCart";

function Carts() {

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All Carts</Heading>
      <p>Filter / Sort</p>
    </Row>

    <Row>
      <CartTable/>
      <AddCart/>
    </Row>
    </>
  );
}

export default Carts;