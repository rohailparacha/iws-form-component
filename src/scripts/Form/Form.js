/******************************************************************************\
 DEPENDENCIES
\******************************************************************************/

import axios from 'axios';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Submit from './../Submit/Submit.js';
import Success from './../Success/Success.js';

/******************************************************************************\
 CONFIG: COMPONENT DECLARATION, PROPTYPES, DEFAULT PROPS, & COMPONENT STATE
\******************************************************************************/

class Form extends React.Component {

  static propTypes = {
    action: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    errorMessages: React.PropTypes.bool,
    eventAction: React.PropTypes.string,
    eventCategory: React.PropTypes.string,
    eventLabel: React.PropTypes.string,
    eventTracking: React.PropTypes.bool,
    eventValue: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    id: React.PropTypes.string,
    onError: React.PropTypes.func,
    onFail: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    placeholders: React.PropTypes.bool,
    submitText: React.PropTypes.string,
    successMessage: React.PropTypes.string,
    successModal: React.PropTypes.bool,
    transition: React.PropTypes.object
  };

  static defaultProps = {
    className: '',
    errorMessages: true,
    eventAction: 'Completion',
    eventCategory: 'Form',
    eventLabel: '',
    eventTracking: false,
    eventValue: 0,
    id: 'form',
    onError: () => {},
    onFail: () => {},
    onSuccess: () => {},
    placeholders: false,
    submitText: 'Submit',
    successMessage: 'Thank You for Your Submission!',
    successModal: false,
    transition: {
      component: 'div',
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500,
      transitionName: 'form--fade'
    }
  };

  state = {
    posting: false,
    success: false
  };

/******************************************************************************\
 EVENT HANDLERS
\******************************************************************************/

  handleCloseModal = (e) => { this.setState({ success: false }); };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.validate(() => {
      const { action } = this.props;
      const data = this.getData();
      axios.post(action, data).then((response) => {
        this.setState({ posting: false, success: true }, () => {
          this.props.onSuccess();
          this.trackForm();
          this.clearForm();
        });
      }).catch((error) => {
        this.setState({ posting: false }, () => {
          this.props.onFail(error);
        });
      });
    });
  };

/******************************************************************************\
 COMPONENT METHODS
\******************************************************************************/

  clearForm() {
    const fields = this.refs;
    Object.keys(fields).forEach((field, i) => {
      fields[field].clear && fields[field].clear();
    });
  }

  formatClassName() {
    const { success } = this.state;
    const { className } = this.props;
    return [
      'form form--transition-container',
      className,
      success ? 'form--success' : '',
    ].join(' ');
  }

  getData() {
    const fields = this.refs;
    const { action } = this.props;
    const isV2 = action.search(/v2/i) !== -1;
    const data = isV2 ? new FormData() : {};
    Object.keys(fields).forEach((field) => {
      const { props, state } = fields[field];
      if (props.type === 'file') {
        isV2 && state.value && data.append(props.id, state.value, state.value.name);
      } else {
        isV2 ? data.append(props.id, state.value) : data[props.id] = state.value;
      }
    });
    return data;
  }

  cloneChildren(children) {
    return React.Children.map(children, (child, i) => {
      if (child) {
        if (typeof child.type === 'function') {
          return React.cloneElement(child, {
            errorMessages: this.props.errorMessages,
            placeholders: this.props.placeholders,
            ref: child.props.id,
            transition: this.props.transition
          });
        } else if (child.props) {
          const { children } = child.props;
          return React.cloneElement(child, {}, this.cloneChildren(children));
        } else { return child; }
      }
    });
  }

  trackForm() {
    if (window.ga && this.props.eventTracking) {
      const {
        eventAction,
        eventCategory,
        eventLabel,
        eventValue
      } = this.props;

      ga('send', 'event', {
        eventAction,
        eventCategory,
        eventLabel,
        eventValue
      });
    }
  }

  validate(cb) {
    const errors = Object.keys(this.refs).filter((ref, i) => {
      const field = this.refs[ref];
      const { value } = field.state;
      return field.validate && field.validate(value);
    });
    if (errors.length) { this.props.onError({ errors });}
    else { this.setState({ posting: true }, cb); }
  }

/******************************************************************************\
 COMPONENT VIEW
\******************************************************************************/

  render() {

    const {
      children,
      id,
      submitText,
      successModal,
      successMessage
    } = this.props;
    
    const { posting, success } = this.state;

    return (
      <CSSTransitionGroup
        { ...this.props.transition }
        className={ this.formatClassName() }>
        <form id={ id } key="form">
          { this.cloneChildren(children) }
          <Submit
            handleOnSubmit={ this.handleOnSubmit }
            posting={ posting }
            text={ submitText } />
        </form>
        { success && (
          <Success
            className={`${ successModal ? 'form__success--modal'  : '' }`}
            handleCloseModal={ this.handleCloseModal }
            key="success"
            message={ successMessage }
            modal={ successModal } />
        ) }
      </CSSTransitionGroup>
    );
  }
}

/******************************************************************************\
 EXPORT
\******************************************************************************/

export default Form;
