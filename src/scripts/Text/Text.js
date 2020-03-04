/******************************************************************************\
 DEPENDENCIES
\******************************************************************************/

import Error from './../Error/Error.js';
import formatFieldClass from './../utilities/formatFieldClass.js';
import Label from './../Label/Label.js';
import titleize from './../utilities/titleize.js';

/******************************************************************************\
 CONFIG: COMPONENT DECLARATION, PROPTYPES, DEFAULT PROPS, & COMPONENT STATE
\******************************************************************************/

class Text extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    errorMessage: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
    errorMessages: React.PropTypes.bool,
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
    onChange: React.PropTypes.func,
    placeholders: React.PropTypes.bool,
    type: React.PropTypes.string,
    validate: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.func
    ]),
    value: React.PropTypes.string
  };

  static defaultProps = {
    className: '',
    errorMessage: true,
    label: true,
    onChange: () => {},
    type: 'text',
    validate: false,
    value: ''
  };

  state = {
    error: false,
    placeholder: this.props.placeholders,
    value: this.props.value
  };

/******************************************************************************\
 LIFECYCLE METHODS
\******************************************************************************/

  componentWillReceiveProps({ disabled, value }) {
    (value || disabled) && this.setState({ value });
  }

/******************************************************************************\
 EVENT HANDLERS
\******************************************************************************/

  handleOnChange = (e) => {
    const { value } = e.target;
    this.setState({ value }, () => {
      this.validate(value);
      this.props.onChange({ value });
      this.togglePlaceholder({ type: 'blur' });
    });
  };

  togglePlaceholder = (e) => {
    const placeholder = !this.state.value && e.type === 'blur';
    this.setState({ placeholder });
  };

/******************************************************************************\
 COMPONENT METHODS
\******************************************************************************/

  clear() {
    const { value } = this.props;
    this.setState({ value }, () => {
      this.togglePlaceholder({ type: 'blur' });
    });
  }

  hasError() {
    const { errorMessage, errorMessages } = this.props;
    const { error } = this.state;
    return errorMessage && errorMessages && error;
  }

  hasPlaceholder() {
    const { placeholder } = this.state;
    const { placeholders } = this.props;
    return !placeholders || (placeholders && placeholder);
  }

  formatErrorMessage() {
    const { errorMessage, id } = this.props;
    if (typeof errorMessage === 'boolean') {
      return `Please provide a valid ${ titleize(id).toLowerCase() }.`;
    } else { return errorMessage; }
  }

  validate(value) {
    const { validate } = this.props;
    let error = false;
    if (validate) {
      if (typeof validate === 'boolean') {
        error = !value;
      } else { error = validate(value); }
    }
    this.setState({ error });
    return error;
  }

/******************************************************************************\
 COMPONENT VIEW
\******************************************************************************/

  render() {

    const { className, disabled, id, label, placeholders, type } = this.props;
    const { error, value } = this.state;

    return (
      <div className={ formatFieldClass(className, disabled, error, type) }>
        <div className="form__field-inner">
          { this.hasPlaceholder() && (
            <Label
              id={ id }
              label={ label }
              placeholder={ placeholders }
              value={ value } />
          ) }
          <div className="form__field__input-container">
            <input
              disabled={ disabled }
              id={ id }
              onBlur={ this.togglePlaceholder }
              onChange={ this.handleOnChange }
              onFocus={ this.togglePlaceholder }
              type="text"
              value={ value } />
            { this.hasError() && (
              <Error message={ this.formatErrorMessage() } />
            ) }
          </div>
        </div>
      </div>
    );
  }
}

/******************************************************************************\
 EXPORT
\******************************************************************************/

export default Text;
