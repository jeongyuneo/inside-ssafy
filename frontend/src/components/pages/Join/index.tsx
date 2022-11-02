import React, { ChangeEvent, useState } from 'react';
import Button from '../../atoms/Button';
import InputLabel from '../../molecules/InputLabel';
import { StyledInputLabel, StyledbuttonGroup } from './styles';
import { PropTypes } from './types';

const Join = () => {
  const input_names = ['userId', 'userPw', 'email', 'address', 'studentNum'];
  const textTypes = ['text', 'password', 'text', 'text', 'text'];
  const [account, setAccount] = useState({
    userId: '',
    userPw: '',
    email: '',
    address: '',
    studentNum: '',
  });

  const [inputCss, setInputCss] = useState([
    {
      width: 10,
      height: 2,
      type: textTypes[0],
      inputTextColor: 'black',
    },
    {
      width: 10,
      height: 2,
      type: textTypes[1],
      inputTextColor: 'black',
    },
    {
      width: 10,
      height: 2,
      type: textTypes[2],
      inputTextColor: 'black',
    },
    {
      width: 10,
      height: 2,
      type: textTypes[3],
      inputTextColor: 'black',
    },
    {
      width: 10,
      height: 2,
      type: textTypes[4],
      inputTextColor: 'black',
    },
  ]);

  const changeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name + ' , ' + e.target.value);
    setAccount(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    console.log(account);
  };

  const showAccount = () => {
    console.log(account);
  };

  const labelfont = 0.3;
  return (
    <StyledInputLabel>
      <InputLabel
        id={input_names[0]}
        name={input_names[0]}
        inputs={account}
        changeHandler={changeInfo}
        labelValue={'아이디'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={input_names[1]}
        name={input_names[1]}
        inputs={account}
        changeHandler={changeInfo}
        type={'password'}
        labelValue={'패스워드'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={input_names[2]}
        name={input_names[2]}
        inputs={account}
        changeHandler={changeInfo}
        labelValue={'이메일'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={input_names[3]}
        name={input_names[3]}
        inputs={account}
        changeHandler={changeInfo}
        labelValue={'주소'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={input_names[4]}
        name={input_names[4]}
        inputs={account}
        changeHandler={changeInfo}
        labelValue={'학번'}
        labelFontSize={labelfont}
      />
      <StyledbuttonGroup>
        <Button clickHandler={showAccount}>가입</Button>
        <Button clickHandler={showAccount}>취소</Button>
      </StyledbuttonGroup>
    </StyledInputLabel>
  );
};

export default Join;
