
const vaingloryHeroes = ['Amael', 'Adagio', 'Alpha', 'Anka', 'Ardan', 'Baptiste',
    'Baron', 'Blackfeather', 'Caine', 'Catherine', 'Celeste', 'Churnwalker',
    'Flicker', 'Fortress', 'Glaive', 'Grace', 'Grumpjaw', 'Gwen', 'Idris',
    'Inara', 'Ishtar', 'Joule', 'Karas', 'Kensei', 'Kestrel', 'Kinetic', 'Koshka', 'Krul',
    'Lance', 'Leo', 'Lorelai', 'Lyra', 'Magnus', 'Malene', 'Miho', 'Ozo', 'Petal',
    'Phinn', 'Reim', 'Reza', 'Ringo', 'Rona', 'Samuel', 'San Feng', 'SAW', 'Shin', 'Silvernail',
    'Skaarf', 'Skye', 'Taka', 'Tony', 'Varya', 'Viola', 'Vox', 'Warhawk', 'Yates', 'Ylva']

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
}

function random() {
    return Math.random();
}

export function randomHero() {
    return vaingloryHeroes[getRandomInt(vaingloryHeroes.length)];
}
