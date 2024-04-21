import { App } from '../system/App'
class Stats {
    init() {
        if(!this.score) {
            this.reset()
        }
    }

    reset() {
        this.score = 0
        this.livesRemaining = App.config.hero.livesRemaining
    }
}

export const stats = new Stats()