export interface PropTypes {
  busNum: number;
  previousBusStop: string;
  nextBusStop: string;
  clickRefreshHandler: () => void;
  clickPlusHandler: () => void;
  clickBusNumHandler: (direction: string) => void;
}
