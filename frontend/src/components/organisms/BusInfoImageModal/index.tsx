import React from 'react';
import { ModalBackground, StyledBusInfoImageModal } from './styles';
import { IoMdClose } from 'react-icons/io';
import Image from '../../atoms/Image';
import { PropTypes } from './types';

/**
 * 버스 정류장 정보 이미지를 모달에 렌더링
 *
 * @author jojo
 */
const BusInfoImageModal = ({
  busInfoImage,
  toggleBusInfoModalHandler,
}: PropTypes) => {
  return (
    <ModalBackground>
      <StyledBusInfoImageModal>
        <IoMdClose size={30} onClick={toggleBusInfoModalHandler} />
        <Image width="100%" src={busInfoImage} alt="busInfoModal" />
      </StyledBusInfoImageModal>
    </ModalBackground>
  );
};

export default BusInfoImageModal;
