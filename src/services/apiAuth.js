import supabase from './supabase'

export async function login({ email, password }) {

const { data, error } = await supabase.auth.
    signInWithPassword({
    email: email,
    password: password
  })
  
  if (error) {
    throw new Error (error.message) 
  }
    // console.log(data) // {user: {…}, session: {…} > role: 'authenticated'}
    return data
  }

  
 export async function getCurrentUser() { 
const {data: session} = await supabase.auth.
getSession(); // gets data from local storage(created when user logs in)
if(!session.session) return null; // = no current user

const {data: user, error } = await supabase.auth.getUser() 
// console.log(user) 

if (error) throw new Error(error.message)

return user?.user
  }

  export async function logout() {
  const {error} = await supabase.auth.signOut();
    if (error) throw new Error(error.message)
  }