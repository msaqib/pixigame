import { Tools } from "../system/Tools";
import { GameScene } from "./GameScene";
import { StartScene } from "./StartScene";

export const Config = {
    loader: Tools.importAll(require.context('./../../sprites', true, /\.(png|mp3)$/)),
    bgSpeed: 2,
    score: {
        x: 10,
        y: 10,
        anchor: 0,
        style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 44
        }
    },
    scenes: {
        "Game": GameScene,
        "startScene": StartScene
    },
    hero: {
        position: {
            x: 200,
            y: 95
        },
        jumpSpeed: 15,
        maxJumps: 2,
        livesRemaining: 3
    },
    platforms: {
        ranges: {
            rows: {
                min: 3,
                max: 6
            },
            cols: {
                min: 3,
                max: 9
            },
            offset: {
                min: 80,
                max: 200
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