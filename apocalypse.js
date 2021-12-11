//ИГРА НА ВЫЖИВАНИЕ РОССИЯН
/*вирус против граждан
/**********КОМАНДНАЯ СТРОКА node apocalypse.js "начальная сила вируса (любое чисо)" "вероятность новых мутаций (от 0 до 1)"
/*СИЛА мутаций вируса: от 1 до 10
/*с каждой новой мутацией сила растет
/*ВЕРОЯТНОСТЬ мутаций: вероятность новых от 0/мес до 5/мес
*/

//Проверок на вшивость ввода данных НЕТ! Вводим параметры в командной строке корректно.

import colors from 'colors';
import EventEmitter from 'events';
import ru from 'date-fns/locale/ru/index.js';
import { getTime, addMonths, format } from 'date-fns'

class MyEmitter extends EventEmitter { };
const emitterObject = new MyEmitter();

console.log(colors.bgWhite.red('COVID vs RUSSIAN HUMAN'));
//начальная сила вируса, любое пложительное число
const virusStrainForce = Number(process.argv[2]);
//вероятность мутаций
const frequencyMutations = Number(process.argv[3]);
console.log(colors.bgWhite.red(`Задана сила вируса ${virusStrainForce} и вероятность ежемесячных мутаций ${frequencyMutations}`));
//население страны
let population = 1000;
let now = getTime(new Date());

//штамм вируса, payload - коэффициент силы
const virusStrain = [
    {
        type: 'wuhan',
        payload: 1
    },
    {
        type: 'gamma',
        payload: 2
    },
    {
        type: 'delta',
        payload: 4
    },
    {
        type: 'omicron',
        payload: 8
    },
    {
        type: 'sigma',
        payload: 16
    },
    {
        type: 'tau',
        payload: 32
    },
    {
        type: 'psi',
        payload: 64
    },
    {
        type: 'omega',
        payload: 128
    }
];

//текущий штам
class Covid {
    constructor(params) {
        this.type = params.type;
        this.payload = params.payload;
    }
};
//заболеваемость
class Morbidity {
    static wuhan(payload) {
        victumCovid(payload);
        console.log(colors.bgYellow.black(`${format(next, 'yyyy MMMM', { locale: ru })} штам wuhan выживших россиян: ${population}`));
    }
    static gamma(payload) {
        victumCovid(payload);
        console.log(colors.bgYellow.black(`${format(next, 'yyyy MMMM', { locale: ru })} штам gamma выживших россиян: ${population}`));
    }
    static delta(payload) {
        victumCovid(payload);
        console.log(colors.bgYellow.black(`${format(next, 'yyyy MMMM', { locale: ru })} штам delta выживших россиян: ${population}`));
    }
    static omicron(payload) {
        victumCovid(payload);
        console.log(colors.bgYellow.black(`${format(next, 'yyyy MMMM', { locale: ru })} штам omicron выживших россиян: ${population}`));
    }
    static sigma(payload) {
        victumCovid(payload);
        console.log(colors.bgYellow.black(`${format(next, 'yyyy MMMM', { locale: ru })} штам sigma выживших россиян: ${population}`));
    }
    static tau(payload) {
        victumCovid(payload);
        console.log(colors.bgYellow.black(`${format(next, 'yyyy MMMM', { locale: ru })} штам tau выживших россиян: ${population}`));
    }
    static psi(payload) {
        victumCovid(payload);
        console.log(colors.bgYellow.black(`${format(next, 'yyyy MMMM', { locale: ru })} штам psi выживших россиян: ${population}`));
    }
    static omega(payload) {
        victumCovid(payload);
        console.log(colors.bgYellow.black(`${format(next, 'yyyy MMMM', { locale: ru })} штам omega выживших россиян: ${population}`));
    }
}
//расчет поражения COVID
function victumCovid(payload) {
    return population = Math.round(population * (1 - payload * 0.0001));
};

//генератор случайного числа
const generateIntInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//генерация новых мутаций и их силы
function generateNewVirus() {
    //тип вируса
    const params = virusStrain[generateIntInRange(0, 7)];
    //вероятность появления нового штама ...
    const mutationEmerging = generateIntInRange(0, 100);
    //случайная сила очередной мутации
    const mutationForse = generateIntInRange(0, 9);

    if (mutationEmerging > parseInt(100 * (1 - frequencyMutations))) {
        params.payload = params.payload + virusStrainForce * mutationForse;
        console.log('mutationEmerging ', mutationEmerging, 'сравнене с ', parseInt(100 * (1 - frequencyMutations)), 'мутация случилась', 'сила штама ', params.payload);
    } else {
        params.payload = params.payload;
        console.log('mutationEmerging ', mutationEmerging, 'сравнене с ', parseInt(100 * (1 - frequencyMutations)), 'нет мутации', 'сила штама ', params.payload);
    }

    return new Covid(params);
}

//следим за событием
emitterObject.on('wuhan', Morbidity.wuhan);
emitterObject.on('gamma', Morbidity.gamma);
emitterObject.on('delta', Morbidity.delta);
emitterObject.on('omicron', Morbidity.omicron);
emitterObject.on('sigma', Morbidity.sigma);
emitterObject.on('tau', Morbidity.tau);
emitterObject.on('psi', Morbidity.psi);
emitterObject.on('omega', Morbidity.omega);

//количество месяцев с начала игры
let i = 0;
//текущий месяц
let next;

const run = () => {
    if (i > 23) {
        return console.log(colors.bgWhite.red('Конец игры. Прошло ', i, 'месяца. Благополучно выжило ', population, 'из каждой тысячи граждан...'));
    }
    if (population <= 100) {
        return console.log(colors.bgWhite.red('Конец игры. Прошло ', i, 'месяца. Дальше лучше не играть...'));
    }
    const virus = generateNewVirus();
    next = addMonths(now, i);
    emitterObject.emit(virus.type, virus.payload);
    i++;
    setTimeout(run, 1000);
};

run();