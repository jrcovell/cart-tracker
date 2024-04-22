import SortBy from "../../ui/Sort"
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
          { value: "completed", label: "Completed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startTime-desc", label: "Sort by time (later first)" },
          { value: "startTime-asc", label: "Sort by time (earlier first)" },
          
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
