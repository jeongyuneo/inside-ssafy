import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyledDriving, MainText, StyledButton, TitleText } from "./styles";

/**
 * navigation을 받아서 페이지 이동에 사용한다.
 * 운행종료 버튼을 클릭시 메인페이지로 이동한다.
 * route로 Main 페이지에서 props를 받는다.
 *
 * author jini
 */
const Driving = ({ navigation, route }) => {
  useEffect(() => {
    console.log(route.params.busInfo);
  }, []);

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
