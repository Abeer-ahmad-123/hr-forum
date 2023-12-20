import clsx from 'clsx'

export default function Chip({ children, title, className }: any) {
  return (
    <div
      className={clsx(
        'flex rounded-full bg-background dark:bg-gray-700 dark:text-gray-300',
        className,
      )}
    >
      <button className="p flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300">
        {children}
        <span className="font-light dark:text-gray-300">{title}</span>
      </button>
    </div>
  )
}
