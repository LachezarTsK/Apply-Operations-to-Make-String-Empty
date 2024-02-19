
/**
 * @param {string} input
 * @return {string}
 */
var lastNonEmptyString = function (input) {
    this.ALPHABET_SIZE = 26;
    this.ASCII_SMALL_CASE_A = 97;

    const characterData = createArrayCharacterData(input);

    characterData.sort((x, y) => (y.frequency === x.frequency)
                                 ? (x.lastIndexOfOccurrence - y.lastIndexOfOccurrence)
                                 : (y.frequency - x.frequency));

    const maxFrequency = Math.max(...characterData.map(x => x.frequency));

    return extractLastNonEmptyString(characterData, maxFrequency);
};

class CharacterData {

    letter = '\u0000';
    frequency = 0;
    lastIndexOfOccurrence = 0;
}

/**
 * @param {CharacterData[]} characterData
 * @param {number} maxFrequency
 * @return {string}
 */
function extractLastNonEmptyString(characterData, maxFrequency) {
    const lastNonEmptyString = new Array();
    let index = 0;

    while (index < this.ALPHABET_SIZE && characterData[index].frequency === maxFrequency) {
        lastNonEmptyString.push(characterData[index].letter);
        ++index;
    }

    return lastNonEmptyString.join('');
}

/**
 * @param {string} input
 * @return {CharacterData[]}
 */
function createArrayCharacterData(input) {
    const characterData = new Array(this.ALPHABET_SIZE);
    for (let i = 0; i < this.ALPHABET_SIZE; ++i) {
        characterData[i] = new CharacterData();
    }

    for (let i = 0; i < input.length; ++i) {
        let index = input.codePointAt(i) - this.ASCII_SMALL_CASE_A;

        ++characterData[index].frequency;
        characterData[index].lastIndexOfOccurrence = i;
        characterData[index].letter = input.charAt(i);
    }

    return characterData;
}
