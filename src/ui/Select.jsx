import styled from "styled-components";

const StyledSelect = styled.select` //* select html element allows for dropdown menu
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({options, value, onChange, ...props}) {
  // console.log(props) //* {type: 'white'} (contains all other props passed to component). Not necessary here bc we are only passing type prop, but could be useful in other cases
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </StyledSelect>
  )
}

export default Select

