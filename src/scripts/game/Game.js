import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Scene } from "../system/Scene";

export class Game extends Scene{
    constructor() {
        super()
        this.container = new PIXI.Container();
        this.createBackground();
    }

    createBackground() {
        this.bg = App.sprite("bg");
        
        // Create a sprite with the background image
        this.backgroundSprite = this.bg;
        
        this.backgroundSprite.width = App.config.board.width //window.innerWidth
        this.backgroundSprite.height = App.config.board.height//window.innerHeight

        this.container.addChild(this.backgroundSprite);
    }
}