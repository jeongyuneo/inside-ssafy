import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../atoms/Image';
import ButtonGroup from '../../molecules/ButtonGroup';
import CheckboxLabel from '../../molecules/CheckboxLabel';
import InputLabel from '../../molecules/InputLabel';
import requestLogin from './requestLogin';
import { StyledLogin, LoginPageWrapper, CheckboxLabelWrapper } from './styles';
import validateInput from './validateInput';

/**
 * Login page 컴포넌트
 *
 * @author jojo
 */
const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: 'abc@ab.ck',
    password: 'rkssdfsdf1@ ',
  });

  const result = useQuery(['login'], requestLogin);

  const clickLogin = () => {
    if (!validateInput(inputs)) {
      console.log('falsy');

      return;
    }
    console.log('true');
  };

  const clickJoin = () => {
    navigate('/join');
  };

  const buttonInfos = [
    {
      text: '로그인',
      clickHandler: clickLogin,
    },
    {
      text: '회원가입',
      clickHandler: clickJoin,
    },
  ];

  return (
    <StyledLogin>
      <LoginPageWrapper>
        <Image width={20} src="/images/iNSSA_logo.png" alt="logo" />
        <InputLabel
          id="email"
          name="email"
          labelValue="E-mail"
          placeholder="user@gmail.com"
          width={20}
          height={3}
        />
        <InputLabel
          id="password"
          name="password"
          labelValue="Password"
          placeholder="8자 이상 20자 이하로 입력하세요"
          width={20}
          height={3}
        />
        <CheckboxLabelWrapper>
          <CheckboxLabel text="로그인 유지" id="keepLogin" />
        </CheckboxLabelWrapper>
        <ButtonGroup buttonInfos={buttonInfos} width={20} height={3} isColumn />
      </LoginPageWrapper>
    </StyledLogin>
  );
};

export default Login;
