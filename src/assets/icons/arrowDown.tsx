interface ArrowDownProps {
  className: string;
}

function ArrowDown({ className }: ArrowDownProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        stroke="#141B34"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15 7.5s-3.682 5-5 5-5-5-5-5"
      ></path>
    </svg>
  );
}

export default ArrowDown;
