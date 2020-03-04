import Error from './../Error/Error.js';
import formatFieldClass from './../utilities/formatFieldClass.js';
import Label from './../Label/Label.js';
import titleize from './../utilities/titleize.js';

/******************************************************************************\
 CONFIG: COMPONENT DECLARATION, PROPTYPES, DEFAULT PROPS, & COMPONENT STATE
\******************************************************************************/

class File extends React.Component {

  static propTypes = {
    accepts: React.PropTypes.arrayOf(React.PropTypes.string),
    className: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
    maxSize: React.PropTypes.number,
    onChange: React.PropTypes.func,
    placeholders: React.PropTypes.bool,
    type: React.PropTypes.string,
    validate: React.PropTypes.bool,
    value: React.PropTypes.object
  };

  static defaultProps = {
    accepts: ['doc', 'docx', 'gif', 'jpg', 'jpeg', 'pdf', 'png'],
    className: '',
    label: true,
    maxSize: 2,
    onChange: () => {},
    type: 'file',
    validate: false,
    value: {}
  }

  state = {
    error: false,
    errorMessages: [],
    value: this.props.value
  };

/******************************************************************************\
 EVENT HANDLERS
\******************************************************************************/

  handleOnChange = (e) => {
    const value = e.target.files[0];
    this.setState({ value }, () => {
      this.validate(value);
      this.props.onChange({ value });
    });
  };

/******************************************************************************\
 COMPONENT METHODS
\******************************************************************************/

  clear() {
    const { value } = this.props;
    this.setState({ value });
  }

  checkFileExistence(file) {
    const { validate } = this.props;
    const value = validate && !file;
    const errorMessage = value && this.formatErrorMessage('existence');
    return { value, errorMessage };
  }

  checkFileSize(size) {
    const { maxSize } = this.props;
    const value =  size && maxSize < ((size / 1000) / 1000);
    const errorMessage = value && this.formatErrorMessage('size');
    return { value, errorMessage };
  }

  checkFileType(file) {
    const { accepts } = this.props;
    const test = accepts.length ? `(${ accepts.join('|') })` : '*';
    const regEx = new RegExp(`\.${ test }`);
    const value = file && !regEx.test(file);
    const errorMessage = value && this.formatErrorMessage('type');
    return { value, errorMessage };
  }

  formatErrorMessage(error) {
    const { accepts, maxSize } = this.props;
    switch(error) {
      case 'size': return `File size can be no larger than ${ maxSize }mb.`;
      case 'type': return `Accepted file types: ${ accepts.join(', ') }.`;
      case 'existence': return 'Please upload a valid file.';
      default: return '';
    }
  }

  validate(value) {
    const { validate } = this.props;
    const errors = [];
    const errorMessages = [];
    errors.push(this.checkFileSize(value.size));
    errors.push(this.checkFileType(value.name));
    errors.push(this.checkFileExistence(value.name));
    const error = errors.map((error, i) => {
      const { errorMessage, value } = error;
      value && errorMessages.push(errorMessage);
      return value;
    }).indexOf(true) !== -1;
    this.setState({ error, errorMessages });
    return error;
  }

/******************************************************************************\
 COMPONENT VIEW
\******************************************************************************/

  render() {

    const { className, disabled, id, label, placeholders } = this.props;
    const { error, errorMessages, value } = this.state;

    return (
      <div className={ formatFieldClass(className, disabled, error, 'file') }>
        <div className="form__field-inner">
          { !placeholders && (
            <Label
              id={ id }
              label={ label }
              placeholder={ false }
              value={ value } />
          ) }
          <div className="form__field__input-container">
            <Label
              id={ id }
              label={ value.name || (placeholders ? label : '') }
              placeholder={ true }
              value={ value } />
            <input
              disabled={ disabled }
              id={ id }
              onChange={ this.handleOnChange }
              type="file" />
            { error && errorMessages.length &&  (
              <Error message={ this.state.errorMessages.join('<br>') } />
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

export default File;
