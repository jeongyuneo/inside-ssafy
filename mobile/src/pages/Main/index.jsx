import { StatusBar } from "expo-status-bar";
import { StyledMain, StyledButton, StyledText } from "./styles";
import { Alert } from "react-native";

/**
 * navigation을 이용하여 페이지 이동을 한다.
 * 호차를 선택 후 예를 선택하면 Driving 페이지로 이동한다.
 * 유저가 선택한 버스 번호로 버스 노선 정보를 받아온 후 Driving 페이지로 전달한다.
 *
 * author jini
 */
const Main = ({ navigation }) => {
  const busNumber = [1, 2, 3, 4, 5, 6];

  const getBusLine = async (busNumber) => {
    try {
      const res = await fetch(
        `https://inside-ssafy.com/api/v1/buses/start?number=${busNumber}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const getBusInfoAndMovePage = async (busNum) => {
    const busLine = await getBusLine(busNum);
    navigation.navigate("Driving", { busLine, busNum });
  };

  const showAlert = (num) => {
    return Alert.alert(
      `${num}호차`,
      "운행시작",
      [
        {
          text: "아니요",
          onPress: () => console.log("아니요를 선택하셨습니다."),
        },
        {
          text: "예",
          onPress: () => getBusInfoAndMovePage(num),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <StyledMain>
      {busNumber.map((num) => (
        <StyledButton key={num} onPress={() => showAlert(num)}>
          <StyledText>{num}</StyledText>
        </StyledButton>
      ))}
      <StatusBar style="auto" />
    </StyledMain>
  );
};

export default Main;
