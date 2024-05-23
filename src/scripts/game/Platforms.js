import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Platform } from "./Platform";

export class Platforms {
    constructor() {
        this.platforms = [];
        this.container = new PIXI.Container();
        this.createPlatform({
            rows: 4,
            cols: 10,
            x: 200
        })
        this.ranges = App.config.platforms.ranges;
    }

    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.current = platform
        this.container.addChild(platform.container);
        this.platforms.push(platform)
    }

    getRandomData() {
        let data = {};

        const offset = this.ranges.offset.min + Math.round(Math.random() * (this.ranges.offset.max - this.ranges.offset.min));

        data.x = this.current.container.x + this.current.container.width + offset;
        data.cols = this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));
        data.rows = this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));
        return data;
    }

    update() {
        if (this.current.container.x + this.current.container.width < App.config.board.width) {
            this.createPlatform(this.getRandomData());
        }
        this.platforms.forEach(platform => platform.move());
    }

    destroy() {
        this.platforms.forEach( (platform) => platform.destroy())
        this.container.destroy()
    }
}