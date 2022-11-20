import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  StyledDriving,
  MainText,
  StyledButton,
  TitleText,
  Paragraph,
} from "./styles";

/**
 * navigation을 받아서 페이지 이동에 사용한다.
 * 운행종료 버튼을 클릭시 메인페이지로 이동한다.
 * route로 Main 페이지에서 props를 받는다.
 * Location.requestForegroundPermissionsAsync()를 통해서
 * 유저의 위치 권한 허용 여부를 묻는다.
 * Location.watchPositionAsync()를 통해서 좌표의 변화를 감지한다.
 *
 * author jini
 */
const Driving = ({ navigation, route }) => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 36.355327727196915,
    longitude: 127.29848167977559,
  });
  const busNumber = route.params.busNum;
  const [errorMsg, setErrorMsg] = useState(null);
  const [busLine, setBusLine] = useState([]);
  const [distance, setDistance] = useState(100000000);
  const [busIdx, setBusIdx] = useState(0);
  const [currentRouteId, setCurrentRouteId] = useState(0);
  const [refreshStatus, setRefreshStatus] = useState(0);

  // 유저의 현재 좌표와 목적지까지의 거리 요청
  const getDistance = async (address, coordinate) => {
    if (!address) return;
    try {
      const res = await fetch(
        `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}&coordinate=${coordinate}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-NCP-APIGW-API-KEY-ID": "0bjwb04qag",
            "X-NCP-APIGW-API-KEY": "y9lQ5yVHnNgjtvqYckY2uG2LI8RgaSW7MaEv0T6I",
          },
        }
      ).then((res) => res.json());
      setDistance(res.addresses[0].distance);
      return res.addresses[0].distance;
    } catch (e) {
      console.error(e);
    }
  };

  // 버스가 해당 목적지에 도착했을 때 버스 위치 최신화
  const refreshBusLocation = async (routeId) => {
    try {
      await fetch(`https://inside-ssafy.com/api/v1/buses/arrive/${routeId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log("버스 위치 최신화", res.status);
        setCurrentRouteId(routeId);
        setRefreshStatus(res.status);
        return res.status;
      });
    } catch (e) {
      console.log(e);
    }
    setRefreshStatus(0);
  };

  // 버스가 운행 종료시 운행 종료 요청
  const patchDrivingDone = async (busNumber) => {
    const data = { number: busNumber };
    try {
      await fetch(`https://www.inside-ssafy.com/api/v1/buses/end`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        console.log("버스 운행 종료", res.status);
        return res.status;
      });
    } catch (e) {
      console.log(e);
    }
  };

  const DrivingDoneAndMovePage = () => {
    patchDrivingDone(busNumber);
    alert("운행이 종료되었습니다.");
    navigation.navigate("Main");
  };

  useEffect(() => {
    setBusLine(route.params.busLine);
    const busLineLength = busLine.length;

    if (busLine[busLineLength - 1]?.routeId === currentRouteId) {
      DrivingDoneAndMovePage();
    }

    (async () => {
      // 유저에게 위치 권한 허용 여부 묻기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // 유저의 실시간 좌표 정보 받아오기
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 10,
        },
        (loc) => {
          setCurrentLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
      );

      // 도착지와 유저의 거리 받기
      getDistance(
        busLine[busIdx]?.address,
        `${currentLocation.longitude},${currentLocation.latitude}`
      );

      if (distance <= 50) {
        refreshBusLocation(busLine[busIdx].routeId);
        setBusIdx((prev) => prev + 1);
      }

      console.log("거리", distance);
    })();
  }, [currentLocation.latitude]);

  return (
    <StyledDriving>
      <MainText>
        운행중
        <FontAwesome5 name="bus-alt" size={50} color="#01a7eb" />
      </MainText>
      <Paragraph>{`거리 = ${distance}`}</Paragraph>
      <Paragraph>{`주소 = ${busLine[busIdx]?.address}`}</Paragraph>
      {refreshStatus === 200 ? (
        <Paragraph>{`${busIdx + 1}번째 목적지에 도착했습니다`}</Paragraph>
      ) : (
        ""
      )}
      <StyledButton onPress={() => DrivingDoneAndMovePage()}>
        <TitleText>운행종료</TitleText>
      </StyledButton>
    </StyledDriving>
  );
};
export default Driving;
