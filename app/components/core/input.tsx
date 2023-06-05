"use client";

import clsx from "clsx";

export interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {
  className?: string;
  wrapperClassName?: string;
}

const Input = ({ className, wrapperClassName, ...props }: InputProps) => {
  return (
    <>
      <div className="relative flex items-center justify-center w-full text-sm group">
        <div
          className={clsx([
            "absolute transition duration-500 rounded-md -inset-0.5 bg-gradient-to-r opacity-20 group-hover:duration-200 group-hover:opacity-100 blur",
            wrapperClassName,
          ])}
        />
        <input
          className={clsx([
            "relative w-full p-3 bg-white rounded-md dark:bg-gray-900 focus:outline-none focus:ring",
            className,
          ])}
          type="text"
          {...props}
        />
      </div>
      {/* <input
        className={clsx([
          "w-full border-2 px-3 py-2 rounded-md text-sm",
          className,
        ])}
        {...props}
      /> */}
    </>
  );
};
export default Input;
