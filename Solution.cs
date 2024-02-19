
using System;
using System.Linq;

public class Solution
{
    private static readonly int ALPHABET_SIZE = 26;

    private sealed class CharacterData
    {
        public char letter;
        public int frequency;
        public int lastIndexOfOccurrence;

    }
    public string LastNonEmptyString(string input)
    {
        CharacterData[] characterData = CreateArrayCharacterData(input);

        Array.Sort(characterData,
                         (x, y) => (y.frequency == x.frequency)
                                 ? (x.lastIndexOfOccurrence - y.lastIndexOfOccurrence)
                                 : (y.frequency - x.frequency));

        int maxFrequency = characterData.Max(x => x.frequency);

        return ExtractLastNonEmptyString(characterData, maxFrequency);
    }

    private String ExtractLastNonEmptyString(CharacterData[] characterData, int maxFrequency)
    {
        StringBuilder lastNonEmptyString = new StringBuilder();
        int index = 0;

        while (index < ALPHABET_SIZE && characterData[index].frequency == maxFrequency)
        {
            lastNonEmptyString.Append(characterData[index].letter);
            ++index;
        }

        return lastNonEmptyString.ToString();
    }

    private CharacterData[] CreateArrayCharacterData(String input)
    {
        CharacterData[] characterData = new CharacterData[ALPHABET_SIZE];
        for (int i = 0; i < ALPHABET_SIZE; ++i)
        {
            characterData[i] = new CharacterData();
        }

        for (int i = 0; i < input.Length; ++i)
        {
            int index = input[i] - 'a';

            ++characterData[index].frequency;
            characterData[index].lastIndexOfOccurrence = i;
            characterData[index].letter = input[i];
        }

        return characterData;
    }
}
