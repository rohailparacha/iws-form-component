/******************************************************************************\
 DEPENDENCIES
\******************************************************************************/

import Error from './../Error/Error.js';
import formatFieldClass from './../utilities/formatFieldClass.js';
import Label from './../Label/Label.js';
import Text from './../Text/Text.js';

/******************************************************************************\
 CONFIG: COMPONENT DECLARATION, PROPTYPES, DEFAULT PROPS, & COMPONENT STATE
\******************************************************************************/

class Textarea extends Text {

  static defaultProps = {
    errorMessage: true,
    label: true,
    onChange: () => {},
    onError: () => {},
    type: 'textarea',
    validate: false,
    value: ''
  };

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
            <textarea
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

export default Textarea;
