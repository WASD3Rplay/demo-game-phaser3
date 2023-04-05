import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { pageStatusAtom } from "@/atoms/gameStatusAtom";
import Game from "@/components/game";
import HomeCenterLayout from "@/components/home_center_layout";
import Login from "@/components/login";
import StartGame from "@/components/start_game";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [pageStatus, setPageStatus] = useRecoilState(pageStatusAtom);

  const [desc, setDesc] = useState<string>("");

  const handleLoginButtonClick = () => {
    try {
      if (window?.w3r) {
        window.w3r.send("login", {
          onLoginSuccess: (email:string, profileImg:string) => {
            console.log("Login Success!");
            setPageStatus("ready_to_game");
          },
        });
      } else {
        console.log("w3r not initialized");
        alert("Wooooooooops! 'wasd3r' is not initialized.");
      }
    } catch (error) {
      console.error(error);
    }

    if (process.env.NODE_ENV === "development") {
      setPageStatus("ready_to_game");
    }
  };

  const handleStartGameButtonClick = () => {
    setPageStatus("playing_game");
  };

  const handleOnClickRankBoard = () => {
    alert("I would show you the Rank Board later! Work in progress!!!");
  };

  const handleOnClickGameHistory = () => {
    alert("I would show you the Game History later! Work in progress!!!");
  };

  const handleTogglePortfolio = () => {
    if (pageStatus === "before_login") {
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
    // Save the current page status to local storage whenever it changes
    localStorage.setItem("pageStatus", pageStatus);

    switch (pageStatus) {
      case "before_login":
        setDesc("Please login to start the new game!");
        break;

      case "ready_to_game":
        setDesc('Please click the "Start Game" button 🚀');
        break;

      case "playing_game":
        setDesc("Please enjoy the game 🍹");
        break;

      default:
        break;
    }
  }, [pageStatus]);

  useEffect(() => {}, [pageStatus]);

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
          <HomeCenterLayout>
            {pageStatus === "before_login" && (
              <Login handleButtonClick={handleLoginButtonClick} />
            )}
            {pageStatus === "ready_to_game" && (
              <StartGame handleButtonClick={handleStartGameButtonClick} />
            )}
            {pageStatus === "playing_game" && <Game />}
          </HomeCenterLayout>
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
