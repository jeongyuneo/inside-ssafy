import React from 'react';
import BusInfoNavigator from '../../molecules/BusInfoNavigator';

const BusInfo = () => {
  const clickHandler = (direction: string) => {
    console.log(direction);
  };
  return (
    <>
      <BusInfoNavigator busNum={1} clickHandler={clickHandler} />
    </>
  );
};

export default BusInfo;
