const ChannelPill = ({ name }: any) => {
  return (
    <span
      aria-label="channel-name"
      className={`border-1 border-1 mb-2 mr-2 inline-block whitespace-nowrap rounded-lg bg-indigo bg-opacity-30 px-3 py-1 text-sm font-semibold text-indigo ring-1 ring-indigo dark:bg-dark-background-secondary dark:text-white`}>
      {name}
    </span>
  )
}

export default ChannelPill
