import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import React, { useEffect, useState } from "react";

import HomeCenterLayout from "@/components/home_center_layout";
import Login from "@/components/login";
import StartGame from "@/components/start_game";
import Game from "@/components/game";
import { GameStatus } from "@/controllers/game_status";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.NEED_LOGIN
  );
  const [desc, setDesc] = useState<string>(
    "Please login to start the new game!"
  );
  const [centerComponent, setCenterComponent] = useState<React.ReactNode>();

  const handleLoginButtonClick = () => {
    setDesc('Please click the "Start Game" button 🚀');
    setGameStatus(GameStatus.BEFORE_GAME_START);

    // TODO: need to login by SDK
  };

  const handleStartGameButtonClick = () => {
    setDesc("Please enjoy the game 🍹");
    setGameStatus(GameStatus.GAME_STARED);
  };

  useEffect(() => {
    console.debug("Game Status in Store:", gameStatus);

    switch (gameStatus) {
      case GameStatus.NEED_LOGIN:
        setCenterComponent(
          <Login handleButtonClick={handleLoginButtonClick} />
        );
        break;

      case GameStatus.BEFORE_GAME_START:
        setCenterComponent(
          <StartGame handleButtonClick={handleStartGameButtonClick} />
        );
        break;

      case GameStatus.GAME_STARED:
        setCenterComponent(<Game />);
        break;

      default:
        break;
    }
  }, [gameStatus]);

  return (
    <>
      <Script src="//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js" />
      <Head>
        <title>Wasd3r Demo Game: Phaser3 Get Stars</title>
        <meta
          name="description"
          content="Wasd3r Demo Game: Phaser3 Get Stars"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>{desc}</p>
          <div>
            <a
              href="https://wasd3r.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/logo/Color_logo-no_background.png"
                alt="Wasd3r Logo"
                width={150}
                height={36}
                placeholder="blur"
                blurDataURL="/logo/Color_logo-no_background.png"
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <HomeCenterLayout>{centerComponent}</HomeCenterLayout>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              🎉 Rank Board <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Let&apos;s find out your highest rank.
            </p>
          </a>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              🌟 Game History <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Do you want to check your scores?!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              👑 Wallet Profile <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Check out coins you earned.</p>
          </a>
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              🔎 Deep Dive <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Please let you know about us.</p>
          </a>
        </div>
      </main>
    </>
  );
}
