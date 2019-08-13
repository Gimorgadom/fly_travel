import React, {PureComponent} from 'react';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';

class App extends PureComponent{

  render(){
    return (
      <div className="App">
        <Header />
        <Body />
      </div>
    );
  }
}

export default App;
