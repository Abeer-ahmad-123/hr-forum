import { userData } from './userData'

export interface RenderChildrenProps {
  isError: boolean
  pathname: string | null
  children: React.ReactNode
  user: userData
  token: string
}
