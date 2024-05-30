import styled from "styled-components";
import { useEffect, useState } from "react";
import CreateCartForm from "./CreateCartForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteCart from "./useDeleteCart";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiMapPin, HiSquare2Stack } from "react-icons/hi2";
import { useCreateCart } from "./useCreateCart";
import TrackCart from "./TrackCart";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Button from "../../ui/Button";
import { useGetLocation } from "./useGetLocation";
import { ca } from "date-fns/locale";
import { useCarts } from "./useCarts";
import Spinner from "../../ui/Spinner";

/*
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
*/

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

const Number = styled.div`
  font-family: "Sono";
  font-weight: 500;

  border-radius: 70%;
  border: 3px solid var(--color-grey-200);
  padding: 0.4rem;
  justify-content: center;
  align-items: center;
  display: flex;
  color: var(--color-green-700);
  background-color: var(--color-green-100);
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

function CartRow({ cart, setMonitorLocation, monitorLocation, setIntervalId }) {
  //* cart is passed as a prop to the CartRow from the CartTable
  // const [showForm, setShowForm] = useState(false); //* showForm is a state variable that is used to toggle the form on and off. Obsolete after moving the state to the modal
  const { carts } = useCarts();
  const { active, id: cartId, number, description, image } = cart; //* destructure the cart object
  const { isDeleting, deleteCart } = useDeleteCart(); //* custom hook that returns isDeleting and deleteCart (isDeleting is a boolean that is true when the mutation is in progress. deleteCart(mutate renamed))
  const { isCreating, createCart } = useCreateCart();
  const { isUpdating, updateLocation } = useGetLocation();
  const [selectedCart, setSelectedCart] = useState(cartId);

  function handleDuplicate() {
    createCart({
      number: `${number}`,
      description: `copy of ${number}`,
      active,
      image,
    });
  }

  // async function useHandleActive() {
  //   setMonitorLocation(!monitorLocation);
  //   setSelectedCart(cart.id);

  //   // if (monitorLocation) {
  //   //   return (
  //   //     <Spinner />
  //   //     // clearInterval(intervalId)
  //   //   );
  //   // }

  //   setIntervalId(
  //     setInterval(async () => {
  //       if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition((position) => {
  //           const { latitude, longitude } = position.coords;
  //           console.log(latitude, longitude, cartId);
  //           updateLocation({
  //             cartId: cartId,
  //             latitude: latitude,
  //             longitude: longitude,
  //           });
  //         });
  //       }
  //     }, 5000)
  //   );
  // }
  /*
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude, cartId);
        updateLocation({
          cartId: cartId,
          latitude: latitude,
          longitude: longitude,
        });
      });
    }
  }
  */

  return (
    <Table.Row>
      <Img src={image} />
      <Number>{number}</Number>
      <Description>{description}</Description>
      <TrackCart cart={cart} />

      {/* 
      <Modal>
        <Modal.OpenButton open="track-cart">
          <Button size="medium" variation="active">
            Test
          </Button>
        </Modal.OpenButton>
        <Modal.Window name="track-cart">
          <span>Test</span>
        </Modal.Window>
      </Modal> */}

      {/* <Button
        size="medium"
        variation={monitorLocation ? "active" : "danger"}
        onClick={useHandleActive}
      > */}
      {/* <HiMapPin />
      </Button> */}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cartId} />{" "}
            {/* Toggle is a button that toggles the menu id same purpose to name/open from modals (connecting)  */}
            <Menus.List id={cartId}>
              {" "}
              {/* List contains then menu buttons */}
              <Menus.Button onClick={handleDuplicate} icon={<HiSquare2Stack />}>
                Duplicate
              </Menus.Button>
              <Modal.OpenButton open="edit-form">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.OpenButton>
              <Modal.OpenButton open="delete-form">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.OpenButton>
            </Menus.List>
            <Modal.Window name="edit-form">
              <CreateCartForm cartToEdit={cart} />
            </Modal.Window>
            <Modal.Window name="delete-form">
              <ConfirmDelete
                resourceName="cart"
                disabled={isDeleting}
                onConfirm={() => deleteCart(cartId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CartRow;

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
