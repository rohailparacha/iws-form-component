const Submit = ({ handleOnSubmit, posting, text }) => (
  <div className="form__submit">
    <button
      className={`form__submit-button ${ posting ? 'form__submit-button--posting' : '' }`}
      onClick={ handleOnSubmit }>
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </button>
  </div>
);

Submit.propTypes = {
  handleOnSubmit: React.PropTypes.func,
  text: React.PropTypes.string
};

export default Submit;
