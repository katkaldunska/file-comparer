import React  from 'react';
import request from 'superagent';
import { Button } from 'react-bootstrap';

export default class CleanButton extends React.Component {

  deleteUploadedFiles = () => {
    const req = request.delete('http://localhost:5000/uploads/files');
    req.send(true);
    req.end();
  }

  render() {
    return (
        <Button bsstyle='link' onClick={() => { this.deleteUploadedFiles() }}>
          Usuń z serwera pliki
        </Button>
    );
  }
}
