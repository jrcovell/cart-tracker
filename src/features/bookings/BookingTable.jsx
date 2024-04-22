import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";

function BookingTable() {
  const { bookings, isPending } = useBookings();

  if(isPending) return <Spinner/>

if(!bookings) return 
<Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2fr 2fr 0.6fr ">
        <Table.Header>
          <div>Cart Number</div>
          <div>Golfer 1</div>
          <div>Golfer 2</div>
          <div>Status</div>
          <div>Date</div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
