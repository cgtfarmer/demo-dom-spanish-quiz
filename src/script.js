const NOTIFICATION_DURATION_MILLIS = 1000;

const domElements = {
  question: document.querySelector('#question'),
  answerInput: document.querySelector('#answer-input'),
  guesses: document.querySelector('#guesses'),
  correct: document.querySelector('#correct'),
  incorrect: document.querySelector('#incorrect'),
  accuracy: document.querySelector('#accuracy'),
  correctMsg: document.querySelector('#correct-msg'),
  incorrectMsg: document.querySelector('#incorrect-msg')
};

const state = {
  currentCard: undefined,
  guessCount: undefined,
  correctGuessCount: undefined,
  incorrectGuessCount: undefined,
  currentGuessAccuracy: undefined
};

const flashCards = [
  { q: 'Casa', a: 'House' },
  { q: 'Gato', a: 'Cat' },
  { q: 'Perro', a: 'Dog' },
  { q: 'Mesa', a: 'Table' },
  { q: 'Silla', a: 'Chair' },
  { q: 'Libro', a: 'Book' },
  { q: 'Ventana', a: 'Window' },
  { q: 'Puerta', a: 'Door' },
  { q: 'Sol', a: 'Sun' },
  { q: 'Luna', a: 'Moon' },
  { q: 'Coche', a: 'Car' },
  { q: 'Calle', a: 'Street' },
  { q: 'Ciudad', a: 'City' },
  { q: 'Cielo', a: 'Sky' },
  { q: 'Mar', a: 'Sea' },
  { q: 'Flor', a: 'Flower' },
  { q: 'Árbol', a: 'Tree' },
  { q: 'Mano', a: 'Hand' },
  { q: 'Persona', a: 'Person' },
  { q: 'Pan', a: 'Bread' }
];

function main() {
  reset();
}

function reset() {
  state.guessCount = 0;
  state.correctGuessCount = 0;
  state.incorrectGuessCount = 0;
  state.currentGuessAccuracy = 1;
  domElements.answerInput.value = null;

  hideNotifications();

  state.currentCard = getRandomCard();
  renderState();
}

function getRandomCard() {
  const randomIndex = getRandomInt(0, flashCards.length);
  console.log(`Random Index: ${randomIndex}`);

  return flashCards[randomIndex];
}

function renderState() {
  domElements.question.innerHTML = state.currentCard.q;
  domElements.guesses.innerHTML = state.guessCount;
  domElements.correct.innerHTML = state.correctGuessCount;
  domElements.incorrect.innerHTML = state.incorrectGuessCount;
  domElements.accuracy.innerHTML = Math.round(state.currentGuessAccuracy * 100);
}

function guess() {
  hideNotifications();

  state.guessCount += 1;

  if (!answerIsCorrect()) {
    handleIncorrectGuess()

    return;
  }

  handleCorrectGuess();
}

function handleCorrectGuess() {
  state.correctGuessCount += 1;

  domElements.answerInput.value = null;

  domElements.correctMsg.hidden = false;
  setTimeout(hideNotifications, NOTIFICATION_DURATION_MILLIS);

  state.currentGuessAccuracy = (state.correctGuessCount / state.guessCount);

  state.currentCard = getRandomCard();

  renderState();
}

function handleIncorrectGuess() {
  state.incorrectGuessCount += 1;

  domElements.answerInput.value = null;

  domElements.incorrectMsg.hidden = false;

  setTimeout(hideNotifications, NOTIFICATION_DURATION_MILLIS);

  state.currentGuessAccuracy = (state.correctGuessCount / state.guessCount);

  renderState();
}

function answerIsCorrect() {
  console.log(`question=${state.currentCard.q}, answer=${state.currentCard.a}, userInput=${domElements.answerInput.value}`);

  if (!domElements.answerInput.value) return false;

  const sanitizedInput = domElements.answerInput.value.toLowerCase();

  return (sanitizedInput == state.currentCard.a.toLowerCase());
}

function hideNotifications() {
  domElements.correctMsg.hidden = true;
  domElements.incorrectMsg.hidden = true;
}

function getRandomInt(min, max) {
  // min = inclusive, max = exclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
  // min = inclusive, max = inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
}

main();
