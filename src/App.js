import React, { Component } from 'react';
// import {FileUpload} from './FileUpload';

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

  createTable = () => {
    let table = [];
    var divStyle = {
      color: 'black'
    };
    const langs = this.state.languages;
    const translation = this.state.translation;
    Object.keys(translation).forEach(key =>
  {    if (translation[key]){
          table.push(<div key={key} id={key}>
            <div style={divStyle}>{translation[key][0][langs[0]]} </div>
            <div>{translation[key][0][langs[1]]} </div>
          </div>)
}}
    )
    return table;
  }

  render() {

    return (
      <div>
        <h2> File upload </h2>
          {this.createTable()}
      </div>

    );
  }
}

export default App;
