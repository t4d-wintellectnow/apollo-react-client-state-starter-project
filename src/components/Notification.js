import React from 'react';
import Transition from 'react-transition-group/Transition';
import { uniqueId, omit } from 'lodash';

export const Notification = ({ children, ...props }) =>
  <NotificationController uniqueId={uniqueId()} {...props}>{children}</NotificationController>;

Notification.defaultProps = {
  transitionDuration: 500,
  showMessageDuration: 1500,
  height: '30px',
};

class NotificationController extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      remove: true,
      uniqueId: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {

    if (props.uniqueId && state.uniqueId !== props.uniqueId) {
      return {
        uniqueId: props.uniqueId,
        visible: true,
        remove: false,
      };
    }

    return null;
  }

  render() {

    const { showMessageDuration, ...props } = this.props;
    const { transitionDuration } = props;

    if (this.state.visible) {
      setTimeout(() => {
        this.setState({ visible: false });
        setTimeout(() => {
          this.setState({ remove: true });
        }, transitionDuration + 5000);
      }, showMessageDuration + transitionDuration);
    }

    return this.state.remove ||
      <NotificationMessage show={this.state.visible} {...omit(props, 'uniqueId')}>
        {this.props.children}
      </NotificationMessage>;
  }

}

const NotificationMessage = ({ show, transitionDuration, height, children, ...props }) => {

  const defaultStyle = {
    transition: `height ${transitionDuration}ms ease-in-out, opacity ${transitionDuration}ms ease-in-out`,
    opacity: 0,
    height: 0,
  };

  const transitionStyles = {
    entering: { opacity: 0, height: 0, },
    entered: { opacity: 1, height, },
  };

  return <Transition appear={true} in={show} timeout={transitionDuration} unmountOnExit={false}>
    {transitionStatus => <div {...props} style={{
      ...defaultStyle,
      ...transitionStyles[transitionStatus]
    }}>{children}</div>}
  </Transition>;
};
