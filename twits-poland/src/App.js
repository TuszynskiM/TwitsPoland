import React, {Component} from 'react';
import './App.css';
import Gallery from './Gallery';
import Header from './Header';


class App extends Component {
  state = {
    twitterImgLinks: []
  };

  componentDidMount() {
    fetch("http://localhost:3001/")
      .then(res => {
        return res.json();
      })
      .then(data => {
         return this.setState({ twitterImgLinks: data})
      });
  }

  render() {
    return ( 
    <React.Fragment >
      <Header/>
      <Gallery twitterImgLinks = {this.state.twitterImgLinks}/> 
    </React.Fragment>
    );
  }
}

export default App;