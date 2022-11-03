import { StatusBar } from "expo-status-bar";
import { StyledMain, StyledButton, StyledText } from "./styles";
import { Alert } from "react-native";

/**
 * navigation을 이용하여 페이지 이동을 한다.
 * 호차를 선택 후 예를 선택하면 Driving 페이지로 이동한다.
 * 유저가 선택한 버스 번호로 버스 노선 정보를 받아온 후 Driving 페이지로 전달한다.
 * 현재는 busInfo 라는 정적 데이터를 넣어놓은 상태
 *
 * author jini
 */
const Main = ({ navigation }) => {
  const busNumber = [1, 2, 3, 4, 5, 6];
  const busInfo = [
    {
      routeId: 1,
      name: "대전 유성구 동서대로 98-39",
    },
    {
      routeId: 2,
      name: "대전 유성구 덕명동 601-10",
    },
  ];

  const movePage = () => {
    navigation.navigate("Driving", { busInfo });
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
          onPress: () => movePage(),
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
