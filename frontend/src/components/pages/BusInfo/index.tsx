import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
import navigator from '../../../utils/navigator';
import calculateInitialBusIdx from './calculateInitialBusIdx';

/**
 * 해당 페이지의 liked 유무를 받아와서 liked 상태를 변경해 렌더링
 *
 * @author jojo
 */
const BusInfo = () => {
  const ALL_BUS_NUMS = [1, 2, 3, 4, 5, 6];

  const navigate = useNavigate();
  const location = useLocation();
  // param으로 넘어온 busNum이 있으면 그 값에 맞는 idx를 찾아 초기 인덱스로 설정, 아니면 0
  const initialBusIdx = calculateInitialBusIdx({
    ALL_BUS_NUMS,
    busNum: location.state?.busNum,
  });
  const queryClient = useQueryClient();

  // ALL_BUS_NUMS 배열에서 인덱스에 맞는 버스 번호를 찾도록 busIdx를 상태로 관리
  const [busIdx, setBusIdx] = useState(initialBusIdx);
  const [currentStop, setCurrentStop] = useState(-1);
  const [liked, setLiked] = useState(false);
  const [openedBusInfoModal, setOpenedBusInfoModal] = useState(false);

  const { data: busInfo } = useQuery<BusInfoType>(['busInfo', busIdx], () =>
    getBusInfo({ busNum: ALL_BUS_NUMS[busIdx] }),
  );

  const { data: busInfoImage } = useQuery<BusInfoImageType>(
    ['busInfoImage', busIdx],
    () => getBusInfoImage({ busNum: ALL_BUS_NUMS[busIdx] }),
  );

  const clickBusNumHandlerWrapper = (direction: string) => {
    clickBusNumHandler({ direction, busIdx, setBusIdx });
  };

  const clickRefreshHandler = () => {
    queryClient.invalidateQueries(['busInfo', busIdx]);
  };

  const toggleBusInfoModalHandler = () => {
    setOpenedBusInfoModal(prev => !prev);
  };

  const toggleLikeHandler = async () => {
    const isSuccessful: boolean = await (liked
      ? deleteBusLike(ALL_BUS_NUMS[busIdx])
      : postBusLike(ALL_BUS_NUMS[busIdx]));

    isSuccessful && setLiked(prev => !prev);
  };

  useEffect(() => {
    busInfo && setCurrentStop(busInfo.lastVisitedBusStop);
    busInfo && setLiked(busInfo.hasBusLike);
  }, [busInfo]);

  return (
    <StyledBusInfo>
      <BusInfoHeader
        clickLogoHandler={navigator(navigate).main}
        clickMypageHandler={navigator(navigate).mypage}
        clickBusNumHandler={clickBusNumHandlerWrapper}
        busNum={ALL_BUS_NUMS[busIdx]}
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
