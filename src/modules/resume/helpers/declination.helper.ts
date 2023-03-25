export const declination = (number: number, words: string[]): string => {
    const CASES = [2, 0, 1, 1, 1, 2] as const

    if (number % 1 !== 0) return words[1]
    if (number % 100 > 4 && number % 100 < 20) return words[2]

    return words[CASES[number % 10 < 5 ? number % 10 : 5]]

}