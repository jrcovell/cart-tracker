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
      <Table columns="0.6fr 5fr 0.6fr ">
        <Table.Header>
          <div>Start Time</div>
          <div>Golfers</div>
          <div>Location?</div>
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
