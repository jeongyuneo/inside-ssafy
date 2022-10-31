import React, { useState } from 'react';
import Button from '../../atoms/Button';
import InputLabel from '../../molecules/InputLabel';
import { StyledInputLabel } from './styles';
import { PropTypes } from './types';

const Join = ({ id }: PropTypes) => {
  const [account, setAccount] = useState({
    id: '',
    password: '',
    email: '',
  });
  const labelfont = 0.3;
  return (
    <StyledInputLabel>
      <InputLabel id={'id'} labelValue={'아이디'} labelFontSize={labelfont} />
      <InputLabel
        id={'password'}
        labelValue={'패스워드'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={'email'}
        labelValue={'이메일'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={'address'}
        labelValue={'주소'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={'std_num'}
        labelValue={'학번'}
        labelFontSize={labelfont}
      />
      <Button> 가입 </Button>
      <Button> 취소 </Button>
    </StyledInputLabel>
  );
};

export default Join;
