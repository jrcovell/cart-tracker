import styled, {css} from 'styled-components';

/*
const test = css`text-align: center;
${10 > 5 && "background-color: red"} //* css is needed for ternary operator like this(interpolation)
` //* css not necessary but it allows auto completion( + syntax highlighting)
*/

//* creates a styled component named Heading (with a random class name) 
 const Heading = styled.h1`
${(props) => props.type === "h1" && css`font-size: '5rem';
 font-weight: 600;`}

 ${(props) => props.type === "h2" && css`font-size: '2rem';
 font-weight: 300;`}

 ${(props) => props.type === "h3" && css`font-size: '1rem';
 font-weight: 100;  background-color: yellow;
`}

${(props) => props.type === "h4" && css`font-size: '6rem';
    font-weight: 600;
    text-align: center;
    `}

 line-height: 1.4;
 color: steelblue;
`;

export default Heading;