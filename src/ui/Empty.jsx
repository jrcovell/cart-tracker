import { useMoveBack } from "../hooks/useMoveBack";
import Button from "./Button";
import Row from "./Row";

function Empty({ resourceName }) {
  const moveBack = useMoveBack();
  return (
    <Row type="horizontal">
      <p>No {resourceName} could be found.</p>
      <Button onClick={moveBack}>Go Back</Button>
    </Row>
  );
}

export default Empty;
