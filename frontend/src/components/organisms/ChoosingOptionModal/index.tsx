import React from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../../atoms/Button';
import {
  ButtonsWrapper,
  ModalBackground,
  StyledBusInfoImageModal,
} from './styles';
import { PropTypes } from './types';

const ChoosingOptionModal = ({
  firstOption,
  secondOption,
  clickCancelHandler,
  clickFirstOptionHandler,
  clickSecondOptionHandler,
}: PropTypes) => {
  return (
    <ModalBackground>
      <StyledBusInfoImageModal>
        <IoMdClose size={30} onClick={clickCancelHandler} />
        <ButtonsWrapper>
          <Button isText fontSize={1.5} clickHandler={clickFirstOptionHandler}>
            {firstOption}
          </Button>
          <Button isText fontSize={1.5} clickHandler={clickSecondOptionHandler}>
            {secondOption}
          </Button>
        </ButtonsWrapper>
      </StyledBusInfoImageModal>
    </ModalBackground>
  );
};

export default ChoosingOptionModal;
