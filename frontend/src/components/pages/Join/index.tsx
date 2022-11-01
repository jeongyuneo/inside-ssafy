import React, { useState } from 'react';
import Button from '../../atoms/Button';
import InputLabel from '../../molecules/InputLabel';
import { StyledInputLabel, StyledbuttonGroup } from './styles';
import { PropTypes } from './types';

const Join = ({ id }: PropTypes) => {
  const index = ['id', 'password', 'email', 'address', 'studentNumber'];
  const [account, setAccount] = useState({
    id: '',
    password: '',
    email: '',
    address: '',
    studentNumber: '',
  });

  const changeInfo = (value: string, name: string) => {
    console.log(name + ' , ' + value);
    setAccount({ ...account, [name]: [value] });
  };

  const [btnInfo, setBtnInfo] = useState([
    {
      text: '가입',
      clickHandler: () => {
        console.log('가입 버튼을 클릭');
      },
    },
    {
      text: '취소',
      clickHandler: () => {
        console.log('취소 버튼을 클릭');
      },
    },
  ]);

  const labelfont = 0.3;
  return (
    <StyledInputLabel>
      <InputLabel id={'id'} labelValue={'아이디'} labelFontSize={labelfont} />
      <InputLabel
        id={'password'}
        index={'password'}
        value={account['password']}
        changeHandler={changeInfo}
        type={'password'}
        labelValue={'패스워드'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={'email'}
        value={account.email}
        changeHandler={changeInfo}
        labelValue={'이메일'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={'address'}
        changeHandler={changeInfo}
        labelValue={'주소'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={'std_num'}
        changeHandler={changeInfo}
        labelValue={'학번'}
        labelFontSize={labelfont}
      />
      <StyledbuttonGroup>
        {btnInfo.map((info, index) => {
          return <Button key={info.text + index}>{info.text}</Button>;
        })}
      </StyledbuttonGroup>
    </StyledInputLabel>
  );
};

export default Join;
