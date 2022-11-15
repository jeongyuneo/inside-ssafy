import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputLabel from '../../molecules/InputLabel';
import Button from '../../atoms/Button';
import Navbar from '../../molecules/Navbar';
import Text from '../../atoms/Text';
import { StyledMyInfoEdit, ButtonsWrapper } from './styles';
import navigator from '../../../utils/navigator';
import patchPassword from './patchPassword';

const MyInfoEdit = () => {
  const [inputs, setInputs] = useState({
    password: '',
    newPassword: '',
    newPasswordAgain: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const clickEditBtnHandler = async () => {
    const { password, newPassword, newPasswordAgain } = inputs;
    if (newPassword === newPasswordAgain) {
      if (await patchPassword({ password, newPassword })) {
        setErrorMsg('');
        alert('비밀번호가 수정되었습니다');
        navigate('/');
      } else {
        setErrorMsg('비밀번호를 확인해주세요.');
      }
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  };

  const clickExitBtnHandler = () => {
    navigate(-1);
  };

  return (
    <StyledMyInfoEdit>
      <Navbar
        clickLogoHandler={navigator(navigate).main}
        clickMypageHandler={navigator(navigate).mypage}
      />
      <InputLabel
        id="password"
        name="password"
        labelValue="현재 비밀번호"
        type="password"
        width={20}
        height={3}
        inputs={inputs}
        changeHandler={e => changeHandler(e)}
      />

      <InputLabel
        id="newPassword"
        name="newPassword"
        labelValue="새 비밀번호"
        type="password"
        width={20}
        height={3}
        inputs={inputs}
        changeHandler={e => changeHandler(e)}
      />
      <InputLabel
        id="newPasswordAgain"
        name="newPasswordAgain"
        labelValue="새 비밀번호 확인"
        type="password"
        width={20}
        height={3}
        changeHandler={e => changeHandler(e)}
      />

      <Text color="red">{errorMsg}</Text>
      <ButtonsWrapper>
        <Button width={20} height={3} clickHandler={clickEditBtnHandler}>
          수정하기
        </Button>
        <Button width={20} height={3} clickHandler={clickExitBtnHandler}>
          나가기
        </Button>
      </ButtonsWrapper>
    </StyledMyInfoEdit>
  );
};

export default MyInfoEdit;
