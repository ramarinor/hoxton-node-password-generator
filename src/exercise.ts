import {
  lowerCaseLetters,
  upperCaseLetters,
  specialChars,
  numbers
} from "./character-sets.js";

type stringOrNumber = string | number;

// password configuration
const mustHaveUpperCaseLetters: boolean = true;
const mustHaveLowerCaseLetters: boolean = true;
const mustHaveNumbers: boolean = true;
const mustHaveSpecialCharacters: boolean = true;
const passwordLength: number = 20;

// get all characters that are allowed according to our setup
function getAllowedCharacters(): stringOrNumber[] {
  const allowedCharacters = [];

  if (mustHaveLowerCaseLetters) allowedCharacters.push(...lowerCaseLetters);
  if (mustHaveUpperCaseLetters) allowedCharacters.push(...upperCaseLetters);
  if (mustHaveSpecialCharacters) allowedCharacters.push(...specialChars);
  if (mustHaveNumbers) allowedCharacters.push(...numbers);

  return allowedCharacters;
}

// given an array, return a random item from it
function getRandomItemFromArray(array: stringOrNumber[]): stringOrNumber {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}

// make sure at least one of the required characters is present, to pass a potential validator
function getMandatoryCharacters(): stringOrNumber[] {
  const result: stringOrNumber[] = [];

  if (mustHaveLowerCaseLetters) {
    const character = getRandomItemFromArray(lowerCaseLetters);
    result.push(character);
  }
  if (mustHaveUpperCaseLetters) {
    const character = getRandomItemFromArray(upperCaseLetters);
    result.push(character);
  }
  if (mustHaveSpecialCharacters) {
    const character = getRandomItemFromArray(specialChars);
    result.push(character);
  }
  if (mustHaveNumbers) {
    const number = getRandomItemFromArray(numbers);
    result.push(number);
  }

  return result;
}

// fill the rest of the password with whatever is allowed
function getRandomCharacters(numberOfCharacters: number): stringOrNumber[] {
  const randomCharacters: stringOrNumber[] = [];
  const allowedCharacters: stringOrNumber[] = getAllowedCharacters();

  for (let i: number = 1; i <= numberOfCharacters; i++) {
    const randomChar = getRandomItemFromArray(allowedCharacters);
    randomCharacters.push(randomChar);
  }
  return randomCharacters;
}

// randomize the order of items in the array
function shuffleArray(array: stringOrNumber[]): stringOrNumber[] {
  return array.sort(() => 0.5 - Math.random());
}

// generate the final result
function generatePassword() {
  const requiredCharacters: stringOrNumber[] = getMandatoryCharacters();
  const remainingCharacters: stringOrNumber[] = getRandomCharacters(
    passwordLength - requiredCharacters.length
  );

  const generatedCharacters: stringOrNumber[] = [
    ...requiredCharacters,
    ...remainingCharacters
  ];
  const shuffledChars: stringOrNumber[] = shuffleArray(generatedCharacters);

  const password: string = shuffledChars.join("");
  if (!password.length) {
    console.log("Please set at least one condition to generate password");
  } else {
    console.log("Here's your password:  ", password);
  }
}

// init, essentially.
export default generatePassword;
