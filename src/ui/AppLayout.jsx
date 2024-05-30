import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
//test
const StyledAppLayout = styled.div`
  display: grid; //* grid is used to layout sidebar and main content
  grid-template-columns: 26rem 1fr; //* 26rem for sidebar and 1fr(fraction unit (flexible)) for main content (sidebar will stay 26rem and main content will take up the rest of the space)
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll; //main content will scroll if content is too long. sidebar will stay fixed
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        {" "}
        {/*//* placing Outlet around a main to allow easier styling. placing components with fragments will render with <main> styling*/}
        <Container>
          {" "}
          {/* //*Container is used to limit the width of the table content*/}
          <Outlet />{" "}
          {/*//* renders nested routes (think {children for react-router})*/}
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
