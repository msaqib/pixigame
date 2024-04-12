import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Platforms } from './Platforms';
import { Hero } from './Hero';
import * as Matter from 'matter-js'
import {App} from '../system/App'
import { LabelScore } from "./LabelScore";

export class GameScene extends Scene {
    create() {
        this.createBackground();
        this.createPlatforms()
        this.createHero()
        this.registerEvents()
        this.createUI()
    }

    registerEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this))
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB]
        const hero = colliders.find((body) => body.gameHero)
        const platform = colliders.find((body) => body.gamePlatform)
        const diamond = colliders.find( (body) => body.gameDiamond)
        if (hero && platform) {
            this.hero.landOnPlatform(platform)
        }
        else if (hero && diamond) {
            this.hero.collectDiamond(diamond.gameDiamond)
        }
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    update(dt) {
        super.update(dt)
        this.bg.update(dt.deltaTime);
        this.platforms.update(dt)
    }

    createPlatforms(data) {
        this.platforms = new Platforms();
        this.container.addChild(this.platforms.container);
    }

    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);
        this.container.interactive = true
        this.container.on('pointerdown', () => {
            this.hero.startJump()
        })
        this.hero.sprite.once('die', ()=> {
            App.scenes.start('Game')
        })
    }

    createUI() {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        this.hero.sprite.on("score", () => {
            this.labelScore.renderScore(this.hero.score);
        });
    }

    destroy() {
        Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
        App.app.ticker.remove(this.update, this);
        this.hero.destroy()
        this.bg.destroy();
        this.platforms.destroy()
        this.labelScore.destroy()
    }
}