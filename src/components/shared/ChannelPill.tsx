import { useSelector } from 'react-redux'

const ChannelPill = ({ name }) => {
  const color = useSelector((state: any) => state.colorMode.color)
  console.log('color', color)
  return (
    <span
      aria-label="channel-name"
      className={`border-1 mb-2 mr-2 inline-block whitespace-nowrap rounded-lg px-3 py-1 text-sm font-semibold  dark:bg-dark-background-secondary dark:text-white`}>
      {name}
    </span>
  )
}

export default ChannelPill
