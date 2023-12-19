import { vaingloryHeroes } from "./data";
import { getRandomInt } from "./random"

export class HeroCollection<String> extends Set{
    initRandom(numOfHeros: number) {
        while (this.size < numOfHeros) {
            this.add(HeroCollection.randomHero())
        }
    }
    toString() {
        var out = "";
        this.forEach((s) => {
            out = out + s + "\n"
        })

        return out
    }

    
    static randomHero() {
        return vaingloryHeroes[getRandomInt(vaingloryHeroes.length)];
    }
}