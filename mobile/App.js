import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

const App = () => {
  const busNumber = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.container}>
      {busNumber.map((num) => (
        <TouchableOpacity key={num} onPress={() => Alert.alert(`${num}호차`)} style={styles.button}>
          <Text style={{ fontSize: 100, color: '#fff' }}>{num}</Text>
        </TouchableOpacity>
      ))}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: 150,
    height: 200,
    backgroundColor: '#01A7EB',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
