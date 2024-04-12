import supabase from "./supabase";

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
    const { data, error } = await supabase
    .from('carts')
    .insert([newCart]) //* works because the field names in the form match the names in the table
    .select()
  
    if(error) {
      console.error(error)
      throw new Error('Cart could not be created')
    }
}

