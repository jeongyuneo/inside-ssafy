import { NavigateFunction } from 'react-router-dom';

/**
 * 라우터 이동 함수들을 모아 놓은 유틸 함수
 *
 * @example navigator(navigate).main
 *
 * @author jojo
 */
const navigator = (navigate: NavigateFunction) => {
  return {
    main: () => {
      navigate('/');
    },
    busInfo: () => {
      navigate('/businfo');
    },
    mypage: () => {
      navigate('mypage');
    },
  };
};

export default navigator;
