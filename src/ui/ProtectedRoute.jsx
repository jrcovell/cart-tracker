
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { is } from "date-fns/locale";

const FullPageSpinner = styled.div` // full page spinner
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

function ProtectedRoute({children}) {
    const navigate = useNavigate();
//1. Load the auth user
const {user, isPending, isAuthenticated} = useUser();

//2. if user is not authenticated, redirect to login page
useEffect(function(){
if(!isAuthenticated && !isPending) navigate('/login') // after page loads and user is not authenticated, redirect to login page
}, [isAuthenticated, isPending, navigate])

//* why do we need to use useEffect here and not just use the navigate function directly? ^^^
// if (!isAuthenticated) {
//     navigate('/login')
//     return null
// }

//3. spinner while loading
if (isPending) return ( 
    <FullPageSpinner>
    <Spinner/>
    </FullPageSpinner>
)

//4. if user is authenticated, render the children
  if(isAuthenticated) return children        
}

export default ProtectedRoute
