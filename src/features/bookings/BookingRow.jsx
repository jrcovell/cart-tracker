import styled from "styled-components";
// import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiCheckBadge,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { Navigate, useNavigate } from "react-router-dom";
import { HiCash } from "react-icons/hi";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { deleteBooking } from "../../services/apiBookings";
import useDeleteBooking from "./useDeleteBooking";
import { useCheckIn } from "../check-in-out/useCheckIn";
import { useStartRound } from "../check-in-out/useStartRound";
import { GiCarWheel } from "react-icons/gi";
import Button from "../../ui/Button";

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

function BookingRow({
  booking: {
    id: bookingId,
    status,
    startDate2,
    carts: { id: cartId = "N/A" },
    golfers: { fullName },
  },
}) {
  const navigate = useNavigate(); // useNavigate hook from react-router-dom
  const { checkOut, isCheckOut } = useCheckOut();
  const { checkIn, isCheckIn } = useCheckIn();
  const { startRound, isStartRound } = useStartRound();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    upcoming: "yellow",
    "checked-in": "blue",
    playing: "green",
    "behind schedule": "red",
    completed: "silver",
    cancelled: "red",
    null: "grey",
  };

  const isWorking = isCheckIn || isStartRound || isCheckOut || isDeleting;

  // console.log(new Date().toTimeString().slice(0, 8)); // 08:17:33

  return (
    <Table.Row>
      <Stacked>
        <span>{fullName}</span>
        <span>{bookingId}</span>
      </Stacked>
      <span>{startDate2}</span>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      {status === "upcoming" && (
        <Button
          size="small"
          variation="booking"
          disabled={isWorking}
          onClick={() => checkIn(bookingId)}
        >
          Check In
        </Button>
      )}
      {status === "checked-in" && (
        <Button
          size="small"
          variation="booking"
          disabled={isWorking}
          onClick={() => startRound(bookingId)}
        >
          Start Round
        </Button>
      )}
      {(status === "playing" || status === "behind schedule") && (
        <Button
          size="small"
          variation="booking"
          onClick={() => checkOut(bookingId)}
        >
          Complete Round
        </Button>
      )}
      {status === "completed" && ( // if status is completed, show the cash icon
        <Button
          size="small"
          variation="booking"
          onClick={() => navigate(`/bookings/${bookingId}`)}
        >
          Details
        </Button>
      )}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<HiEye />}
            >
              Details
            </Menus.Button>

            {status === "upcoming" && (
              <Menus.Button
                onClick={() => checkIn(bookingId)}
                icon={<HiArrowDownOnSquare />}
                disabled={isCheckIn}
              >
                Check In
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                onClick={() => startRound(bookingId)}
                icon={<GiCarWheel />}
                disabled={isCheckIn}
              >
                Start Round
              </Menus.Button>
            )}

            {(status === "playing" || status === "behind schedule") && (
              <Menus.Button
                onClick={() => checkOut(bookingId)}
                icon={<HiCheckBadge />}
                disabled={isCheckOut}
              >
                Complete Round
              </Menus.Button>
            )}

            <Modal.OpenButton open="delete">
              <Menus.Button icon={<HiTrash />}>Delete Booking</Menus.Button>
            </Modal.OpenButton>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
