import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { is } from "date-fns/locale";
import Spinner from "../../ui/Spinner";
import { useRecentRounds } from "./useRecentRounds";
import RoundStats from "./RoundStats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isPending, error } = useRecentBookings();
  const {
    rounds,
    confirmedRounds,
    isPending: isPendingRounds,
    error: errorRounds,
  } = useRecentRounds();

  if (isPending || isPendingRounds) <Spinner />;
  console.log(confirmedRounds);
  console.log(bookings);

  return (
    <StyledDashboardLayout>
      <RoundStats bookings={bookings} confirmedRounds={confirmedRounds} />
      <div>Stats</div>
      <div>Activity List</div>
      <div>Duration?</div>
    </StyledDashboardLayout>
  );
}
export default DashboardLayout;
