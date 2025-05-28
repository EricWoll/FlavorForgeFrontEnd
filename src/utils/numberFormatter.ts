export default function formatNumber(num: number): string {
    if (num === 0) return '0';

    const absNum = Math.abs(num);

    const suffixes = [
        { value: 1e18, symbol: 'E' }, // Exa
        { value: 1e15, symbol: 'P' }, // Peta
        { value: 1e12, symbol: 'T' }, // Tera
        { value: 1e9, symbol: 'B' }, // Billion
        { value: 1e6, symbol: 'M' }, // Million
        { value: 1e3, symbol: 'K' }, // Thousand
    ];

    for (const { value, symbol } of suffixes) {
        if (absNum >= value) {
            const formatted = (num / value).toFixed(1).replace(/\.0$/, ''); // Remove trailing .0
            return `${formatted}${symbol}`;
        }
    }

    // If number is less than 1000, just return the number as string
    return num.toString();
}
