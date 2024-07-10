import { format } from "date-fns/format";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getTodayNoTime } from "../utils/helpers";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          Todays Highlights - {format(getTodayNoTime(-1), "MMM dd")}
        </Heading>
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
