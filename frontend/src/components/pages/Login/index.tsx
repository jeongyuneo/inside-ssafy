import { useQuery } from '@tanstack/react-query';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import ButtonGroup from '../../molecules/ButtonGroup';
import CheckboxLabel from '../../molecules/CheckboxLabel';
import InputLabel from '../../molecules/InputLabel';
import requestLogin from './requestLogin';
import {
  StyledLogin,
  LoginPageWrapper,
  CheckboxLabelWrapper,
  LogoInputsWrapper,
  CheckboxButtonsWrapper,
} from './styles';
import validateInput from './validateInput';

/**
 * Login page 컴포넌트
 *
 * @author jojo
 */
const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [isValidated, setIsValidated] = useState(true);

  // useQuery 말고 그냥 함수 호출로 바꾸고 함수 내에서 토큰 처리
  const { data } = useQuery(['login', inputs], () => requestLogin(inputs));

  const clickLogin = () => {
    if (!validateInput(inputs)) {
      setIsValidated(false);
      return;
    }

    if (!data?.accessToken) {
      setIsValidated(false);
      return;
    }

    setIsValidated(true);
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

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <StyledLogin>
      <LoginPageWrapper>
        <LogoInputsWrapper>
          <Image
            width={20}
            height={20}
            src="/images/iNSSA_logo.png"
            alt="logo"
          />
          <InputLabel
            id="email"
            name="email"
            labelValue="E-mail"
            placeholder="user@gmail.com"
            width={20}
            height={3}
            inputs={inputs}
            changeHandler={e => changeHandler(e)}
          />
          <InputLabel
            id="password"
            name="password"
            labelValue="Password"
            placeholder="8자 이상 20자 이하로 입력하세요"
            width={20}
            height={3}
            inputs={inputs}
            changeHandler={e => changeHandler(e)}
          />
        </LogoInputsWrapper>
        <CheckboxButtonsWrapper>
          <CheckboxLabelWrapper>
            <CheckboxLabel text="로그인 유지" id="keepLogin" />
          </CheckboxLabelWrapper>
          {!isValidated && (
            <Text color="red">이메일, 비밀번호를 확인해주세요.</Text>
          )}
          <ButtonGroup
            buttonInfos={buttonInfos}
            width={20}
            height={3}
            isColumn
          />
        </CheckboxButtonsWrapper>
      </LoginPageWrapper>
    </StyledLogin>
  );
};

export default Login;
