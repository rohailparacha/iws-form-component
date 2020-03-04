/******************************************************************************\
 DEPENDENCIES
\******************************************************************************/

import titleize from './../utilities/titleize.js';

/******************************************************************************\
 CONFIG: COMPONENT DECLARATION, PROPTYPES, DEFAULT PROPS, & COMPONENT STATE
\******************************************************************************/

class Label extends React.Component {

  static propTypes = {
    id: React.PropTypes.string,
    label: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.bool,
    useFor: React.PropTypes.bool,
    value: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.string
    ])
  };

  static defaultProps = { useFor: true }

/******************************************************************************\
 COMPONENT METHODS
\******************************************************************************/

  formatLabel(id) {
    const { label } = this.props;
    return typeof label === 'string' ? label : titleize(id);
  }

/******************************************************************************\
 COMPONENT VIEW
\******************************************************************************/

  render() {

    const { id, onChange, placeholder, useFor, value } = this.props;

    return (
      <label
        className={`form__${ placeholder ? 'placeholder' : 'label' }`}
        data-value={ value }
        htmlFor={ useFor ? id : undefined }
        onClick={ onChange }>
        <span dangerouslySetInnerHTML={{ __html: this.formatLabel(id) }} />
      </label>
    );
  }
}

/******************************************************************************\
 EXPORT
\******************************************************************************/

export default Label;
