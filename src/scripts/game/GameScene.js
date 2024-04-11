import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Platforms } from './Platforms';
import { Hero } from './Hero';

export class GameScene extends Scene {
    create() {
        this.createBackground();
        this.createPlatforms()
        this.createHero()
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