//^ prior to adding modal compound component for form 

import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCarts } from "../services/apiCarts";
import CartTable from "../features/carts/CartTable";
import Button from "../ui/Button";
import CreateCartForm from "../features/carts/CreateCartForm";
import Modal from "../ui/Modal";

function Carts() {

    // useEffect(function() { //* retrieve cart data as soon as page loads
    //   getCarts().then(data=>console.log(data) //* getCarts(from apiCarts.js) async so .then to retrieve data 
    // )}
    //   , [])


    const [showForm, setShowForm] = useState(false) //* useState to toggle form visibility
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All Carts</Heading>
      <p>Filter / Sort</p>
    </Row>

    <Row>
      <CartTable/>

      <Button onClick={() => setShowForm((show)=>(!show))}>Add new cart</Button>
      {showForm && 
      <Modal>
      <CreateCartForm/>
      </Modal>
      }

    </Row>
    </>
  );
}

export default Carts;