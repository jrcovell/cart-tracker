//^ same as filter component in the ui folder, but with different options
import styled from "styled-components";
import Filter from "../../ui/Filter";

const StyledFilter = styled.div`
  display: block;
  justify-self: end;
  margin-left: auto;
  gap: 1.4rem;

  /* margin-bottom: 1.4rem; */
`;

function DashboardFilter() {
  return (
    <StyledFilter>
      <Filter
        filterField="day"
        options={[
          // { value: "1", label: "Yesterday" },
          // { value: "0", label: "Today" },
          { value: "7", label: "Last 7 days" },
          { value: "30", label: "Last 30 days" },
          { value: "90", label: "Last 90 days" },
        ]}
      />
    </StyledFilter>
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
