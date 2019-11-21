import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../elements/Button';
import {
  cityUp,
  cityDown,
  citySetStatus,
  cityUpdate
} from '../../flex/actions';
import Modal from 'react-modal';
import Input from '../../elements/Input';

import './styles.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

function TabContent(props) {
  const {
    citiesList,
    cityUp,
    cityDown,
    citySetStatus,
    tab,
    cityUpdate
  } = props;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [city, setSity] = useState({});
  const [editModalCity, changeEditModalCity] = useState('');
  const [editModalTemp, changeEditModalTemp] = useState(0);
  const [editModalId, changeEditModalId] = useState(0);

  function openModal(name, id, status) {
    setSity({ name, id, status });
    setIsOpen(true);
  }

  function deleteCity(id) {
    citySetStatus(id);
    setIsOpen(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const closeEditModal = () => {
    setIsEditModal(false);
  };

  const openEditModal = (id, city, temp) => {
    changeEditModalId(id);
    changeEditModalCity(city);
    changeEditModalTemp(temp);
    setIsEditModal(true);
  };
  const updateCityModal = () => {
    setIsEditModal(false);
    return cityUpdate({
      id: editModalId,
      city: editModalCity,
      temp: editModalTemp
    });
  };

  return (
    <div className='tab-content-wrap'>
      <table className='table-tab'>
        <thead>
          <tr className='table-tab-head'>
            <td>Город</td>
            <td>Температура</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {citiesList
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map(
              ({ city, temp, id, status }, i) =>
                (tab === 'ALL' || status === tab) && (
                  <tr key={i}>
                    <td
                      onClick={() => openEditModal(id, city, temp)}
                      className='table-td'
                    >
                      {city}
                    </td>
                    <td
                      onClick={() => openEditModal(id, city, temp)}
                      className='table-td'
                    >
                      {temp}
                    </td>

                    <td>
                      <Button pressButton={() => cityUp(id, tab)}>Вверх</Button>
                      <Button pressButton={() => cityDown(id, tab)}>
                        Вниз
                      </Button>
                      <Button pressButton={() => openModal(city, id, status)}>
                        {status === 'ACTIVE' ? 'Удалить' : 'Восстановить'}
                      </Button>
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div>{`${city.status === 'ACTIVE' ? 'Удалить' : 'Восстановить'} город ${
          city.name
        } из списка?`}</div>
        <Button pressButton={() => deleteCity(city.id)}>
          {city.status === 'ACTIVE' ? 'Удалить' : 'Восстановить'}
        </Button>
      </Modal>

      <Modal
        isOpen={isEditModal}
        onRequestClose={closeEditModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <Input
          label='Город'
          value={editModalCity}
          changeValue={changeEditModalCity}
        />
        <Input
          label='Температура'
          value={editModalTemp}
          changeValue={changeEditModalTemp}
        />
        <Button
          pressButton={() => updateCityModal()}
          disabled={!editModalCity || !editModalTemp}
        >
          Сохранить
        </Button>
        <Button pressButton={() => closeEditModal()}>Отменить</Button>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  citiesList: state.cities.list
});

const mapDispatchToProps = dispatch => ({
  cityUp: (id, tab) => dispatch(cityUp(id, tab)),
  cityDown: (id, tab) => dispatch(cityDown(id, tab)),
  citySetStatus: id => dispatch(citySetStatus(id)),
  cityUpdate: params => dispatch(cityUpdate(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabContent);
