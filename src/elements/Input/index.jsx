import React from 'react';

import './styles.scss';

export default props => {
  const { value, changeValue, error, label } = props;
  return (
    <div>
      {label ? <div className='input-label'>{label}</div> : ''}
      <input
        className='input'
        value={value}
        onChange={e => changeValue(e.target.value)}
      />
      {error && !value && <div className='error'>{error}</div>}
    </div>
  );
};
