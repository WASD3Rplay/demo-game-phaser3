import React, { useCallback, useEffect, useState } from "react";

import styles from "./start_game.module.css";
import PhaserGame from "./phaser_game";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
} from "@mui/material";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TimerIcon from "@mui/icons-material/Timer";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useRouter } from "next/router";

declare global {
  interface Window {
    Phaser: any;
    w3r: any;
  }
}

interface GameResult {
  score: number;
  bombCount: number;
  playtime: number;
}

let _game: any = null;

interface GameProps {}

export default function Game({}: GameProps) {
  const router = useRouter();

  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameSoundMute, setIsGameSoundMute] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const handleGameOverCallback = (result: GameResult): void => {
    // TODO: Send Txn to save the game result.

    setIsGameOver(true);
    setGameResult(result);
  };
  const clearGame = (): void => {
    _game.destroy(true, false);
    PhaserGame.destroyGame();
  };

  const handleOnClickSoundMute = (): void => {
    setIsGameSoundMute(true);
    PhaserGame.muteSound();
  };

  const handleOnClickSoundUnmute = (): void => {
    setIsGameSoundMute(false);
    PhaserGame.unmuteSound();
  };

  const handleOnClickLetsRock = (): void => {
    clearGame();

    setIsGameOver(false);
    setGameResult(null);

    router.replace(window.location.pathname);
  };

  const handleOnClickShowTheCat = (): void => {
    clearGame();
    router.reload();
  };

  const startGame = (): void => {
    const gameConfig = {
      type: window.Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "div-game-board",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: {
        preload: PhaserGame.preload,
        create: PhaserGame.create,
        update: PhaserGame.update,
      },
    };

    _game = new window.Phaser.Game(gameConfig);
  };

  useEffect(() => {
    console.debug("Game:", _game);

    if (_game !== null) {
      clearGame();
    }

    startGame();

    PhaserGame.setGameOverCallback(handleGameOverCallback);
  }, []);

  return (
    <Box>
      <div id="div-game-board" className={styles.container}>
        {isGameOver && gameResult !== null ? (
          <Box
            sx={{
              width: 360,
              borderRadius: 2,
              backgroundColor: "#0b1e61",
              padding: 1.2,
              zIndex: "modal",
              position: "absolute",
            }}
          >
            <List>
              <ListItem>
                <h1>Game Result</h1>
              </ListItem>
              <ListItem>
                <p>Your game result is stored in the blockchain </p>
              </ListItem>
              <ListItem></ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "#ff28c6ff" }}>
                    <SportsScoreIcon style={{ color: "#83ff6a" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Score:" />
                <ListItemSecondaryAction>
                  <Button
                    variant="text"
                    style={{ fontSize: "32px", color: "#00daff" }}
                  >
                    {gameResult.score}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "#ff28c6ff" }}>
                    <AutoAwesomeIcon style={{ color: "#83ff6a" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Level:" />
                <ListItemSecondaryAction>
                  <Button
                    variant="text"
                    style={{ fontSize: "32px", color: "#00daff" }}
                  >
                    {gameResult.bombCount}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "#ff28c6ff" }}>
                    <TimerIcon style={{ color: "#83ff6a" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Play Time:" />
                <ListItemSecondaryAction>
                  <Button
                    variant="text"
                    style={{ fontSize: "32px", color: "#00daff" }}
                  >
                    {PhaserGame.getPlaytimeText(gameResult.playtime)}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            {/*
          <hr style={{ margin: "20px 0" }} />
          */}
            <div style={{ margin: "20px 0" }}>
              {/*
            <h2 style={{ padding: "10px 0 20px 0", textAlign: "center" }}>
              One more round?
            </h2>
            */}
              <Stack direction="column" spacing={2}>
                {/*
              <Button variant="contained" onClick={handleOnClickLetsRock}>
                Let&apos;s Rock
              </Button>
              */}
                <Button variant="outlined" onClick={handleOnClickShowTheCat}>
                  Show me the Cat
                </Button>
              </Stack>
            </div>
          </Box>
        ) : (
          <></>
        )}
      </div>
      <Box sx={{ textAlign: "end", margin: "20px" }}>
        {isGameSoundMute ? (
          <Button onClick={handleOnClickSoundUnmute}>
            <VolumeOffIcon sx={{ color: "white" }} />
          </Button>
        ) : (
          <Button onClick={handleOnClickSoundMute}>
            <VolumeUpIcon sx={{ color: "white" }} />
          </Button>
        )}
      </Box>
    </Box>
  );
}
