import styled from 'styled-components'
import Logout from '../features/authentication/Logout'

const StyledHeader = styled.header` //* header is already defined as the component so styled.header instead of Header
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
`

function Header() {
    return (
        <StyledHeader>
            header
            <Logout/>
        </StyledHeader>
    )
}

export default Header
