import React from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../../atoms/Button';
import {
  ButtonsWrapper,
  ModalBackground,
  StyledBusInfoImageModal,
} from './styles';
import { PropTypes } from './types';

const AskingBusTimeModal = ({
  clickCancelHandler,
  clickMorningHandler,
  clickEveningHandler,
}: PropTypes) => {
  return (
    <ModalBackground>
      <StyledBusInfoImageModal>
        <IoMdClose size={30} onClick={clickCancelHandler} />
        <ButtonsWrapper>
          <Button isText fontSize={1.5} clickHandler={clickMorningHandler}>
            출근 버스 보기
          </Button>
          <Button isText fontSize={1.5} clickHandler={clickEveningHandler}>
            퇴근 버스 보기
          </Button>
        </ButtonsWrapper>
      </StyledBusInfoImageModal>
    </ModalBackground>
  );
};

export default AskingBusTimeModal;
