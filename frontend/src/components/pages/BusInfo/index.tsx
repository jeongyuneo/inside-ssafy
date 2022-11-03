import React, { useState } from 'react';
import BusInfoNavbar from '../../molecules/BusInfoNavbar';
import BusInfoNavigator from '../../molecules/BusInfoNavigator';

/**
 * 해당 페이지의 liked 유무를 받아와서 liked 상태를 변경해 렌더링
 *
 * @author jojo
 */
const BusInfo = () => {
  const [busNum, setBusNum] = useState(1);
  const [liked, setLiked] = useState(false);
  const [openedBusInfoModal, setOpenedBusInfoModal] = useState(false);

  const clickBusNumHandler = (direction: string) => {
    if (
      (busNum === 1 && direction === 'left') ||
      (busNum === 6 && direction === 'right')
    ) {
      return;
    }

    direction === 'left'
      ? setBusNum(prev => prev - 1)
      : setBusNum(prev => prev + 1);
  };

  const clickBusInfoModalHandler = () => {
    setOpenedBusInfoModal(prev => !prev);
  };

  const toggleLikeHandler = () => {
    setLiked(prev => !prev);
  };

  return (
    <>
      <BusInfoNavigator busNum={busNum} clickHandler={clickBusNumHandler} />
      <BusInfoNavbar
        liked={liked}
        toggleLikeHandler={toggleLikeHandler}
        clickBusInfoModalHandler={clickBusInfoModalHandler}
      />
    </>
  );
};

export default BusInfo;
