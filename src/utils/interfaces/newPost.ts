import { userData } from './userData'

export interface PostBarProps {
  addPost: boolean
  setAddPost: (arg0: boolean) => void
  user?: userData
}
export interface NewPostProps {
  addPost: boolean
  setAddPost: (arg0: boolean) => void
  user: number
}
