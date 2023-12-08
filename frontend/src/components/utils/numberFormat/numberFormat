
export function numbersFormat(num) {
    const magnitude = Math.min(parseInt((Math.abs(num).toString().length - 1) / 3), 4);
    num /= Math.pow(10, magnitude * 3);
    return num.toString().split('.')[0] + ' KMBT'[magnitude];
}