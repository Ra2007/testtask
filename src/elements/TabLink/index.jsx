import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

export default props => {
  const { children, linkTo } = props;
  return (
    <NavLink to={linkTo} activeClassName='selected' className='tab-nav-link'>
      {children}
    </NavLink>
  );
};
