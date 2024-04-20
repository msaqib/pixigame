
import {Assets} from "pixi.js"
import {sound} from '@pixi/sound'
export class Loader {
    constructor(config) {
        this.config = config;
        this.sprites = config.loader
        //this.sounds = config.soundLoader
        this.resources = {};
    }

    async preload() {
        try {
                await Promise.all(
                    this.sprites.map(async (fileModule) => {
                    let filePath = fileModule.default;
                    const texture = await Assets.load(filePath);
                    const indexOfSlash = filePath.lastIndexOf('/')
                    filePath = filePath.substr(indexOfSlash + 1)
                    const indexOfDot = filePath.lastIndexOf('.')
                    const extension = filePath.substr(indexOfDot + 1)
                    const fileName = filePath.substr(0, indexOfDot)
                    if (extension.toLowerCase() === 'mp3') {
                        if (sound.exists(fileName)) {
                            sound.remove(fileName)
                        }
                        sound.add(fileName, fileModule.default)
                    }
                    else {
                        this.resources[fileName] = texture; // Store loaded textures
                    }
                })
              );
        } catch (error) {
            console.error("Error loading assets:", error);
        }
    }
}