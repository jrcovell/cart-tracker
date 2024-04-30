import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      //* options is optional, but we can add more data to the user
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    throw new Error(error.message);
  }
  // console.log(data) // {user: {…}, session: {…} > role: 'authenticated'}
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession(); // gets data from local storage(created when user logs in)
  if (!session.session) return null; // = no current user
  const { data: user, error } = await supabase.auth.getUser();
  // console.log(user) // {id: '...', aud: 'authenticated', role: 'authenticated'}
  if (error) throw new Error(error.message);

  return user?.user;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  //1. update password or full name. need to be done one at a time
  let updateData;
  // can only update one at a time so using this if statement
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } }; // matches the data object in the user signup above
  //automatically knows current user
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2. upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`; // unique name by adding random number

  const { error: imageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (imageError) throw new Error(imageError.message);
  //3. update avatar image in the user
  const { data: avatarData, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarError) throw new Error(avatarError.message);
  return avatarData;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
