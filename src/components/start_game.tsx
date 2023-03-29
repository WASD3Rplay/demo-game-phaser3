import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";

import styles from "./start_game.module.css";

interface StartGameProps {
  handleButtonClick: () => void;
}

export default function StartGame({ handleButtonClick }: StartGameProps) {
  return (
    <div className={styles.container}>
      <Button variant="contained" onClick={handleButtonClick} size="large">
        Start Game! Good Luck 🍹
      </Button>
      <Image
        src="/img/stars_in_the_sky.png"
        alt="Go get your stars!!"
        width={300}
        height={300}
        priority
        className={styles.image}
      />
    </div>
  );
}
