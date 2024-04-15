import styled from "styled-components";
import { useState } from "react";
import CreateCartForm from "./CreateCartForm";
import useDeleteCart from "./useDeleteCart";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { useCreateCart } from "./useCreateCart";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;



const Cart = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Active = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Number = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Description = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Location = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CartRow({cart}) { //* cart is passed as a prop to the CartRow from the CartTable 
const [showForm, setShowForm] = useState(false); //* showForm is a state variable that is used to toggle the form on and off

const {active, id: cartId, number, description, image} = cart //* destructure the cart object
const {isDeleting, deleteCart} = useDeleteCart();  //* custom hook that returns isDeleting and deleteCart (isDeleting is a boolean that is true when the mutation is in progress. deleteCart(mutate renamed))
const {isCreating, createCart} = useCreateCart();



function handleDuplicate() {
  createCart({
    number: `${number}`,
    description: `copy of ${number}`,
    active,
    image,
  })
}

  return (

    <>
  <TableRow role="row">  
    <Img src={image} />
    <Number>{number}</Number>
    <Active>{active ? 'Yes' : 'No'}</Active>
    <Description>{description}</Description>
    <div>
      <button disabled={isCreating} onClick={handleDuplicate}><HiSquare2Stack/></button>
      <button onClick={() => setShowForm((show) => !show)}><HiPencil/></button>
      <button onClick={() => deleteCart(cartId)} disabled={isDeleting}><HiTrash/></button>
      </div>
      </TableRow>
    {showForm && <CreateCartForm cartToEdit={cart}/>}
    </>
  )
}

export default CartRow

/* //* refactored into a custom hook useDeleteCart
const queryClient = useQueryClient(); //* useQueryClient is a react-query hook that is used to access the queryClient

const {isLoading: isDeleting, mutate} = useMutation({ //* useMutation is a react-query hook that is used to mutate data(useQuery is used to fetch data)
  mutationFn: (id) => deleteCart(id), //* mutationfn is a function that is called when the mutation is triggered. deleteCart defined in apiCarts.js 
  onSuccess: () => {
  toast.success('cart deleted');
  queryClient.invalidateQueries({
    queryKey: ["cart"], //* queryKey is the key of the query that is to be invalidated
  }) //* onSuccess is a"@tanstack/react-query" function that is called when the mutation is successful. queryClient is a react-query hook that is used to invalidate queries. invalidating the query will refetch the data, updating the UI.
},
onError: (err) => toast.error(err.message), //* onError is a function that is called when the mutation fails. alert is a function that displays an alert box with the error message
});
*/