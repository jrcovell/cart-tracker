import styled from "styled-components";
// import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import { useCheckIn } from "./useCheckIn";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function BookingCheckIn() {
  const [paid, setPaid] = useState(false);
  const { booking, isPending } = useBooking();
//* if pre booking option becomes available, uncomment the line below
  // useEffect(() => setPaid(booking?.isPaid ?? false), [booking.isPaid])
  
  const moveBack = useMoveBack();
const {checkIn, isCheckIn} = useCheckIn();

  if (isPending) return <Spinner/>

  const {
    id: bookingId,
  } = booking;

  function handleCheckin() {
    if(!paid) return;
    checkIn(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

<Box>
  <Checkbox checked={paid} onChange={() => setPaid((confirm) => !confirm)} id={"confirm"} disabled={paid || isCheckIn}> Confirm Payment </Checkbox>
</Box>
      {/* <BookingDataBox booking={booking} /> */}

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!paid || isCheckIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingCheckIn;
