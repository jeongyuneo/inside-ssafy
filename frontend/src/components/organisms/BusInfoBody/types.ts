import { PropTypes as BusLinePropTypes } from '../../molecules/BusLine/types';

export interface PropTypes extends BusLinePropTypes {
  clickRefreshHandler: () => void;
}
