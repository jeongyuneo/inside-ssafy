import { NavigateFunction } from 'react-router-dom';

export interface PropTypes {
  name: string;
  studentNumber: string;
  clickEditBtnHandler: () => void;
  clickLogoutHandler: () => void;
}
