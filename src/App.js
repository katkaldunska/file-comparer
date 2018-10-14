import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Cells from './Cells/Cells';
import FileUploader from './FileUploader/FileUploader';
import CleanButton from './FileUploader/CleanButton';
import './App.css';

class App extends Component {
  state = {
    translation: {},
    languages: [],
    error: false,
    errorMessage: ''
  };

  callApi = () => {
    return fetch('http://localhost:5000/defaultFiles')
    .then(response => response.json());
  };

  uploadDefaultFiles = () => {
    this.setState({ error: false });
    this.callApi()
      .then(res => {
        if (res.files && res.files.length !== 2) {
          this.setState({
            error: true,
            errorMessage: `Na serwerze znajduje się liczba plików inna niż 2: ${res.files.length}`
          });
        } else if (!!res.translation) {
          this.setState({ translation: res.translation });
          this.setState({ languages: res.files });
        } else {
          this.setState({
            error: true,
            errorMessage: 'Uszkodzone pliki na serwerze'
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <FileUploader/>
        <Button bsstyle='link' onClick={() => { this.uploadDefaultFiles() }}>
          Załaduj pliki
        </Button>
        <CleanButton/>
        { Object.keys(this.state.translation).length > 0 &&
          <section>
            <Alert bsstyle='info'>
              Nazwy etykiet edytuj w tabeli. Takie same etykiety dla obu języków, bądź puste, są zaznaczone na czerwono
            </Alert>
            <Cells translation = {this.state.translation} languages = {this.state.languages}/>
          </section>
        }
        { this.state.error &&
          <Alert bsstyle='danger'>
            { this.state.errorMessage }
          </Alert>
        }
      </div>
    );
  }
}
;
export default App;
