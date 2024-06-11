import { cookies } from 'next/headers'

const PostLayout = ({ children, modal }: any) => {
  const modalState = cookies().get('modal')?.value
  return <div>{modalState ? modal : children}</div>
}

export default PostLayout