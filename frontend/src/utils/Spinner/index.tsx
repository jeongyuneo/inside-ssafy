import React from 'react';
import Image from '../../components/atoms/Image';
import { StyledSpinner } from './styles';

const Spinner = () => {
  return (
    <StyledSpinner>
      <Image
        width="10rem"
        height="10rem"
        src="/images/Spinner.gif"
        alt="loading..."
      />
    </StyledSpinner>
  );
};

export default Spinner;
