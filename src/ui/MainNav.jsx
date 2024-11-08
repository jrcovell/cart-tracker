import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineHome,
  HiCog,
  HiOutlineHomeModern,
  HiOutlineUser,
  HiMiniUserGroup,
  HiOutlineCog8Tooth,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { GiCarWheel } from "react-icons/gi";
import { IoGolfOutline } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
import { PiCarSimple } from "react-icons/pi";
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

// const Link = styled.a`
const StyledNavLink = styled(NavLink)`
  //* can pass in another component to styled to style that component
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      {" "}
      {/*//* nav is a semantic element used to define navigation links*/}
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings">
            <IoGolfOutline />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/map">
            <HiOutlineMapPin />
            <span>Map</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/carts">
            <GiCarWheel />
            <span>Carts</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiMiniUserGroup />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog8Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>

        {/* <li><Link href="/bookings">Bookings</Link></li> //* using NavLink (part of react router) over this because Link causes page transitions*/}
      </NavList>
    </nav>
  );
}

export default MainNav;
