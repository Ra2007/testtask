import React, { useState } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { getWeatherCity } from '../flex/actions';
import Button from '../elements/Button';
import TabLink from '../elements/TabLink';
import Input from '../elements/Input';

import './styles.scss';

function WrapPages(props) {
  const {
    route: { routes },
    getWeatherCity,
    cities: { error }
  } = props;
  const [findCity, handleFindCity] = useState('');

  const clickFind = () => {
    getWeatherCity(findCity);
    handleFindCity('');
  };

  return (
    <div className='app-container'>
      <div className='tab-wrap'>
        <div className='input-wrap'>
          <Input value={findCity} changeValue={handleFindCity} error={error} />
          <Button pressButton={() => clickFind()} disabled={!findCity}>
            Найти город
          </Button>
        </div>
        <div className='tab-link-wrap'>
          <TabLink linkTo='/all'>ВСЕ</TabLink>
          <TabLink linkTo='/active'>АКТИВНЫЕ</TabLink>
          <TabLink linkTo='/deleted'>УДАЛЕННЫЕ</TabLink>
        </div>
      </div>
      <div className='content'>{renderRoutes(routes)}</div>
    </div>
  );
}

const mapStateToProps = state => ({ cities: state.cities });

const mapDispatchToProps = dispatch => ({
  getWeatherCity: city => dispatch(getWeatherCity(city))
});

export default connect(mapStateToProps, mapDispatchToProps)(WrapPages);
