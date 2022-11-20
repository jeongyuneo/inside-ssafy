import { NavigateFunction } from 'react-router-dom';

/**
 * 라우터 이동 함수들을 모아 놓은 유틸 함수
 *
 * @example navigator(navigate).main
 *
 * @author jojo
 */

interface ParamType {
  state: {
    busNum?: number;
  };
}
const navigator = (navigate: NavigateFunction, param?: ParamType) => {
  return {
    main: () => {
      navigate('/', param);
    },
    busInfo: () => {
      navigate('/businfo', param);
    },
    mypage: () => {
      navigate('/mypage', param);
    },
    myInfoEdit: () => {
      navigate('/myinfoedit', param);
    },
    back: () => {
      navigate(-1);
    },
    board: () => {
      navigate('/board', param);
    },
  };
};

export default navigator;
