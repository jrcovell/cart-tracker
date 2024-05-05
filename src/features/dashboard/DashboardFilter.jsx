//^ same as filter component in the ui folder, but with different options
import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="day"
      options={[
        { value: "1", label: "Yesterday" },
        { value: "0", label: "Today" },
      ]}
    />
  );
}

export default DashboardFilter;

/*
   <Filter
      filterField="last"
      options={[
        { value: "0", label: "Today" },
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "90", label: "Last 90 days" },
      ]}
    />
    */
