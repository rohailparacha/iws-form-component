/******************************************************************************\
 DEPENDENCIES
\******************************************************************************/

import formatFieldClass from './../utilities/formatFieldClass.js';

/******************************************************************************\
 CONFIG: COMPONENT DECLARATION, PROPTYPES, DEFAULT PROPS, & COMPONENT STATE
\******************************************************************************/

class Hidden extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
    value: React.PropTypes.string
  };

  static defaultProps = {
    className: '',
    value: ''
  };

  state = { value: this.props.value };

/******************************************************************************\
 LIFECYCLE METHODS
\******************************************************************************/

  componentWillReceiveProps({ value }) { value && this.setState({ value }); }

/******************************************************************************\
 COMPONENT METHODS
\******************************************************************************/

  clear() {
    const { value } = this.props;
    this.setState({ value });
  }

/******************************************************************************\
 COMPONENT VIEW
\******************************************************************************/

  render() {

    const { className, id } = this.props;
    const { value } = this.state;

    return (
      <input
        className={ formatFieldClass(className, false, 'hidden') }
        id={ id }
        type="hidden"
        value={ value } />
    );
  }
}

/******************************************************************************\
 EXPORT
\******************************************************************************/

export default Hidden;
