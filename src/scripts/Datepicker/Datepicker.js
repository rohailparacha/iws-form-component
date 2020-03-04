/******************************************************************************\
 DEPENDENCIES
\******************************************************************************/

import Error from './../Error/Error.js';
import formatFieldClass from './../utilities/formatFieldClass.js';
import Label from './../Label/Label.js';
import moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import titleize from './../utilities/titleize.js';

/******************************************************************************\
 CONFIG: COMPONENT DECLARATION, PROPTYPES, DEFAULT PROPS, & COMPONENT STATE
\******************************************************************************/

class DatePicker extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    dateFormat: React.PropTypes.string,
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
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onChange: React.PropTypes.func,
    placeholders: React.PropTypes.bool,
    validate: React.PropTypes.bool,
    value: React.PropTypes.string,
    weekStart: React.PropTypes.string
  };

  static defaultProps = {
    className: '',
    dateFormat: 'MM/DD/YYYY',
    errorMessage: true,
    label: true,
    onChange: () => {},
    validate: false,
    value: null,
    weekStart: '0'
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

  handleOnChange(datepicker, date) {
    const value = datepicker.formatDate(date._d);
    datepicker.setState({ value }, () => {
      datepicker.validate(value);
      datepicker.props.onChange({ value });
      datepicker.togglePlaceholder(datepicker, { type: 'blur' });
    });
  }

  togglePlaceholder(datepicker, e) {
    const placeholder = !datepicker.state.value && e.type === 'blur';
    datepicker.setState({ placeholder });
  }

/******************************************************************************\
 COMPONENT METHODS
\******************************************************************************/

  clear() {
    const { value } = this.props;
    this.setState({ value });
  }

  formatDate(d) {
    const date = new Date(d);
    return [
      date.getMonth() + 1,
      date.getDate(),
      date.getFullYear()
    ].join('/')
  }

  formatErrorMessage() {
    const { errorMessage, id } = this.props;
    if (typeof errorMessage === 'boolean') {
      return `Please select a valid ${ titleize(id).toLowerCase() }.`;
    } else { return errorMessage; }
  }

  formatPlaceholder() {
    const { id, label, placeholders } = this.props;
    return placeholders ? (typeof label === 'string' ? label : titleize(id)) : null;
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

  validate(value) {
    const { validate } = this.props;
    let error = validate && !value;
    this.setState({ error });
    return error;
  }

/******************************************************************************\
 COMPONENT VIEW
\******************************************************************************/

  render() {

    const {
      className,
      dateFormat,
      disabled,
      id,
      label,
      maxDate,
      minDate,
      weekStart,
      placeholders
    } = this.props;

    const { error, value } = this.state;

    return (
      <div className={ formatFieldClass(className, disabled, error, 'datepicker') }>
        <div className="form__field-inner">
          { this.hasPlaceholder() && (
            <Label
              id={ id }
              label={ label }
              placeholder={ placeholders }
              value={ value } />
          ) }
          <div className="form__field__input-container">
            <ReactDatePicker
              dateFormat={ dateFormat }
              disabled={ disabled }
              maxDate={ maxDate ? moment(new Date(maxDate)) : null }
              minDate={ minDate ? moment(new Date(minDate)) : null }
              selected={ value ? moment(new Date(value)) : null }
              onBlur={ this.togglePlaceholder.bind(null, this) }
              onChange={ this.handleOnChange.bind(null, this) }
              onFocus={ this.togglePlaceholder.bind(null, this) }
              placeholderText={ null }
              weekStart={ weekStart } />
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

export default DatePicker;
