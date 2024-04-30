import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "react-hot-toast";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";

import DashBoard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Map from "./pages/Map";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Carts from "./pages/Carts";
import { BiFontSize } from "react-icons/bi";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 30, //* amount of time before data is considered stale (1 minute)
      staleTime: 0, //* data always considered stale (using in oasis project?)
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        {" "}
        {/*//* QueryClientProvider is a wrapper component that provides the query client to the rest of the application */}
        <ReactQueryDevtools initialIsOpen={false} />{" "}
        {/*//* devtools component that displays the state of the query client */}
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />{" "}
              {/*//* same as {<Route path='dashboard' element={<DashBoard/>} />}*/}
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<CheckIn />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="carts" element={<Carts />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
              <Route path="map" element={<Map />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 4000,
            },
            error: {
              duration: 4000,
            },
            style: {
              fontSize: "16px",
              padding: "16px 24px",
              maxWidth: "400px",
              opacity: 0.9,
              backgroundColor: "var(--color-gray-100)",
              color: "var(--color-gray-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
