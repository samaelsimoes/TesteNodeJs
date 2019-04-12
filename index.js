const fs = require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let rawdata = fs.readFileSync('animals.json');

let animals = JSON.parse(rawdata);  

console.log("Pense em um animal:");

readline.question("O animal que voce pensou vive na agua? (y/N)", async answer => {
    let habitat;

    if (answer === "y") {
        habitat = "water";
    } else {
        habitat = "default";
    }

    await listAnimals(animals[habitat]);
});

const listAnimals = async animalsToList => {
    let found = false;

    for (let i in animalsToList) {
        let animal = animalsToList[i];

        found = await askAnimal(animal);

        if (found) {
            break;
        }
    };

    if (found) {
        console.log("Acertei!");
        process.exit();
    } else {
        readline.question("Qual animal voce pensou?", (actualAnswer) => {
            animalsToList.push({name: actualAnswer});
            fs.writeFileSync('animals.json', JSON.stringify(animals));
            process.exit();
        })
    }
};

const askAnimal = async animal => {
    return await new Promise(resolve => {
        readline.question("O animal que voce pensou e um " + animal.name + "? (y/N)", answer => {
            if (answer === "y") {
                resolve(true);
            }

            resolve(false);
        });
    });
};