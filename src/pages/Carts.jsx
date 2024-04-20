
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CartTable from "../features/carts/CartTable";

import AddCart from "../features/carts/AddCart";
import CartTableOperations from "../features/carts/CartTableOperations";

function Carts() {

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All Carts</Heading>
    <CartTableOperations />
    </Row>

    <Row>
      <CartTable/>
      <AddCart/>
    </Row>
    </>
  );
}

export default Carts;