import SortBy from "../../ui/Sort"
// import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      {/* <Filter
        filterField="id"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      /> */}

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
