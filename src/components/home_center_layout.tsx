import React from "react";

import styles from "./home_center_layout.module.css";

export default function HomeCenterLayout({
  children,
}: React.PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}
