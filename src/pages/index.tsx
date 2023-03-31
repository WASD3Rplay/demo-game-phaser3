import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import React, { useEffect, useState } from "react";

import HomeCenterLayout from "@/components/home_center_layout";
import Login from "@/components/login";
import StartGame from "@/components/start_game";
import Game from "@/components/game";
import styles from "@/styles/Home.module.css";

export enum GameStatus {
  NEED_LOGIN = 0,
  BEFORE_GAME_START = 1,
  GAME_STARED = 2,
  GAME_OVER = 3,
}

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
    
    if (window?.w3r) {
      window.w3r.send("toggleLogin", {
        onLoginSuccess: (user:any) => {
          console.log("Login Success!")
          setGameStatus(GameStatus.BEFORE_GAME_START);
        },
      });
    } else {
      console.log("w3r not initialized");
    }
    // TODO: need to login by SDK
  };

  const handleStartGameButtonClick = () => {
    setDesc("Please enjoy the game 🍹");
    setGameStatus(GameStatus.GAME_STARED);
  };

  const handleOnClickRankBoard = () => {
    alert("I would show you the Rank Board! The name is TBD!!!");
  };

  const handleOnClickGameHistory = () => {
    alert("I would show you the Game History! The name is TBD!!!");
  };

  const handleTogglePortfolio = () => {
    if (gameStatus === GameStatus.NEED_LOGIN) {
      alert('Please click "Start with Wasd3r Wallet" first~meow~!');
      return;
    }

    if (window?.w3r) {
      window.w3r.send("togglePortfolio");
    } else {
      console.log("w3r not initialized");
    }
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
            onClick={handleOnClickRankBoard}
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
            onClick={handleOnClickGameHistory}
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
            onClick={handleTogglePortfolio}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              👑 Wallet Portfolio <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Check out coins you earned.</p>
          </a>
          <a
            href="https://wasd3r.xyz/beta"
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
