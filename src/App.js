import React, { Component } from 'react';
import Cells from './Cells/Cells';

class App extends Component {
  state = {
    translation: {},
    languages: [],
  };

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({ translation: res.translation })
        this.setState({ languages: res.files })
      })
      .catch(err => console.log(err));
  }

  callApi = () => {
    return fetch('http://localhost:5000/api/hello')
    .then(response => response.json());
  };

  render() {
    if(!this.state.languages.length)
                return null;
    return (
      <div>
        <h2> File upload </h2>
        <Cells translation = {this.state.translation} languages = {this.state.languages}/>
      </div>
    );
  }
}

export default App;
