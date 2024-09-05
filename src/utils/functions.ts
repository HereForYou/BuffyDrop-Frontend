const slicFunc = (username: string) => {
    if (username.length < 9) return username;
    return (username.slice(0, 8) + '..');
}
const convertToShorthand = (number: number) => {
    if (number >= 1000000) {
        return Math.floor(number / 1000000) + 'M+';
    }
    else if (number >= 1000) {
        return Math.floor(number / 1000) + 'K+';
    }
    else {
        return (number.toFixed(2)).toString();
    }
}
const formatNumberWithCommas = (number: number, locale = "en-US") => {
    return new Intl.NumberFormat(locale).format(number);
}
export { slicFunc, convertToShorthand, formatNumberWithCommas };
