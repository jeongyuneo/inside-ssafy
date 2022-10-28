import React from 'react';
import InputLabel from './components/molecules/InputLabel';

function App() {
  return (
    <div className="App">
      <InputLabel
        id="name"
        width={20}
        height={2}
        borderRadius={0.3}
        labelFontSize={0.5}
        inputFontSize={0.8}
        paddingLeft={0.5}
      >
        테스트라벨
      </InputLabel>
    </div>
  );
}

export default App;
