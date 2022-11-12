export interface PropTypes {
  busNum: number;
  previousBusStop: string;
  nextBusStop: string;
  errorMessage?: string;
  busLikes?: number[];
  clickRefreshHandler: () => void;
  clickPlusHandler: () => void;
  clickBusNumHandler: (direction: string) => void;
}
