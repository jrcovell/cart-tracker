import styled, { css } from "styled-components";


const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

/////////

export const Button = styled.button`
border: none;
border-radius: 7px;
box-shadow: var(--shadow-sm);

${(props) => sizes[props.size || "medium"]}; //* default to medium if no size is provided 
${(props) => variations[props.variation || "primary"]} //* default to primary if no variation is provided
`;

// Button.defaultProps = { //* different way to set default props(set above)
//   size: "medium",
//   variation: "primary",
// };

//* old code
/* font-size: 1.4rem; */
/* padding: 1.2rem 1.6rem; */
/* background-color: var(--color-brand-600); //* <--design token */
/* color: white; */
/* cursor: pointer; */
/* &:hover { //* & is a reference to the current element || transition time is globally set in GlobalStyles.js */
/* background-color: var(--color-brand-900); //* <--design token */

export default Button;
