const Success = ({ className, handleCloseModal, message, modal }) => (
  <div className={`form__success ${ className }`}>
    <div className="form__success-message">
      { modal && (
        <button
          className="form__success--modal__close"
          onClick={ handleCloseModal }>
          <span />
        </button>
      ) }
      <p dangerouslySetInnerHTML={{ __html: message}} />
    </div>
  </div>
);

Success.propTypes = {
  className: React.PropTypes.string,
  handleCloseModal: React.PropTypes.func,
  message: React.PropTypes.string,
  modal: React.PropTypes.bool
};

export default Success;
