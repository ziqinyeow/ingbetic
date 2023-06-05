"use client";

import clsx from "clsx";

export interface InputProps
  extends React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    React.AriaAttributes {
  className?: string;
  wrapperClassName?: string;
}

const Textarea = ({ className, wrapperClassName, ...props }: InputProps) => {
  return (
    <>
      <div className="relative w-full text-sm group">
        <div
          className={clsx([
            "absolute transition duration-500 rounded-md -inset-0.5 bg-gradient-to-r opacity-20 group-hover:duration-200 group-hover:opacity-100 blur",
            wrapperClassName,
          ])}
        />
        <textarea
          className={clsx([
            "relative w-full p-3 min-h-[80px] bg-white rounded-md focus:outline-none focus:ring",
            className,
          ])}
          {...props}
        ></textarea>
      </div>
    </>
  );
};
export default Textarea;
