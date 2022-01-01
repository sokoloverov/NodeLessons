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
//проверка на вшивость введенных значений
if (start === undefined || end === undefined) {
    console.log(colors.bgYellow.black('Необходимо ввести два аргумента: начало и конец диапазона'));
} else {
    if (start < 2) {
        console.log(colors.bgYellow.black('Что-то пошло не так, зачем указывать в первом аргументе число меньше 2!?'));
    } else {
        if (end > 10000) {
            console.log(colors.bgYellow.black('Если не жако процессор, можно отдать свой компьютер дворнику-узбеку, пусть в Ведьмака играет'));
        } else {
            //проверка на вшивость закончена
            const primeMassive = giveMePrimes(start, end);

            let z3 = 0; //счетчик прохода каждого тройного цикла i
            for (let i = 0; i < primeMassive.length; i++) {
                z3 = Math.trunc(i / 3);
                if (i === 0 + 3 * z3) {
                    console.log('i=', i, ' z3=', z3, ' каждое первое число:', colors.red(primeMassive[i]));
                    continue;
                }
                if (i === 1 + 3 * z3) {
                    console.log('i=', i, ' z3=', z3, ' каждое второе число:', colors.yellow(primeMassive[i]));
                    continue;
                }
                console.log('i=', i, ' z3=', z3, ' каждое третье число:', colors.green(primeMassive[i]));
            }
        }
    }
}