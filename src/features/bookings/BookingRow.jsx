import styled from "styled-components";
// import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";



const Cart = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId, status,
    carts: { id: cartId},
    golfers: { fullName },
    
  },
}) {
  const statusToTagName = {
    'upcoming': "blue",
    "playing": "green",
    "completed": "silver",
  };

  return (
    <Table.Row>
      <Cart>{cartId}</Cart>

      <Stacked>
        <span>18</span>
        <span>{fullName}</span>
        <span>Trolley</span>
      </Stacked>

      <Stacked>
        <span>18</span>
        <span>Test</span>
        <span>Trolley</span>
      </Stacked>
      

    

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>  </Amount>
    </Table.Row>
  );
}

export default BookingRow;
