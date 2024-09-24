interface iconprop {
  className: string
  onClick: () => void
}
function Icon({ className, onClick }: iconprop) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      className={className}
      onClick={onClick}
      height="16"
      fill="none"
      viewBox="0 0 23 16">
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M21.044 7.045c.304.426.456.64.456.955 0 .316-.152.529-.456.955C19.678 10.871 16.189 15 11.5 15c-4.69 0-8.178-4.13-9.544-6.045C1.652 8.529 1.5 8.315 1.5 8c0-.316.152-.529.456-.955C3.322 5.129 6.811 1 11.5 1c4.69 0 8.178 4.13 9.544 6.045z"></path>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M14.5 8a3 3 0 10-6 0 3 3 0 006 0z"></path>
    </svg>
  )
}

export default Icon
