import React from 'react';
import { BusInfoNavbarContainer, StyledBusInfoNavbar } from './styles';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Button from '../../atoms/Button';
import { PropTypes } from './types';

/**
 * 좋아요 여부에 따라 Star를 채우거나 비우게 렌더링
 *
 * @author jojo
 */
const BusInfoNavbar = ({ liked, toggleLikeHandler }: PropTypes) => {
  return (
    <StyledBusInfoNavbar>
      <BusInfoNavbarContainer>
        {liked ? (
          <AiFillStar color="yellow" size="24" onClick={toggleLikeHandler} />
        ) : (
          <AiOutlineStar color="yellow" size="24" onClick={toggleLikeHandler} />
        )}
        <Button isText>이미지로 노선 보기</Button>
      </BusInfoNavbarContainer>
    </StyledBusInfoNavbar>
  );
};

export default BusInfoNavbar;
