import * as PIXI from "pixi.js";
import { App } from '../system/App';
import * as Matter from 'matter-js'
import {sound} from '@pixi/sound'

export class Hero {
    constructor() {
        this.createSprite();
        this.createBody()
        App.app.ticker.add(this.update.bind(this))
        this.dy = App.config.hero.jumpSpeed
        this.maxJumps = App.config.hero.maxJumps
        this.jumpIndex = 0
        this.score = 0
    }

    createSprite() {
            this.sprite = new PIXI.AnimatedSprite([
                App.res("walk1"),
                App.res("walk2")
            ]);
    
            this.sprite.x = App.config.hero.position.x;
            this.sprite.y = App.config.hero.position.y;
            this.sprite.loop = true;
            this.sprite.animationSpeed = 0.1;
            this.sprite.play();
    }
    
    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2, this.sprite.width, this.sprite.height, {friction: 0})
        Matter.World.add(App.physics.world, this.body)
        this.body.gameHero = this
    }

    update() {
        if (this.sprite) {
            this.sprite.x = this.body.position.x - this.sprite.width / 2
            this.sprite.y = this.body.position.y - this.sprite.height / 2
        }     
        if (this.sprite && (this.sprite.position.y - App.config.board.height > 0.1)) {
            this.sprite.emit("die");
        }   
    }

    startJump() {
        if (this.jumpIndex < this.maxJumps) {
            if (this.platform && this.sprite) {
                if (this.platform.gamePlatform.container.y >= this.sprite.y)     {
                    this.jumpIndex++
                    Matter.Body.setVelocity(this.body, {x: 0, y: -this.dy})
                    sound.play('jump')
                }
            }
        }
    }

    landOnPlatform(platform) {
        this.platform = platform
        this.jumpIndex = 0
    }

    collectDiamond(diamond) {
        if (this.sprite) {
            Matter.World.remove(App.physics.world, diamond.body)
            diamond.sprite.destroy()
            diamond.sprite = null
            this.score += App.config.diamonds.score
            this.sprite.emit("score")
            sound.play('collect')
        }
    }

    destroy() {
        App.app.ticker.remove(this.update, this)
        Matter.World.remove(App.physics.world, this.body)
        this.sprite.destroy()
        this.sprite = null
    }
}