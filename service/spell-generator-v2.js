const foods = ["bananen", "appels", "peren", "sinaasappels", "taarten", "aardbeien", "kersen", "koekjes", "broodjes"];
const adjectives = ["groene", "gele", "rode", "blauwe", "paarse", "oranje", "roze", "gouden", "grijze", "lange", "dunne", "dikke", "grote", "sterke", "slimme", "grappige", "leuke"];
const nature = ["koeien", "katten", "honden", "kippen", "vissen", "bomen", "schoenen", "sokken", "flessen", "vorken", "lepels", "bloemen", "planten", "oren", "neuzen", "vliegen", "spinnen", "muggen",
    "mieren", "vlinders", "geiten", "bokken", "schapen", "paarden"];
const amount = ["twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen", "tien", "elf", "twaalf"];
const verbs = ["eten", "kopen", "pakken", "lenen", "knijpen", "koken"];

function generateSecretSpell() {
    let food = foods[Math.floor(Math.random() * foods.length)];
    let adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    let natureWord = nature[Math.floor(Math.random() * nature.length)];
    let number = amount[Math.floor(Math.random() * amount.length)];
    let verb = verbs[Math.floor(Math.random() * verbs.length)];

    return `${number} ${adjective} ${natureWord} die ${food} ${verb}`;
}

// console.log(generateSecretSpell());

const cartesian =
    (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

let spells = (cartesian(adjectives, nature, ["die"], foods, verbs));
let newSpells = [];
spells.forEach(spell => {
    newSpells.push(spell.join(" "));
});

const fs = require('fs');
const jsonContent = JSON.stringify(newSpells);

fs.writeFile("./spellsv2.json", jsonContent, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
