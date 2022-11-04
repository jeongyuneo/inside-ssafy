import React, { useState } from 'react';
import BusInfoImageModal from '../../organisms/BusInfoBody/BusInfoImageModal';
import BusInfoNavbar from '../../molecules/BusInfoNavbar';
import BusInfoNavigator from '../../molecules/BusInfoNavigator';
import BusLine from '../../molecules/BusLine';
import BusInfoBody from '../../organisms/BusInfoBody';
import { StyledBusInfo } from './styles';

/**
 * 해당 페이지의 liked 유무를 받아와서 liked 상태를 변경해 렌더링
 *
 * @author jojo
 */
const BusInfo = () => {
  const [busNum, setBusNum] = useState(1);
  const [currentStop, setCurrentStop] = useState(4);
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

  const clickRefreshHandler = () => {
    console.log('refresh');
  };

  const toggleBusInfoModalHandler = () => {
    setOpenedBusInfoModal(prev => !prev);
  };

  const toggleLikeHandler = () => {
    setLiked(prev => !prev);
  };

  const busStops = [
    '용전네거리',
    '서대전네거리',
    '엘니아',
    '페리온',
    '헤네시스',
    '충대정문',
    '유성문화원',
    '유성온천역6번출구',
    '구암역',
    '현충원역',
  ];

  const busInfoImage =
    'https://cdn.pixabay.com/photo/2019/10/05/19/40/pumpkins-4528653_960_720.jpg';

  return (
    <StyledBusInfo>
      <BusInfoNavigator busNum={busNum} clickHandler={clickBusNumHandler} />
      <BusInfoNavbar
        liked={liked}
        toggleLikeHandler={toggleLikeHandler}
        toggleBusInfoModalHandler={toggleBusInfoModalHandler}
      />
      <BusInfoBody
        currentStop={currentStop}
        busStops={busStops}
        clickRefreshHandler={clickRefreshHandler}
      />
      {openedBusInfoModal && (
        <BusInfoImageModal
          busInfoImage={busInfoImage}
          toggleBusInfoModalHandler={toggleBusInfoModalHandler}
        />
      )}
    </StyledBusInfo>
  );
};

export default BusInfo;
