const PostLayout = ({ children, modal }: any) => {
  return (
    <div>
      {modal}
      {children}
    </div>
  )
}

export default PostLayout
