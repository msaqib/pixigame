import { Tools } from "../system/Tools";
import { GameScene } from "./GameScene";
import { StartScene } from "./StartScene";
import { GameOver } from "./GameOver";

export const Config = {
    loader: Tools.importAll(require.context('./../../sprites', true, /\.(png|mp3)$/)),
    board: {
        width: 800,
        height: 600
    },
    bgSpeed: 2,
    score: {
        x: 10,
        y: 10,
        anchor: 0,
        style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 28
        }
    },

    lives: {
        x: 10,
        y: 45,
        anchor: 0,
        style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 18
        }
    },
    scenes: {
        "Game": GameScene,
        "startScene": StartScene,
        "gameOver": GameOver
    },
    hero: {
        position: {
            x: 200,
            y: 95
        },
        jumpSpeed: 12,
        maxJumps: 2,
        livesRemaining: 3
    },
    platforms: {
        ranges: {
            rows: {
                min: 1,
                max: 3
            },
            cols: {
                min: 3,
                max: 7
            },
            offset: {
                min: 80,
                max: 150
            }
        },
        moveSpeed: -1.5
    },
    diamonds: {
        chance: 0.4,
        score: 10,
        offset: {
            min: 100,
            max: 200
        }
    }
}