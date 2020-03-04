function capitalize(text) {
  return text.replace(/\b\w/g, (char) => {
    return char.toUpperCase();
  });
}

export default capitalize;
