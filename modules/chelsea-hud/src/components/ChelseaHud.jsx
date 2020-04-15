import React from 'react';
import PropTypes from 'prop-types';

export default function ChelseaHUD({ children }) {
  // eslint-disable-next-line prettier/prettier
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}

ChelseaHUD.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

ChelseaHUD.defaultProps = {
  children: null,
};
