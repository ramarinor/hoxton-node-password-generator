import {
  lowerCaseLetters,
  upperCaseLetters,
  specialChars,
  numbers
} from "./character-sets.js";

// password configuration
const mustHaveUpperCaseLetters = true;
const mustHaveLowerCaseLetters = true;
const mustHaveNumbers = true;
const mustHaveSpecialCharacters = true;
const passwordLength = 20;

// get all characters that are allowed according to our setup
function getAllowedCharacters() {
  const allowedCharacters = [];

  if (mustHaveLowerCaseLetters) allowedCharacters.push(...lowerCaseLetters);
  if (mustHaveUpperCaseLetters) allowedCharacters.push(...upperCaseLetters);
  if (mustHaveSpecialCharacters) allowedCharacters.push(...specialChars);
  if (mustHaveNumbers) allowedCharacters.push(...numbers);

  return allowedCharacters;
}

// given an array, return a random item from it
function getRandomItemFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}

// make sure at least one of the required characters is present, to pass a potential validator
function getMandatoryCharacters() {
  const result = [];

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
function getRandomCharacters(numberOfCharacters) {
  const randomCharacters = [];
  const allowedCharacters = getAllowedCharacters();

  for (let i = 1; i <= numberOfCharacters; i++) {
    const randomChar = getRandomItemFromArray(allowedCharacters);
    randomCharacters.push(randomChar);
  }
  return randomCharacters;
}

// randomize the order of items in the array
function shuffleArray(array) {
  return array.sort(() => 0.5 - Math.random());
}

// generate the final result
function generatePassword() {
  const requiredCharacters = getMandatoryCharacters();
  const remainingCharacters = getRandomCharacters(
    passwordLength - requiredCharacters.length
  );

  const generatedCharacters = [...requiredCharacters, ...remainingCharacters];
  const shuffledChars = shuffleArray(generatedCharacters);

  const password = shuffledChars.join("");
  if (!password.length) {
    console.log("Please set at least one condition to generate password");
  } else {
    console.log("Here's your password:  ", password);
  }
}

// init, essentially.
export default generatePassword
