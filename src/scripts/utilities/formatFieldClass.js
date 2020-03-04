function formatFieldClass(className, disabled, error, type) {
  return [
    'form__field',
    `form__field--${ type }`,
    disabled ? 'form__field--disabled': '',
    error ? 'form__field--error' : '',
    className
  ].join(' ');
}

export default formatFieldClass;
