
import {Assets} from "pixi.js"
import {sound} from '@pixi/sound'
export class Loader {
    constructor(config) {
        this.config = config;
        this.sprites = config.loader
        this.sounds = config.soundLoader
        this.resources = {};
    }

    async preload() {
        try {
                await Promise.all(
                    this.sprites.map(async (imageModule) => {
                    let imagePath = imageModule.default;
                    const texture = await Assets.load(imagePath);
                    const indexOfSlash = imagePath.lastIndexOf('/')
                    imagePath = imagePath.substr(indexOfSlash + 1)
                    const indexOfDot = imagePath.lastIndexOf('.')
                    imagePath = imagePath.substr(0, indexOfDot)
                    this.resources[imagePath] = texture; // Store loaded textures
                })
              );

              await Promise.all(
                this.sounds.map(async (soundModule) => {
                    let soundPath = soundModule.default;
                    const indexOfSlash = soundPath.lastIndexOf('/')
                    let soundName = soundPath.substr(indexOfSlash + 1)
                    const indexOfDot = soundName.lastIndexOf('.')
                    soundName = soundName.substr(0, indexOfDot)
                    sound.add(soundName, soundModule.default)
            })
          );
        } catch (error) {
            console.error("Error loading assets:", error);
        }
    }
}