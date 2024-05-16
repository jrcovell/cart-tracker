import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, activeBookings, count, isPending } = useBookings();

  if (isPending) return <Spinner />;

  if (!bookings) return;
  <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="2fr 2fr 2fr 2fr 0.6fr ">
        <Table.Header>
          <div>Golfer</div>
          <div>Date</div>
          <div>Status</div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
