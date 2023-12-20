const ReturnIconButton = ({ condition, FirstIcon, SecondIcon, style }: any) => {
  return condition ? (
    <FirstIcon className="text-white" {...style} data-testid="first-icon" />
  ) : (
    <SecondIcon className="text-accent" {...style} data-testid="second-icon" />
  )
}

export default ReturnIconButton
