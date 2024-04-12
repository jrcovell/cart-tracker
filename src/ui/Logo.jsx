import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;

`;

const Img = styled.img`
  height: auto;
  width: auto;
  
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-main.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
