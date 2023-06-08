import { FC } from "react";
import Logo from "./logo";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="justify-between py-10 text-sm layout">
      <Logo />
      <div>Made with 🤍</div>
    </div>
  );
};

export default Footer;
