import { SelectChangeEvent } from '@mui/material';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/Button';
import SelectForm from '../../atoms/SelectForm';
import Text from '../../atoms/Text';
import ButtonGroup from '../../molecules/ButtonGroup';
import InputLabel from '../../molecules/InputLabel';
import {
  CAMPUS,
  INPUT_NAMES,
  LABEL_NAMES,
  LABEL_FONT_SIZE,
  PLACEHOLDER,
  TEXT_TYPES,
  TOKEN_TIMER,
} from './joinItems';
import {
  joinRequest,
  requestEmailToken,
  validateEmailToken,
} from './requestEmail';
import {
  StyledJoin,
  StyledButtonGroup,
  StyledEmailWrapper,
  ButtonWrapper,
  TextWrapper,
  JoinPageWrapper,
  InputLabelWrapper,
  TextNavigateWrapper,
  ValidateEmailWrapper,
  SelectFormWrapper,
} from './styles';
import { checkEmail, validateEmail, validateInput } from './validateInput';

/**
 * Join page 컴포넌트
 *
 * @author jun
 */

const Join = () => {
  const [isInterval, setIsInterval] = useState(false);
  const [isCertificateButtonDisabled, setIsCertificateButtonDisabled] =
    useState(true);
  const [isEmailCertificated, setIsEmailCertificated] = useState(false);
  const [timerName, setTimerName] = useState('');
  const [sendCertificateButtonName, setSendCertificateButtonName] =
    useState('인증 보내기');
  const [joinMessage, setJoinMessage] = useState({
    color: 'green',
    message: '',
  });
  const [emailMessage, setEmailMessage] = useState({
    message: '',
    color: 'green',
  });
  const [certificateMessage, setCertificateMessage] = useState({
    message: '',
    color: 'green',
  });
  const [account, setAccount] = useState({
    name: '',
    studentNumber: '',
    email: '',
    validationToken: '',
    emailAgain: '',
    password: '',
    passwordAgain: '',
    campus: '',
  });

  const navigate = useNavigate();

  const time = useRef(0);
  const timer = useRef<any>(null);

  const changeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const selectInfo = (e: SelectChangeEvent<string>) => {
    setAccount(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const checkCertificateTimer = () => {
    if (Math.floor((Date.now() - time.current) / 1000) > TOKEN_TIMER) {
      alert('인증이 만료되었습니다.');
      initToken();
      time.current = 0;
      setIsInterval(false);
      clearInterval(timer.current);
      return;
    }
    const timesub =
      TOKEN_TIMER - Math.floor((Date.now() - time.current) / 1000);
    setTimerName(`
      ${Math.floor(timesub / 60)}
        :
        ${timesub % 60 < 10 ? '0' + (timesub % 60) : timesub % 60}`);
  };

  const initToken = () => {
    if (isEmailCertificated) {
      return;
    }
    setTimerName('');
    setIsCertificateButtonDisabled(true); // 이메일 클릭 초기화
    setSendCertificateButtonName('인증 보내기');
  };

  // 인증을 보낸다.
  const sendCertificateMessage = async () => {
    const isValidated = validateEmail(account);
    if (!isValidated.status) {
      setEmailMessage(prev => {
        return {
          ...prev,
          message: isValidated.message,
          color: 'red',
        };
      });
      return;
    }
    const getToken = await requestEmailToken(account);
    if (getToken.status) {
      setEmailMessage(prev => {
        return {
          ...prev,
          message: getToken.message,
          color: 'green',
        };
      });
      setIsCertificateButtonDisabled(false);
      setIsEmailCertificated(false);
      setSendCertificateButtonName('인증 재전송');
      setAccount(prev => {
        return {
          ...prev,
          validationToken: '',
          emailAgain: prev.email,
        };
      });
      time.current = Date.now();
      const timesub =
        TOKEN_TIMER + Math.floor((Date.now() - time.current) / 1000);
      if (!isInterval) {
        timer.current = setInterval(checkCertificateTimer, 1000);
        setIsInterval(true);
      }
      setTimerName(`
      ${Math.floor(timesub / 60)}
        :
        ${timesub % 60 < 10 ? '0' + (timesub % 60) : timesub % 60}`);
    } else {
      setEmailMessage(prev => {
        return {
          ...prev,
          message: getToken.message,
          color: 'red',
        };
      });
      initToken();
      time.current = 0;
      setIsInterval(false);
      clearInterval(timer.current);
    }
  };

  const getCertificate = async () => {
    if (!checkEmail(account)) {
      return;
    }
    const isValidated = await validateEmailToken(account);
    if (!isValidated.status) {
      setCertificateMessage(prev => {
        return {
          ...prev,
          color: 'red',
          message: isValidated.message,
        };
      });
      return;
    }
    setCertificateMessage(prev => {
      return {
        ...prev,
        color: 'green',
        message: isValidated.message,
      };
    });
    setIsInterval(false);
    clearInterval(timer.current);
    setIsEmailCertificated(true);
    initToken();
  };

  const backToLogin = () => {
    navigate('/login');
  };

  const clickJoin = async () => {
    const returnJoinData = validateInput(account, isEmailCertificated);
    if (!returnJoinData.status) {
      setJoinMessage(prev => {
        return {
          ...prev,
          message: returnJoinData.message,
          color: 'red',
        };
      });
      return;
    }
    const isJoined = await joinRequest(account);
    if (!isJoined) {
      return;
    }
    backToLogin();
  };

  const buttonInfos = [
    {
      text: '회원가입',
      clickHandler: clickJoin,
    },
    {
      text: '나가기',
      clickHandler: backToLogin,
    },
  ];

  return (
    <StyledJoin>
      <JoinPageWrapper>
        <InputLabelWrapper>
          {INPUT_NAMES.map((inputName, index) => {
            switch (index) {
              case 1:
                return (
                  <ValidateEmailWrapper key={inputName}>
                    <StyledEmailWrapper>
                      <InputLabel
                        id={inputName}
                        name={inputName}
                        labelValue={LABEL_NAMES[index]}
                        inputs={account}
                        width={13}
                        height={3}
                        type={TEXT_TYPES[index]}
                        placeholder={PLACEHOLDER[index]}
                        labelFontSize={LABEL_FONT_SIZE}
                        changeHandler={changeInfo}
                      />
                      <SelectFormWrapper>
                        <SelectForm
                          labelName="캠퍼스"
                          inputs={CAMPUS}
                          id={'campus'}
                          value={account}
                          changeHandler={selectInfo}
                        ></SelectForm>
                      </SelectFormWrapper>
                    </StyledEmailWrapper>
                  </ValidateEmailWrapper>
                );
              case 2:
                return (
                  <ValidateEmailWrapper key={inputName}>
                    <StyledEmailWrapper>
                      <InputLabel
                        id={inputName}
                        name={inputName}
                        labelValue={LABEL_NAMES[index]}
                        inputs={account}
                        width={13}
                        height={3}
                        type={TEXT_TYPES[index]}
                        placeholder={PLACEHOLDER[index]}
                        labelFontSize={LABEL_FONT_SIZE}
                        changeHandler={changeInfo}
                      />
                      <ButtonWrapper>
                        <Button
                          clickHandler={sendCertificateMessage}
                          width={6}
                          height={3}
                        >
                          {sendCertificateButtonName}
                        </Button>
                      </ButtonWrapper>
                    </StyledEmailWrapper>
                    <TextNavigateWrapper>
                      <Text color={emailMessage.color} size={0.5}>
                        {emailMessage.message}
                      </Text>
                    </TextNavigateWrapper>
                  </ValidateEmailWrapper>
                );
              case 3:
                return (
                  <ValidateEmailWrapper key={inputName}>
                    <StyledEmailWrapper>
                      <InputLabel
                        id={inputName}
                        name={inputName}
                        labelValue={LABEL_NAMES[index]}
                        inputs={account}
                        width={13}
                        height={3}
                        type={TEXT_TYPES[index]}
                        placeholder={PLACEHOLDER[index]}
                        disabled={isEmailCertificated}
                        labelFontSize={LABEL_FONT_SIZE}
                        changeHandler={changeInfo}
                      />
                      <TextWrapper>
                        <Text size={1} color={'blue'}>
                          {timerName}
                        </Text>
                      </TextWrapper>
                      <ButtonWrapper>
                        <Button
                          clickHandler={getCertificate}
                          disabled={isCertificateButtonDisabled}
                          width={6}
                          height={3}
                        >
                          인증하기
                        </Button>
                      </ButtonWrapper>
                    </StyledEmailWrapper>
                    <TextNavigateWrapper>
                      <Text color={certificateMessage.color} size={0.5}>
                        {certificateMessage.message}
                      </Text>
                    </TextNavigateWrapper>
                  </ValidateEmailWrapper>
                );
              default:
                return (
                  <InputLabel
                    key={inputName}
                    id={inputName}
                    name={inputName}
                    labelValue={LABEL_NAMES[index]}
                    inputs={account}
                    width={20}
                    height={3}
                    type={TEXT_TYPES[index]}
                    placeholder={PLACEHOLDER[index]}
                    labelFontSize={LABEL_FONT_SIZE}
                    changeHandler={changeInfo}
                  />
                );
            }
          })}
        </InputLabelWrapper>
        <StyledButtonGroup>
          <TextNavigateWrapper>
            <Text color={joinMessage.color} size={1}>
              {joinMessage.message}
            </Text>
          </TextNavigateWrapper>

          <ButtonGroup
            buttonInfos={buttonInfos}
            width={20}
            height={3}
            isColumn
          />
        </StyledButtonGroup>
      </JoinPageWrapper>
    </StyledJoin>
  );
};

export default Join;
