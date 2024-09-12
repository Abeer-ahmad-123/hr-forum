const ReturnIconButton = ({ condition, FirstIcon, SecondIcon, style, }: any) => {
  return condition ? (
    <FirstIcon className="text-white h-[18px] w-[18px] md:h-5 md:w-5" {...style} data-testid="first-icon" />
  ) : (
    <SecondIcon className="text-bg-dark-grey h-[18px] w-[18px] md:h-5 md:w-5" {...style} data-testid="second-icon" />
  )
}

export default ReturnIconButton
