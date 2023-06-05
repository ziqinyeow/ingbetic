import { FC } from "react";
import clsx from "clsx";

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={clsx([
        "px-5 py-2 flex items-center text-sm gap-3 hover:bg-gray-100 transition-all duration-200 text-gray-400 hover:text-black rounded-md",
        props?.className,
      ])}
    >
      {children}
    </button>
  );
};

export default Button;
