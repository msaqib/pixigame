import { Scene } from '../system/Scene';
import {App} from '../system/App'
import * as PIXI from "pixi.js";
import { stats } from './Stats';

export class GameOver extends Scene {
    create() {
        this.container = new PIXI.Container();
        this.createBackground()
        this.createTitle()
        this.createButton()
    }

    createBackground() {
        const gradientFill = new PIXI.FillGradient(0, 0, App.app.renderer.width, App.app.renderer.height);
        const colorStops = [0x020024, 0x090979, 0x00d4ff];
        colorStops.forEach((number, index) =>
        {
            const ratio = index / colorStops.length;

            gradientFill.addColorStop(ratio, number);
        });
        this.background = new PIXI.Graphics().rect(0, 0, App.app.renderer.width, App.app.renderer.height).fill(gradientFill);
        this.container.addChild(this.background);
    }

    createTitle() {
        const textStyle = new PIXI.TextStyle(
            {
                fontFamily: 'Arial',
                fontSize: 48,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: '#EEEEEE',
                stroke: { color: '#4a1850', width: 5, join: 'round' },
                dropShadow: {
                    color: '#000000',
                    blur: 4,
                    angle: Math.PI / 6,
                    distance: 6,
                }})
        this.titleText = new PIXI.Text({text: 'Game over', 
            style: textStyle
        });
        this.titleText.anchor.set(0.5); // Center the text
        this.titleText.x = App.app.renderer.width / 2;
        this.titleText.y = App.app.renderer.height / 4;
        this.container.addChild(this.titleText);

        textStyle.fontSize = 30
        this.scoreText = new PIXI.Text({text: `You scored: ${stats.score}`, 
            style: textStyle
        });
        this.scoreText.anchor.set(0.5); // Center the text
        this.scoreText.x = App.app.renderer.width / 2;
        this.scoreText.y = App.app.renderer.height / 2;
        this.container.addChild(this.scoreText);
    }

    createButton() {
        this.buttonContainer = new PIXI.Container() 
        this.buttonContainer.interactive = true
        this.buttonContainer.buttonMode = true
        this.buttonContainer.on('pointerdown', this.onStartButtonClick.bind(this)); // Define the click event handler
        
        this.buttonGraphics = new PIXI.Graphics().rect(0, 0, 200, 60).fill(0xffffff);
        this.buttonContainer.addChild(this.buttonGraphics);

        const buttonStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0x0
        })
        const buttonText = new PIXI.Text({text: 'Start', style: buttonStyle});
        buttonText.anchor.set(0.5); // Center the text
        buttonText.x = this.buttonContainer.width / 2;
        buttonText.y = this.buttonContainer.height / 2;
        this.buttonContainer.addChild(buttonText);
        this.buttonContainer.pivot.set(this.buttonContainer.width / 2, this.buttonContainer.height / 2);
        this.buttonContainer.position.set(App.app.renderer.width / 2, App.app.renderer.height * 3 / 4);

        this.container.addChild(this.buttonContainer)

        this.buttonContainer.on('pointerover', () => {
            this.buttonContainer.cursor = 'pointer';
        });
    
        // Add pointerout event listener to revert cursor to auto when leaving button
        this.buttonContainer.on('pointerout', () => {
            this.buttonContainer.cursor = 'auto';
        });
    
    }

    onStartButtonClick() {
        App.scenes.start('Game')
    }

    update(dt) {
        super.update(dt)
    }

    destroy() {

    }
}