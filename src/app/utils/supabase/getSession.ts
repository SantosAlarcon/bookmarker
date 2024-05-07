import { authStore } from "@/store/authStore"
import { createClient } from "./client"

export const getSession = async () => {
  const { setSession, setUser, setMetadata } = authStore.getState()

  const { data, error } = await createClient().auth.getSession()

  if (error) {
    throw new Error(error.message)
  }

  setSession(data.session)
  setUser(data.session?.user)
  setMetadata(data.session?.user.user_metadata)

  return data.session
}
