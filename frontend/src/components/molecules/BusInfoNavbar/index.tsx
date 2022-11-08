import React from 'react';
import {
  BusInfoNavbarContainer,
  ButtonWrapper,
  StyledBusInfoNavbar,
} from './styles';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Button from '../../atoms/Button';
import { PropTypes } from './types';

/**
 * 좋아요 여부에 따라 Star를 채우거나 비우게 렌더링
 *
 * @author jojo
 */
const BusInfoNavbar = ({
  liked,
  toggleLikeHandler,
  toggleBusInfoModalHandler,
}: PropTypes) => {
  return (
    <StyledBusInfoNavbar>
      <BusInfoNavbarContainer>
        <ButtonWrapper>
          <Button isText clickHandler={toggleBusInfoModalHandler}>
            노선보기
          </Button>
        </ButtonWrapper>
        <Button isText onClick={toggleLikeHandler}>
          {liked ? (
            <AiFillStar color="#EBB517" size="30" onClick={toggleLikeHandler} />
          ) : (
            <AiOutlineStar
              color="#EBB517"
              size="30"
              onClick={toggleLikeHandler}
            />
          )}
        </Button>
      </BusInfoNavbarContainer>
    </StyledBusInfoNavbar>
  );
};

export default BusInfoNavbar;
