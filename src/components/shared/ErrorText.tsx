interface ErrorTextProps {
  text: string
}

const ErrorText: React.FC<ErrorTextProps> = ({ text }) => {
  return (
    <h1 className="ml-2 text-left text-xs font-[200]  text-red dark:text-red">
      {text}
    </h1>
  )
}

export default ErrorText
