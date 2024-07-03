import { create } from 'zustand'
type User = {
  username: string
  token: string
  headurl: string
}

type UserStore = {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const useLoginStore = create<UserStore>((set) => ({
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,
  login: (user: User) => {
    set({ user })
    localStorage.setItem('user', JSON.stringify(user))
  },
  logout: () => {
    set({ user: null })
    localStorage.removeItem('user')
  }
}))
export default useLoginStore
