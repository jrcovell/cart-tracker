import Sort from "../../ui/Sort";
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
          { value: "checked-in", label: "Checked In" },
          { value: "playing", label: "Playing" },
          { value: "completed", label: "Completed" },
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
