import styled from 'styled-components'
import Logo from './Logo'
import MainNav from './MainNav'


const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    grid-row: 1 / -1; //*(defined as a grid component in AppLayout) grid-row: 1 / -1; means the sidebar will span from the first row to the last row (top to bottom of the page)
    display: flex;
    flex-direction: column;
gap: 1rem;
`

function Sidebar() {
    return (
        <StyledSidebar>
        <Logo/>
        <MainNav/>
       
        </StyledSidebar>
    )
}

export default Sidebar
