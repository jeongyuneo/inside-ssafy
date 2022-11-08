export interface PropTypes {
  busNum: number;
}

export interface BusInfoType {
  lastVisitedBusStop: number;
  busStops: string[];
  last: boolean;
  hasBusLike: boolean;
}

export interface BusInfoImageType {
  url: string;
}
