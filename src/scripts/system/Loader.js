
import {Assets} from "pixi.js"
export class Loader {
    constructor(config) {
        this.config = config;
        this.sprites = config.loader
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
        } catch (error) {
            console.error("Error loading assets:", error);
        }
    }
}