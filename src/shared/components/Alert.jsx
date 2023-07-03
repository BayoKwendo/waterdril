import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';

const AlertComponent = ({
  color, className,  children,
}) => {
  const [visible, setVisible] = useState(true);

  const onShow = () => {
    setVisible(true);
  };

  const onDismiss = () => {
    setVisible(false);
  };


  // switch (color) {
  //   case 'info':
  //     Icon = <InformationOutlineIcon />;
  //     break;
  //   case 'success':
  //     Icon = <ThumbUpOutlineIcon />;
  //     break;
  //   case 'warning':
  //     Icon = <CommentAlertOutlineIcon />;
  //     break;
  //   case 'danger':
  //     Icon = <CloseCircleOutlineIcon />;
  //     break;
  //   default:
  //     console.log('Wrong color!');
  //     break;
  // }

  if (visible) {
    return (
      <Alert color={color} className={className} isOpen={visible}>
        <button className="close" type="button" onClick={onDismiss}>
          <span className="lnr lnr-cross" />
        </button>
        <div className="alert__content">{children}</div>
      </Alert>
    );
  }

  return <Button onClick={onShow}>Show Alert</Button>;
};

export default AlertComponent;

AlertComponent.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
};

AlertComponent.defaultProps = {
  color: '',
  icon: false,
  className: '',
};
