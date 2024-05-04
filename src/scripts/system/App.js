import * as PIXI from "pixi.js";
import { Loader } from "./Loader"
import { ScenesManager } from "./ScenesManager";
import * as Matter from 'matter-js';

class Application {
    run(config) {
        this.config = config;
        this.app = new PIXI.Application();
        this.config.stage = this.app.stage;
        this.app.init({ width: this.config.board.width, height: this.config.board.height }).then(()=> {
            document.body.appendChild(this.app.canvas);
            this.loader = new Loader(this.config);
            this.soundLoader = new Loader(this.config)
            this.loader.preload().then(() => this.start());
            this.createPhysics()
        }) 
    }
    start() {
        this.scenes = new ScenesManager();
        this.app.stage.addChild(this.scenes.container)
        this.scenes.start("startScene");
    }
    res(key) {
        return this.loader.resources[key];
    }

    sprite(key) {
        return new PIXI.Sprite(this.res(key));
    }

    createPhysics() {
        this.physics = Matter.Engine.create()
        const runner = Matter.Runner.create()
        Matter.Runner.run(runner, this.physics)
    }
}

export const App = new Application();