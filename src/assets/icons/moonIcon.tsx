import { IconProps } from "@/utils/interfaces/icons";

const MoonIcon: React.FC<IconProps> = ({ className, props }) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={`${className}`}
    >
      <path
        stroke="#EEE"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        d="M17.197 11.574a6.483 6.483 0 01-8.771-8.771 7.293 7.293 0 108.771 8.771z"
      ></path>
    </svg>
  );
}

export default MoonIcon;
