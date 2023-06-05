// "use client";

import clsx from "clsx";
import styles from "./background.module.css";

export default function Background() {
  return (
    <div className={clsx([styles.main, "z-[1]"])}>
      <div className={styles.content} />
    </div>
  );
}
