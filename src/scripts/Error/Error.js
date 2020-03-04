const Error = ({ message }) => (
  <div className="form__error-message">
    <p dangerouslySetInnerHTML={{ __html: message }} />
  </div>
);

Error.propTypes = { message: React.PropTypes.string };

export default Error;
