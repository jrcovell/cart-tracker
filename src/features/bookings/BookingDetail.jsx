//! maybe make this modal with check in and check out buttons?

import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { HiCheckBadge, HiTrash } from "react-icons/hi2";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {booking, isPending} = useBooking();
  const {checkOut, isCheckOut} = useCheckOut();
  const {deleteBooking, isDeleting} = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  console.log(booking)


  if(isPending) return <Spinner/>

  // const status = "checked-in";
  const {status, id: bookingId} = booking;

  const statusToTagName = {
    'upcoming': "yellow",
    'checked-in': 'blue',
    'playing': "green",
    'behind schedule': "red",
    'completed': "silver",
    'cancelled': "red",
  };



  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>

        {status === "upcoming" && (
        <Button
   onClick={() => navigate(`/checkin/${bookingId}`)} >Pay / Check In
        </Button>
  )}
  {(status === "playing" || status === 'behind schedule') && (
  <Button onClick={() => checkOut(bookingId)} icon={<HiCheckBadge/>} disabled={isCheckOut} >Complete Round</Button>
)}
      </Row>


      <ButtonGroup>
      <Button onClick={() => deleteBooking(bookingId)} icon={<HiTrash/>} disabled={isDeleting} >Delete Booking</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
export default BookingDetail;

