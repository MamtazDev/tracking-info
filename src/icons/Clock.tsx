export const Clock = ({
  color = "#406AEC",
  width = 20,
  height = 20,
}: {
  color?: string;
  width?: number;
  height?: number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.3333 9.99996C18.3333 14.6 14.6 18.3333 9.99999 18.3333C5.39999 18.3333 1.66666 14.6 1.66666 9.99996C1.66666 5.39996 5.39999 1.66663 9.99999 1.66663C14.6 1.66663 18.3333 5.39996 18.3333 9.99996Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.0917 12.65L10.5083 11.1083C10.0583 10.8416 9.69167 10.2 9.69167 9.67497V6.2583"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
