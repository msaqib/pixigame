import * as PIXI from "pixi.js";
import { App } from "./App";
import * as Matter from 'matter-js'

export class Scene {
    constructor() {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.create();
        App.app.ticker.add(this.update, this);
    }

    create() {}
    update(dt) {
    }
    destroy() {
        
    }

    remove() {
        App.app.ticker.remove(this.update, this);
        this.destroy();
        this.container.destroy();
    }
}