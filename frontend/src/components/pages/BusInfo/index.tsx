import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BusInfoImageModal from '../../organisms/BusInfoImageModal';
import BusInfoBody from '../../organisms/BusInfoBody';
import BusInfoHeader from '../../organisms/BusInfoHeader';
import { BusInfoImageType, BusInfoType } from './types';
import { StyledBusInfo } from './styles';
import getBusInfo from './getBusInfo';
import getBusInfoImage from './getBusInfoImage';

/**
 * 해당 페이지의 liked 유무를 받아와서 liked 상태를 변경해 렌더링
 *
 * @author jojo
 */
const BusInfo = () => {
  const [busNum, setBusNum] = useState(1);
  const [currentStop, setCurrentStop] = useState(-1);
  const [liked, setLiked] = useState(false);
  const [openedBusInfoModal, setOpenedBusInfoModal] = useState(false);
  const navigate = useNavigate();

  const { data: busInfo } = useQuery<BusInfoType>(['busInfo', busNum], () =>
    getBusInfo({ busNum }),
  );

  const { data: busInfoImage } = useQuery<BusInfoImageType>(
    ['busInfoImage', busNum],
    () => getBusInfoImage({ busNum }),
  );

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

  const clickLogoHandler = () => {
    navigate('/');
  };

  const toggleBusInfoModalHandler = () => {
    setOpenedBusInfoModal(prev => !prev);
  };

  const toggleLikeHandler = () => {
    setLiked(prev => !prev);
  };

  useEffect(() => {
    console.log(busInfo);

    busInfo && setCurrentStop(busInfo.lastVisitedBusStop);
    busInfo && setLiked(busInfo.hasBusLike);
  }, [busInfo]);

  return (
    <StyledBusInfo>
      <BusInfoHeader
        clickLogoHandler={clickLogoHandler}
        clickBusNumHandler={clickBusNumHandler}
        busNum={busNum}
        liked={liked}
        toggleLikeHandler={toggleLikeHandler}
        toggleBusInfoModalHandler={toggleBusInfoModalHandler}
      />
      <BusInfoBody
        currentStop={currentStop}
        busStops={busInfo?.busStops}
        clickRefreshHandler={clickRefreshHandler}
      />
      {openedBusInfoModal && (
        <BusInfoImageModal
          busInfoImage={busInfoImage?.url || ''}
          toggleBusInfoModalHandler={toggleBusInfoModalHandler}
        />
      )}
    </StyledBusInfo>
  );
};

export default BusInfo;
