import React from 'react';
import './App.css';
import Cart from './Component/Cart';

class App extends React.Component {
  state = {
     lat: 49.2363,
     lon: 28.4498,
    errorMessage: "" }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ 
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }),
      (err) => this.setState({ errorMessage: err.message })
    );
    
  }

  
render () {
  return (
    <>
    <Cart coords = {this.state}/>
    </>
  );
}

}

export default App;
