import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCarts() {
  //* reads all rows from the carts table(Api docs from supabase)
  const { data, error } = await supabase
    .from("carts") //* selects the carts table
    .select("*"); //* selects all columns (for specific column, use .select('column_name') ex.(.select('price'))

  if (error) {
    console.error(error);
    throw new Error("carts could not be retrieved");
  }

  return data;
}

export async function getLocation(id) {
  const { data, error } = await supabase
    .from("carts")
    .select("cartLocation")
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("location could not be retrieved");
  }

  return data;
}

export async function updateLocation(cart) {
  const { data, error } = await supabase
    .from("carts")
    .update({
      latitude: cart.latitude,
      longitude: cart.longitude,
      active: !cart.active,
    })
    .eq("id", cart.cartId);

  if (error) {
    console.error(error);
    throw new Error("location could not be updated");
  }
  return data;
}

/*
 async function getLocation() {
    // const getLocation = async () => {
    setIntervalId(
      setInterval(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location);

        // update the state on screen
        setLat(location.coords.latitude.toString());
        setLng(location.coords.longitude.toString());

        // update the location in the supabase
        const { error } = await supabase
          .from("carts")
          .update({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          })
          .eq("id", id);

        if (error) {
          Alert.alert("Error updating location");
        }
      }, 10000) // update every 10 seconds
    );

    // this will clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }
*/

export async function deleteCart(id) {
  const { data, error } = await supabase.from("carts").delete().eq("id", id); //* eq is equal to. deletes the row with the id that matches the id passed in

  if (error) {
    console.error(error);
    throw new Error("Cart could not be deleted");
  }

  return data;
}

//! future projects try making separate functions for create and edit. this gets a little too complex for the functionality it provides
export async function createEditCart(newCart, id) {
  console.log(newCart, id);
  //* passing in id to know if we are editing or creating a new cart
  //^ https://supabase.com/docs/reference/javascript/storage-from-upload (for uploading files to the storage bucket docs)

  const hasImagePath = newCart.image?.startsWith?.(supabaseUrl); //* checks if the image path starts with the supabaseUrl(if it does, it means the image is already in the storage bucket, no need to upload it again)

  const imageName = `${Math.random()}-${newCart.image.name}`.replaceAll(
    "/",
    ""
  ); //* generates a random number and adds it to the image name(ensures unique image name) Supabase will create folders for files with / in the name(dont want that)
  // https://ycqgtoxxpgnnmdvckjjw.supabase.co/storage/v1/object/public/carts-icons/cart1.jpg

  const imagePath = hasImagePath
    ? newCart.image
    : `${supabaseUrl}/storage/v1/object/public/carts-icons/${imageName}`; //* path to the image in the storage bucket (if the image is already in the storage bucket, use that, otherwise use the imagePath)

  // 1. Edit/Create a new cart from the form data
  let query = supabase.from("carts");

  //A. create
  if (!id)
    query = query
      // .insert([newCart]) //* works because the field names in the form match the names in the table
      .insert([{ ...newCart, image: imagePath }]); //* imagePath is passed to the image field in the table

  //B. edit
  if (id) query = query.update({ ...newCart, image: imagePath }).eq("id", id); //* updates the cart with the id that matches the id passed in

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cart could not be created");
  }

  // 2. Upload the image to the storage bucket

  if (hasImagePath) return data; //* if the image is already in the storage bucket, return the data

  const { error: storageError } = await supabase.storage
    .from("carts-icons")
    .upload(imageName, newCart.image);

  // 3. Delete Cart if image upload fails
  if (storageError) {
    await supabase.from("carts").delete().eq("id", data.id); //* deletes the cart that was just created(taken from DeleteCart function)

    console.error(storageError);
    throw new Error("Cart image could not be uploaded");
  }

  return data;
}
