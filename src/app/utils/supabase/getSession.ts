import { authStore } from "@/store/authStore"
import { createClient } from "./client"

export const getSession = async () => {
<<<<<<< HEAD
    const supabase = createClient();
    const {setSession, setUser, setMetadata} = authStore.getState()
=======
  const { setSession, setUser, setMetadata } = authStore.getState()
>>>>>>> 5459495a5457bf2b1d7da153d6c386ac748866ff

  const { data, error } = await createClient().auth.getSession()

  if (error) {
    throw new Error(error.message)
  }

<<<<<<< HEAD
    setSession(data.session)
    // @ts-ignore
    setUser(data.session?.user)
    setMetadata(data.session?.user.user_metadata)
   
    return data.session;
=======
  setSession(data.session)
  setUser(data.session?.user)
  setMetadata(data.session?.user.user_metadata)

  return data.session
>>>>>>> 5459495a5457bf2b1d7da153d6c386ac748866ff
}
