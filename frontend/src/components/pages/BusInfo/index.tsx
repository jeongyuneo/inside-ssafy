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
import clickBusNumHandler from '../../../utils/clickBusNumHandler';
import postBusLike from './postBusLike';
import deleteBusLike from './deleteBusLike';

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

  const clickBusNumHandlerWrapper = (direction: string) => {
    clickBusNumHandler({ direction, busNum, setBusNum });
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

  const toggleLikeHandler = async () => {
    const isSuccessful: boolean = await (liked
      ? deleteBusLike(busNum)
      : postBusLike(busNum));

    isSuccessful && setLiked(prev => !prev);
  };

  useEffect(() => {
    busInfo && setCurrentStop(busInfo.lastVisitedBusStop);
    busInfo && setLiked(busInfo.hasBusLike);
  }, [busInfo]);

  return (
    <StyledBusInfo>
      <BusInfoHeader
        clickLogoHandler={clickLogoHandler}
        clickBusNumHandler={clickBusNumHandlerWrapper}
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
