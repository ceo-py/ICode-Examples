
export function numbersFormat(num) {
    const magnitude = Math.min(parseInt((Math.abs(num).toString().length - 1) / 3), 4);
    num /= Math.pow(10, magnitude * 3);

    if (num % 1 !== 0) num = num.toFixed(1);

    return num.toString() + ' KMBT'[magnitude];
}