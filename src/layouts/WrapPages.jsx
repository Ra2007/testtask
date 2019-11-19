import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { getWeatherCity } from '../flex/actions';

import './styles.css';

function WrapPages(props) {
  const {
    route: { routes },
    getWeatherCity
  } = props;
  console.log(props);
  return (
    <div className='app-container'>
      <div className='tab-wrap'>
        <Link to='/all'>ALL</Link>
        <Link to='/active'>ACTIVE</Link>
        <Link to='/deleted'>DELETED</Link>
        <button onClick={() => getWeatherCity('London')}>Get Data</button>
      </div>
      <div className='content'>{renderRoutes(routes)}</div>
    </div>
  );
}

const mapStateToProps = ({ tests }) => {
  return { tests };
};

const mapDispatchToProps = dispatch => ({
  getWeatherCity: city => dispatch(getWeatherCity(city))
});

export default connect(mapStateToProps, mapDispatchToProps)(WrapPages);
