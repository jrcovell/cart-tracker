import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({filterField, options}) {
  const [searchParams, setSearchParams] = useSearchParams()  //* hook from react-router. It returns an array with two elements: the first element is a URLSearchParams object, and the second element is a function to update the query string. 
const currentSelection = searchParams.get(filterField) || options.at(0) //* first value if not defined. allows the active filter to be styled with above styled components and active prop below



function handleClick(value) {
searchParams.set(filterField, value)
setSearchParams(searchParams) //* (/carts?type=allCarts)

}

  return (
<StyledFilter>
  {options.map(option=>
  
<FilterButton
onClick={()=> handleClick(option.value)} key={option.label} active={option.value === currentSelection} disabled={option.value === currentSelection} >
  {option.label}
</FilterButton>
  
  )}

  </StyledFilter>
  )
}

/* //* ver. 1 (not reusable)
function Filter() {
  const [searchParams, setSearchParams] = useSearchParams()  //* hook from react-router. It returns an array with two elements: the first element is a URLSearchParams object, and the second element is a function to update the query string. 

function handleClick(value) {
searchParams.set('type', value)
setSearchParams(searchParams) //* (/carts?type=allCarts)

}

  return (
<StyledFilter>
<FilterButton onClick={()=> handleClick('allCarts')}>All Carts</FilterButton>
<FilterButton onClick={()=> handleClick('activeCarts')}>Active Carts</FilterButton>
  </StyledFilter>
  )
}
*/
export default Filter
