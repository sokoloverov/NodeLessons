//import colors from 'colors';
const colors = require('colors');

/**
 * Функция поиска простых чисел в диапазоне
 * @param {начальное число} startNum 
 * @param {конечное число} lastNum 
 * @returns массив простых чисел в заданом интервале
 */
function giveMePrimes(startNum, lastNum) {
    let sito = []; //не простые числа в сите
    let primeNumders = []; //массив простых чисел
    //способ "решето Эратосфена"
    if (startNum < 2) return 'Что-то пошло не так, зачем указывать в первом аргументе число меньше 2!?';
    for (let i = 2; i <= lastNum; i++) {
        if (!sito[i]) {
            for (let j = i * i; j <= lastNum; j += i) {
                sito[j] = true;
            }
            if (i < startNum) continue;
            primeNumders.push(i);
        }
    }
    return primeNumders;
}

const start = process.argv[2];
const end = process.argv[3];
const primeMassive = giveMePrimes(start, end);

for (let i = 0; i < primeMassive.length; i++) {
    if ((i + 1) % 3 === 0) {
        console.log(i, ' каждое третье число:', colors.green(primeMassive[i]));
        continue;
    }
    if ((i + 1) % 2 === 0) {
        console.log(i, ' каждое второе число:', colors.yellow(primeMassive[i]));
        continue;
    }
    console.log(i, ' каждое первое число:', colors.red(primeMassive[i]));
}





    //console.log(colors.grey.bgGreen(primeMassive));




