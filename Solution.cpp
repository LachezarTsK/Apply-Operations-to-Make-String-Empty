
#include <array>
#include <ranges>
#include <vector>
#include <string>
#include <string_view>
using namespace std;

class Solution {
    
    static const int ALPHABET_SIZE = 26;

    struct CharacterData {
        char letter{};
        int frequency{};
        size_t lastIndexOfOccurrence{};
    };

public:
    string lastNonEmptyString(const string& input) const {

        array<CharacterData, ALPHABET_SIZE> characterData = createArrayCharacterData(input);

        ranges::sort(characterData,
                       [](const auto& x, const auto& y) {
                           return (y.frequency == x.frequency)
                                ? (x.lastIndexOfOccurrence < y.lastIndexOfOccurrence)
                                : (y.frequency < x.frequency); });

        int maxFrequency = ranges::max_element(characterData,
                           [](const auto& x, const auto& y) {
                               return x.frequency < y.frequency; })->frequency;

        return extractLastNonEmptyString(characterData, maxFrequency);
    }

private:
    string extractLastNonEmptyString(array<CharacterData, ALPHABET_SIZE> characterData, int maxFrequency) const {
        string lastNonEmptyString;
        size_t index = 0;

        while (index < ALPHABET_SIZE && characterData[index].frequency == maxFrequency) {
            lastNonEmptyString.push_back(characterData[index].letter);
            ++index;
        }

        return lastNonEmptyString;
    }

    array<CharacterData, ALPHABET_SIZE> createArrayCharacterData(string_view input) const {
        array<CharacterData, ALPHABET_SIZE> characterData{};

        for (size_t i = 0; i < input.length(); ++i) {
            size_t index = input[i] - 'a';

            ++characterData[index].frequency;
            characterData[index].lastIndexOfOccurrence = i;
            characterData[index].letter = input[i];
        }

        return characterData;
    }
};
