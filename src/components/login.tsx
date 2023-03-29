import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";

import styles from "./login.module.css";

interface LoginProps {
  handleButtonClick: () => void;
}

export default function Login({ handleButtonClick }: LoginProps) {
  return (
    <div className={styles.container}>
      <Button variant="contained" onClick={handleButtonClick} size="large">
        Start with Wasd3r Wallet
      </Button>
      <Image
        src="/img/hello_cat_with_wallet.png"
        alt="Wassup! Wasd3r wallet is easy and awesome meow!!"
        width={300}
        height={300}
        priority
        className={styles.image}
      />
    </div>
  );
}
