import { vaingloryHeroes, laners, supports, junglers } from "./data";
import { getRandomInt } from "./random";

export class HeroCollection extends Set {
    initRandom(numOfHeros: number, bannedHeroes: Set<string> = new Set()) {
        // Generating random comp for 3v3
        if (numOfHeros === 3) {
            let laner = HeroCollection.randomHero(laners);
            while (laner in bannedHeroes) {
                laner = HeroCollection.randomHero(laners);
            }
            this.add(laner);

            let jungler = HeroCollection.randomHero(junglers);
            while (jungler in bannedHeroes || jungler in this) {
                jungler = HeroCollection.randomHero(junglers);
            }
            this.add(jungler);

            let support = HeroCollection.randomHero(supports);
            while (support in bannedHeroes || support in this) {
                support = HeroCollection.randomHero(supports);
            }
            this.add(support);

            return;
        }

        // Old logic, keeping it here for now
        while (this.size < numOfHeros) {
            this.add(HeroCollection.randomHero(vaingloryHeroes));
        }
    }

    toString() {
        var out = "";
        this.forEach((s) => {
            out = out + s + "\n";
        });

        return out;
    }

    static randomHero(heroList: string[]) {
        return heroList[getRandomInt(heroList.length)];
    }
}
