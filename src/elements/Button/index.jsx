import React from 'react';

import './styles.scss';

export default props => {
  const { pressButton, children, disabled = false } = props;

  return (
    <button
      className={`button${disabled ? ' disabled' : ''}`}
      onClick={pressButton}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
