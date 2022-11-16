import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import ButtonGroup from '../../molecules/ButtonGroup';
import CheckboxLabel from '../../molecules/CheckboxLabel';
import InputLabel from '../../molecules/InputLabel';
import { getSavedEmail, saveEmail } from './saveEmail';
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
  const [validated, setValidated] = useState(true);
  const [checked, setChecked] = useState(!!getSavedEmail());
  const [inputs, setInputs] = useState({
    email: getSavedEmail(),
    password: '',
  });
  const navigate = useNavigate();

  const clickLogin = async () => {
    if (!validateInput(inputs)) {
      setValidated(false);
      return;
    }

    const isLoggedIn = await requestLogin(inputs);

    if (isLoggedIn) {
      localStorage.setItem('isLogin', 'true');
      setValidated(true);
      saveEmail({ checked, email: inputs['email'] });
      window.alert('로그인 성공!');
      navigate('/');
    } else {
      setValidated(false);
    }
  };

  const clickJoin = () => {
    navigate('/join');
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const toggleHandler = () => {
    setChecked(prev => !prev);
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
        <LogoInputsWrapper>
          <Image
            width="20rem"
            height="20rem"
            src="/images/iNSSA_logo.png"
            alt="logo"
          />
          <InputLabel
            id="email"
            name="email"
            labelValue="이메일"
            placeholder="E-mail"
            type="email"
            width={20}
            height={3}
            inputs={inputs}
            changeHandler={e => changeHandler(e)}
          />
          <InputLabel
            id="password"
            name="password"
            labelValue="비밀번호"
            placeholder="Password"
            type="password"
            width={20}
            height={3}
            inputs={inputs}
            changeHandler={e => changeHandler(e)}
          />
        </LogoInputsWrapper>
        <CheckboxButtonsWrapper>
          <CheckboxLabelWrapper>
            <CheckboxLabel
              text="이메일 저장"
              id="saveEmail"
              checked={checked}
              toggleHandler={toggleHandler}
            />
          </CheckboxLabelWrapper>
          {!validated && (
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
