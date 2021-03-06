import React from 'react';
import { connect } from 'react-redux';

import constants from '../../constants.js';

const {string, oneOf} = React.PropTypes;
const iconMap = {
  [constants.PROXY_STATUS_STARTING]: 'fa-hourglass-half',
  [constants.PROXY_STATUS_WORKING]: 'fa-check',
  [constants.PROXY_STATUS_NO_HTTPS]: 'fa-check',
  [constants.PROXY_STATUS_ERROR_ADDRESS_IN_USE]: 'fa-exclamation-triangle',
  [constants.PROXY_STATUS_ERROR_GENERIC]: 'fa-exclamation-triangle'
};

const messageMap = {
  [constants.PROXY_STATUS_STARTING]: 'Starting...',
  [constants.PROXY_STATUS_WORKING]: 'Online',
  [constants.PROXY_STATUS_NO_HTTPS]: 'HTTPS disabled',
  [constants.PROXY_STATUS_ERROR_ADDRESS_IN_USE]: 'Address already in use',
  [constants.PROXY_STATUS_ERROR_GENERIC]: 'Error'
};

const getMessage = (status) => {
  if (!messageMap[status]) {
    return label;
  }
  return messageMap[status];
};

const ProxyStatus = ({proxyStatus, proxyReason}) => {
  const icon = 'fa ' + iconMap[proxyStatus];
  const message = 'Proxy: ' + getMessage(proxyStatus);
  const title = proxyReason;
  const classes = ['proxy-status', proxyStatus];

  return <div className={classes.join(' ')} title={title}>
    <i className={icon} />
    <span className="message">{message}</span>
  </div>;
};

ProxyStatus.propTypes = {
  proxyStatus: oneOf([
    constants.PROXY_STATUS_STARTING,
    constants.PROXY_STATUS_WORKING,
    constants.PROXY_STATUS_NO_HTTPS,
    constants.PROXY_STATUS_ERROR_ADDRESS_IN_USE,
    constants.PROXY_STATUS_ERROR_GENERIC
  ]).isRequired,
  proxyReason: string,
  proxyMessage: string
};


import { getProxyState } from '../../reducers/proxy.js';

const mapStateToProps = (state) => {
  const { status, statusReason } = getProxyState(state);

  return {
    proxyStatus: status,
    proxyReason: statusReason
  };
};

export default connect(mapStateToProps)(ProxyStatus);
