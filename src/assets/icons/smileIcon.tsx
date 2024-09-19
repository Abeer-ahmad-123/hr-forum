import { IconProps } from "@/utils/interfaces/icons";

const SmileIcon: React.FC<IconProps> = ({ className = 'ml-4' }) => {
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
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 18.333a8.333 8.333 0 100-16.667 8.333 8.333 0 000 16.667zM8.333 9.166l-1.25-1.25m0 0l-1.25-1.25m1.25 1.25l-1.25 1.25m1.25-1.25l1.25-1.25m5.834 2.5l-1.25-1.25m0 0l-1.25-1.25m1.25 1.25l-1.25 1.25m1.25-1.25l1.25-1.25"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.667 12.5A4.16 4.16 0 0010 14.167a4.16 4.16 0 003.333-1.667"
      ></path>
    </svg>
  );
}

export default SmileIcon;
