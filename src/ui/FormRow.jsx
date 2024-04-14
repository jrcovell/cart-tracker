import styled from "styled-components";


const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({label, error, children}) {


    return (
        <StyledFormRow>
        {/* //& old version when this was in CreateCartForm */}
        {/* //&<Label htmlFor="description">Description for website</Label> */}
        {label && <Label htmlFor={children.props.id}>{label}</Label>}
        {/* //* only one children being passed (Input) so we can access the id for the htmlFor to make it fully dynamic */}
        {/*//& <Textarea type="number" id="description" defaultValue="" {...register('description',
        {/* keeping input field in CreateCartForm */}
    {children}
        {/* //&{errors.description && <Error>{errors.description.message}</Error>} */}
        {error && <Error>{error}</Error>}
      </StyledFormRow>
    )
}

export default FormRow
