const ReactionLayout = ({ children, modal }: any) => {
  // const modalState = cookies().get('modal')?.value
  return (
    <div>
      {modal}
      {children}
    </div>
  )
}

export default ReactionLayout
