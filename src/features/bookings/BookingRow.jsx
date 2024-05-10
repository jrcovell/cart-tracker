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
    startDate,
    carts: { id: cartId },
    golfers: { fullName },
  },
}) {
  const navigate = useNavigate(); // useNavigate hook from react-router-dom
  const { checkOut, isCheckOut } = useCheckOut();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    upcoming: "yellow",
    "checked-in": "blue",
    playing: "green",
    "behind schedule": "red",
    completed: "silver",
    cancelled: "red",
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

      <div>{startDate}</div>
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
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<HiCash />}
              >
                Pay / Check In
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
