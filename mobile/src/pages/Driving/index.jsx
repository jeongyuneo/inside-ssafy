import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyledDriving, MainText, StyledButton, TitleText } from "./styles";

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
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    console.log(route.params.busInfo);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 20,
        },
        (loc) => {
          console.log(loc.coords.latitude);
          console.log(loc.coords.longitude);

          setCurrentLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
      );

      console.log("currentLocation", currentLocation);
    })();
  }, [currentLocation.latitude]);

  const movePage = () => {
    navigation.navigate("Main");
  };

  return (
    <StyledDriving>
      <MainText>
        운행중
        <FontAwesome5 name="bus-alt" size={100} color="#01a7eb" />
      </MainText>
      <StyledButton onPress={() => movePage()}>
        <TitleText>운행종료</TitleText>
      </StyledButton>
    </StyledDriving>
  );
};

export default Driving;
