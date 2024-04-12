import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Platforms } from './Platforms';
import { Hero } from './Hero';
import * as Matter from 'matter-js'
import {App} from '../system/App'

export class GameScene extends Scene {
    create() {
        this.createBackground();
        this.createPlatforms()
        this.createHero()
        this.registerEvents()
    }

    registerEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this))
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB]
        const hero = colliders.find((body) => body.gameHero)
        const platform = colliders.find((body) => body.gamePlatform)
        const diamond = colliders.find( (body) => body.gameDiamond)
        console.log(hero, platform, diamond)
        if (hero && diamond) {
            console.log(hero.position.x, hero.position.y)
            console.log(hero.position.x, hero.position.y)
            this.hero.collectDiamond(diamond.gameDiamond)
        }
        else if (hero && platform) {
            this.hero.landOnPlatform(platform)
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
    }
}