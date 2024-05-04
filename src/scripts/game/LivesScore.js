import * as PIXI from "pixi.js";
import { App } from "../system/App";
import {stats} from './Stats'

export class LivesScore extends PIXI.Text {
    constructor() {
        super();
        this.x = App.config.lives.x;
        this.y = App.config.lives.y;
        this.anchor.set(App.config.lives.anchor);
        this.style = App.config.lives.style;
        this.renderLives();
    }

    renderLives(lives = 0) {
        let heartString = '';
        for (let i = 1; i < stats.livesRemaining; i++) {
            heartString += '♥ ';
        }
        this.text = `${heartString}`;
    }
}