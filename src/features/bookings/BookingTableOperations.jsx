import Sort from "../../ui/Sort"
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "upcoming", label: "Upcoming" },
          { value: "playing", label: "Playing" },
          { value: "behind schedule", label: "Behind Schedule" },
        ]}
      />

      <Sort
        options={[
          { value: "startDate-desc", label: "Sort by time (later first)" },
          { value: "startDate-asc", label: "Sort by time (earlier first)" },
          
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
