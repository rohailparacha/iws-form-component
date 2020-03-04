/******************************************************************************\
 DEPENDENCIES
\******************************************************************************/

import DropKick from 'dropkickjs/build/js/dropkick.min.js';
import Error from './../Error/Error.js';
import formatFieldClass from './../utilities/formatFieldClass.js';
import Label from './../Label/Label.js';
import titleize from './../utilities/titleize.js';

/******************************************************************************\
 CONFIG: COMPONENT DECLARATION, PROPTYPES, DEFAULT PROPS, & COMPONENT STATE
\******************************************************************************/

class Select extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    errorMessage: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
    dkOptions: React.PropTypes.object,
    errorMessages: React.PropTypes.bool,
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
    onChange: React.PropTypes.func,
    options: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
      React.PropTypes.shape({
        label: React.PropTypes.string,
        value: React.PropTypes.string
      }),
      React.PropTypes.string
    ])),
    placeholders: React.PropTypes.bool,
    validate: React.PropTypes.bool,
    value: React.PropTypes.string
  };

  static defaultProps = {
    className: '',
    dkOptions: {},
    errorMessage: true,
    label: true,
    onChange: () => {},
    validate: false,
    value: ''
  };

  state = {
    choices: null,
    dk: null,
    error: false,
    value: this.props.value
  };

/******************************************************************************\
 LIFECYCLE METHODS
\******************************************************************************/

  componentDidMount() { this.buildSelect(); }

  componentWillReceiveProps({ disabled, options, placeholders, value }) {
    const updatedDisabled = disabled !== this.props.disabled;
    options = placeholders ? this.formatPlaceholder(options) : options;
    const updatedOptions = JSON.stringify(options) !== JSON.stringify(this.props.options);
    (value || updatedDisabled || updatedOptions) && this.setState({ value }, () => {
      this.buildSelect();
    });
  }

/******************************************************************************\
 EVENT HANDLERS
\******************************************************************************/

  handleOnChange = (e) => {
    const { value } = e.target;
    this.setState({ value }, () => {
      this.validate(value);
      this.props.onChange({ value });
    });
  };

/******************************************************************************\
 COMPONENT METHODS
\******************************************************************************/

  buildSelect() {
    const { dkOptions, options } = this.props;
    const { select } = this.refs;
    const { dk } = this.state;
    this.setState({
      choices: this.formatChoices(options),
    }, () => {
      if (!dk) {
        const dk = options && new DropKick(select, dkOptions);
        this.setState({ dk });
      } else {  dk.reset(true); }
    });
  }

  clear() {
    const { options, value } = this.props;
    const { select } = this.refs;
    let { dk } = this.state;
    this.setState({ value }, () => { dk.reset(true); });
  }

  formatChoices(choices) {
    const { placeholders } = this.props;
    choices = placeholders ? this.formatPlaceholder(choices) : choices;
    return choices && choices.map((choice, i) => {
      const value = typeof choice === 'object' ? choice.value : choice;
      const label = typeof choice === 'object' ? choice.label : choice;
      return <option key={ i } value={ value }>{ label }</option>;
    });
  }

  formatClassName() {
    const { className, disabled, placeholders } = this.props;
    const { choices, error, value } = this.state;
    return [
      formatFieldClass(className, disabled, error, 'select'),
      placeholders ? 'form__field--select--placeholders' : '',
      placeholders && this.getFirstOption(choices) === value ? 'form__field--select--placeholder' : ''
    ].join(' ');
  }

  formatErrorMessage() {
    const { errorMessage, id } = this.props;
    if (typeof errorMessage === 'boolean') {
      return `Please select a valid ${ titleize(id).toLowerCase() }.`;
    } else { return errorMessage; }
  }

  formatPlaceholder(choices) {
    const { id } = this.props;
    let { label } = this.props;
    label = typeof label === 'string' ? label : `Please Select a Valid ${ titleize(id) }`;
    choices.unshift({ value: '', label });
    return choices;
  }

  getFirstOption(options) {
    if (options) {
      const { props } = React.Children.toArray(options)[0];
      return props.value;
    }
  }

  hasError() {
    const { errorMessage, errorMessages } = this.props;
    const { error } = this.state;
    return errorMessage && errorMessages && error;
  }

  validate(value) {
    const { validate } = this.props;
    const error = validate && !value;
    this.setState({ error });
    return error;
  }

/******************************************************************************\
 COMPONENT VIEW
\******************************************************************************/

  render() {

    const { disabled, id, label, options, placeholders } = this.props;
    const { choices, value } = this.state;

    return (
      <div className={ this.formatClassName() }>
        <div className="form__field-inner">
          { !placeholders && (
            <Label
              id={ id }
              label={ label }
              placeholder={ false }
              value={ value } />
          ) }
          <div className="form__field__input-container">
            <select
              disabled={ disabled }
              id={ id }
              onChange={ this.handleOnChange }
              ref="select"
              value={ value }>
              { choices }
            </select>
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

export default Select;
