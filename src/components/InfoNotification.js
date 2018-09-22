import React from 'react';

import { Notification } from './Notification';

import './InfoNotification.scss';

export const InfoNotification = ({ children, ...props }) =>
  <Notification className="info-notification" height="42px" {...props}>
    {children}
  </Notification>;
