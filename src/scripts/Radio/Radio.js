/******************************************************************************\
 DEPENDENCIES
\******************************************************************************/

import formatFieldClass from './../utilities/formatFieldClass.js';
import Label from './../Label/Label.js';

/******************************************************************************\
 CONFIG: COMPONENT DECLARATION, PROPTYPES, DEFAULT PROPS, & COMPONENT STATE
\******************************************************************************/

class Radio extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
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
    value: React.PropTypes.string
  };

  static defaultProps = {
    className: '',
    label: true,
    onChange: () => {},
    value: ''
  };

  state = { value: this.props.value };

/******************************************************************************\
 LIFECYCLE METHODS
\******************************************************************************/

  componentWillReceiveProps({ disabled }) { this.setState({ disabled }); }

/******************************************************************************\
 EVENT HANDLERS
\******************************************************************************/

  handleOnChange = ({ target }) => {
    const value = target.id;
    this.setState({ value }, () => {
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

  formatChoices(choices) {
    return choices && choices.map((choice, i) => {
      const value = typeof choice === 'object' ? choice.value : choice;
      const label = typeof choice === 'object' ? choice.label : choice;
      return { label, value };
    });
  }

/******************************************************************************\
 COMPONENT VIEW
\******************************************************************************/

  render() {

    const { className, disabled, id, label, options } = this.props;
    const choices = this.formatChoices(options);
    const { value } = this.state;

    return (
      <div className={ formatFieldClass(className, disabled, false, 'radio') }>
        <div className="form__field-inner">
          <Label
            id={ id }
            label={ label }
            placeholder={ false }
            value={ value } />
          { choices && choices.map((option, i) => {
            return (
              <div
                className="form__field__input-container"
                key={ i }>
                <Label
                  id={ option.value }
                  label={ option.label }
                  placeholder={ false }
                  value={ this.state.value === option.value } />
                <input
                  disabled={ disabled }
                  id={ option.value }
                  name={ id }
                  onChange={ this.handleOnChange }
                  ref={ option.value }
                  type="radio"
                  checked={ this.state.value === option.value } />
              </div>
            );
          }) }
        </div>
      </div>
    );
  }
}

/******************************************************************************\
 EXPORT
\******************************************************************************/

export default Radio;
