import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clickBusNumHandler from '../../../utils/clickBusNumHandler';
import navigator from '../../../utils/navigator';
import MenuCard from '../../molecules/MenuCard';
import Navbar from '../../molecules/Navbar';
import FavoriteBusCarosel from '../../organisms/FavoriteBusCarosel';
import ImageTextButtonGroup from '../../organisms/ImageTextButtonGroup';
import { getImageInfos } from './getImageInfos';
import getLikeBuses from './getLikeBuses';
import getMainData from './getMainData';
import { FlexWrapper, StyledMain, TodayMenuWrapper } from './styles';

/**
 * 로그인 혹은 Navbar의 로고 클릭 시 라우팅 되는 메인 페이지
 *
 * @author jojo
 */
const Main = () => {
  const [busIdx, setBusIdx] = useState(0);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: mainData } = useQuery(['menusHotPosts'], () => getMainData());
  const { data: likeBus } = useQuery(
    ['likeBuses', mainData, busIdx],
    () => getLikeBuses(mainData?.busLikes?.[busIdx]),
    {
      enabled: !!mainData?.busLikes,
    },
  );

  const clickRefreshHandler = () => {
    // likeBus를 refetch하도록 query key를 invalidate
    queryClient.invalidateQueries(['likeBuses', mainData, busIdx]);
  };

  const clickBusNumHandlerWrapper = (direction: string) => {
    clickBusNumHandler({
      direction,
      allBusNums: mainData?.busLikes,
      busIdx,
      setBusIdx,
    });
  };

  return (
    <StyledMain>
      <FlexWrapper>
        <Navbar
          clickLogoHandler={navigator(navigate).main}
          clickMypageHandler={navigator(navigate).mypage}
        />
        <ImageTextButtonGroup imageTextInfos={getImageInfos(navigate)} />
        <FavoriteBusCarosel
          busNum={mainData?.busLikes?.[busIdx] || 0}
          previousBusStop={likeBus?.previousBusStop}
          nextBusStop={likeBus?.nextBusStop}
          errorMessage={likeBus?.message}
          busLikes={mainData?.busLikes}
          clickRefreshHandler={clickRefreshHandler}
          clickPlusHandler={
            navigator(navigate, {
              state: { busNum: mainData?.busLikes?.[busIdx] },
            }).busInfo
          }
          clickBusNumHandler={clickBusNumHandlerWrapper}
        />
        <TodayMenuWrapper>
          <MenuCard
            items={mainData?.menu?.items}
            subItems={mainData?.menu?.subItems}
            dayOfTheWeek="오늘의 식단"
          />
        </TodayMenuWrapper>
      </FlexWrapper>
    </StyledMain>
  );
};

export default Main;
