
import java.util.Arrays;

public class Solution {

    private static final int ALPHABET_SIZE = 26;

    private class CharacterData {

        char letter;
        int frequency;
        int lastIndexOfOccurrence;

    }

    public String lastNonEmptyString(String input) {

        CharacterData[] characterData = createArrayCharacterData(input);

        Arrays.sort(characterData,
                        (x, y) -> (y.frequency == x.frequency)
                        ? (x.lastIndexOfOccurrence - y.lastIndexOfOccurrence)
                        : (y.frequency - x.frequency));

        int maxFrequency = Arrays.stream(characterData).max(
                          (x, y) -> x.frequency - y.frequency).get().frequency;

        return extractLastNonEmptyString(characterData, maxFrequency);
    }

    private String extractLastNonEmptyString(CharacterData[] characterData, int maxFrequency) {
        StringBuilder lastNonEmptyString = new StringBuilder();
        int index = 0;

        while (index < ALPHABET_SIZE && characterData[index].frequency == maxFrequency) {
            lastNonEmptyString.append(characterData[index].letter);
            ++index;
        }

        return lastNonEmptyString.toString();
    }

    private CharacterData[] createArrayCharacterData(String input) {
        CharacterData[] characterData = new CharacterData[ALPHABET_SIZE];
        for (int i = 0; i < ALPHABET_SIZE; ++i) {
            characterData[i] = new CharacterData();
        }

        for (int i = 0; i < input.length(); ++i) {
            int index = input.charAt(i) - 'a';

            ++characterData[index].frequency;
            characterData[index].lastIndexOfOccurrence = i;
            characterData[index].letter = input.charAt(i);
        }

        return characterData;
    }
}
