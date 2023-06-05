// import { mono } from "@/lib/font";
import clsx from "clsx";
import React, { useState } from "react";
import { createPortal } from "react-dom";

export interface IframeProps
  extends React.DetailedHTMLProps<
      React.IframeHTMLAttributes<HTMLIFrameElement>,
      HTMLIFrameElement
    >,
    React.AriaAttributes {
  children?: React.ReactNode;
  className?: string;
}

const Iframe = ({ children, className, ...props }: IframeProps) => {
  const [contentRef, setContentRef] = useState<any>(null);

  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <iframe {...props} ref={setContentRef} className={clsx([className])}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

export default Iframe;
