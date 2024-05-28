import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Platforms } from './Platforms';
import { Hero } from './Hero';
import * as Matter from 'matter-js'
import {App} from '../system/App'
import { LabelScore } from "./LabelScore";
import * as Tools from '../system/Tools'
import {stats} from './Stats'
import { GameOver } from "./GameOver";
import { LivesScore } from "./LivesScore";

export class GameScene extends Scene {
    create() {
        stats.init()
        this.createBackground();
        this.createPlatforms()
        this.createHero()
        this.registerEvents()
        this.createUI()
        this.heroX = App.config.hero.position.x
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
        this.platforms.update()
        const scorePosition = this.container.toGlobal(this.labelScore.position)
        const livesPosition = this.container.toGlobal(this.livesScore.position)
        this.container.pivot.x = this.hero.sprite.x - App.config.hero.position.x
        const newPosition = this.container.toLocal(scorePosition)
        this.labelScore.x = this.container.toLocal(scorePosition).x
        this.livesScore.x = this.container.toLocal(livesPosition).x
    }

    createPlatforms(data) {
        this.platforms = new Platforms();
        this.container.addChild(this.platforms.container);
    }

    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);
        this.container.interactive = true
        const up = Tools.Tools.keyboard('ArrowUp')
        up.press = this.hero.startJump.bind(this.hero)
        App.app.stage.eventMode = 'static';
        App.app.stage.addEventListener('pointerdown', this.hero.startJump.bind(this.hero));
        this.hero.sprite.once('die', ()=> {
            stats.livesRemaining--
            if(stats.livesRemaining > 0) {
                App.scenes.start('Game')
            }
            else {
                App.scenes.start('gameOver')
                stats.reset()
            }
        })
    }

    createUI() {
        this.labelScore = new LabelScore(this.hero.score);
        this.container.addChild(this.labelScore);
        this.hero.sprite.on("score", () => {
            stats.score += App.config.diamonds.score
            this.labelScore.renderScore(stats.score);
        });
        this.livesScore = new LivesScore(stats.livesRemaining)
        this.container.addChild(this.livesScore)
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