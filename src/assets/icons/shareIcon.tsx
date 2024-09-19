import { IconProps } from "@/utils/interfaces/icons"

function Icon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      className={className}
      viewBox="0 0 18 18">
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M8.941 4.093c3.581-1.221 5.371-1.832 6.334-.869.963.963.353 2.754-.867 6.335l-.832 2.438c-.937 2.75-1.406 4.125-2.179 4.239-.207.03-.422.012-.628-.054-.764-.246-1.168-1.695-1.977-4.595-.179-.643-.269-.964-.473-1.21a1.522 1.522 0 00-.196-.196c-.246-.204-.567-.294-1.21-.473-2.9-.809-4.35-1.213-4.595-1.977a1.393 1.393 0 01-.054-.628c.114-.773 1.49-1.242 4.24-2.18l2.438-.83z"></path>
    </svg>
  )
}

export default Icon
