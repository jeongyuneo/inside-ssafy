import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/Button';
import ButtonGroup from '../../molecules/ButtonGroup';
import InputLabel from '../../molecules/InputLabel';
import { StyledInputLabel, StyledbuttonGroup } from './styles';

const Join = () => {
  const input_names = ['userId', 'studentNum', 'userPw', 'email'];
  const textTypes = ['text', 'text', 'text', 'password'];

  const [account, setAccount] = useState({
    userId: '',
    studentNum: '',
    email: '',
    userPw: '',
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

  const navigate = useNavigate();

  // onChange Event함수
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

  const clickJoin = () => {
    console.log(account);
  };

  const backToTheLogin = () => {
    navigate(-1);
  };

  const LABEL_FONT = 0.3;
  const TIMER_TIME = 300;
  const placeholder = [
    '이름을 입력하세요',
    '학번을 입력하세요',
    'user@gmail.com',
    '8자 이상 20자 이하로 입력하세요',
  ];

  const buttonInfos = [
    {
      text: '회원가입',
      clickHandler: clickJoin,
    },
    {
      text: '나가기',
      clickHandler: backToTheLogin,
    },
  ];

  return (
    <StyledInputLabel>
      <InputLabel
        id={input_names[0]}
        name={input_names[0]}
        inputs={account}
        changeHandler={changeInfo}
        labelValue={'아이디'}
        labelFontSize={LABEL_FONT}
        placeholder={placeholder[0]}
      />
      <InputLabel
        id={input_names[1]}
        name={input_names[1]}
        inputs={account}
        changeHandler={changeInfo}
        labelValue={'학번'}
        labelFontSize={LABEL_FONT}
        placeholder={placeholder[1]}
      />
      <Button>클릭</Button>
      <InputLabel
        id={input_names[2]}
        name={input_names[2]}
        inputs={account}
        changeHandler={changeInfo}
        labelValue={'이메일'}
        labelFontSize={LABEL_FONT}
        placeholder={placeholder[2]}
      />
      <Button>일치확인</Button>
      <InputLabel
        id={input_names[3]}
        name={input_names[3]}
        inputs={account}
        changeHandler={changeInfo}
        type={'password'}
        labelValue={'패스워드'}
        labelFontSize={LABEL_FONT}
        placeholder={placeholder[3]}
      />
      <StyledbuttonGroup>
        <ButtonGroup buttonInfos={buttonInfos} width={20} height={3} isColumn />
      </StyledbuttonGroup>
    </StyledInputLabel>
  );
};

export default Join;
