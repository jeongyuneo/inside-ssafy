import React from 'react';
import BusInfoNavigator from '../../molecules/BusInfoNavigator';

const BusInfo = () => {
  const clickHandler = () => {
    console.log('click');
  };
  return (
    <>
      <BusInfoNavigator busNum={1} clickHandler={clickHandler} />
    </>
  );
};

export default BusInfo;
