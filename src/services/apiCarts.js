import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCarts() { //* reads all rows from the carts table(Api docs from supabase)
    const { data, error } = await supabase
    .from('carts') //* selects the carts table
    .select('*')  //* selects all columns (for specific column, use .select('column_name') ex.(.select('price'))

    if(error) {
        console.error(error)
        throw new Error('carts could not be retrieved')
    }

    return data;
}

export async function getLocation() {
    const { data, error } = await supabase
    .from('carts')
    .select('location')

    if(error) {
        console.error(error)
        throw new Error('locations could not be retrieved')
    }

    return data;
}

export async function deleteCart(id) {
const { data, error } = await supabase 
.from('carts')
.delete()
.eq('id', id) //* eq is equal to. deletes the row with the id that matches the id passed in

if(error) {
    console.error(error)
    throw new Error('Cart could not be deleted')
}

return data;
}

export async function createCart(newCart) {
//^ https://supabase.com/docs/reference/javascript/storage-from-upload (for uploading files to the storage bucket docs)

    const imageName = `${Math.random()}-${newCart.image.name}`.replaceAll('/','') //* generates a random number and adds it to the image name(ensures unique image name) Supabase will create folders for files with / in the name(dont want that)
// https://ycqgtoxxpgnnmdvckjjw.supabase.co/storage/v1/object/public/carts-icons/cart1.jpg

const imagePath = `${supabaseUrl}/storage/v1/object/public/carts-icons/${imageName}` //* path to the image in the storage bucket


    // 1. Create a new cart from the form data
    const { data, error } = await supabase
    .from('carts')
    // .insert([newCart]) //* works because the field names in the form match the names in the table
    .insert([{...newCart, image: imagePath}]) //* imagePath is passed to the image field in the table
    .select()
  
    if(error) {
      console.error(error)
      throw new Error('Cart could not be created')
    }

    // 2. Upload the image to the storage bucket

const { error: storageError } = await supabase
  .storage
  .from('carts-icons')
  .upload(imageName, newCart.image)

// 3. Delete Cart if image upload fails
if(storageError) {
    await supabase 
    .from('carts')
    .delete()
    .eq('id', data.id) //* deletes the cart that was just created(taken from DeleteCart function)

    console.error(storageError)
    throw new Error('Cart image could not be uploaded')
}

    return data;
}

