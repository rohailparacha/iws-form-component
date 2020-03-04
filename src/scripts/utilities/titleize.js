import capitalize from './capitalize.js';

function titleize(text) {
  return capitalize(text.replace(/[\W\_]/g, ' '));
}

export default titleize;
