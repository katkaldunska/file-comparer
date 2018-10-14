import React  from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

export default class FileUploader extends React.Component {
  constructor() {
    super();
    this.state = { files: [] };
  }

  onDrop(files) {
    files.forEach((file) => {
      const req = request.post('http://localhost:5000/uploads/files');
      req.attach('jsonFile', file);
      req.end((err) => console.log(err), (data) => console.log(data));
    })

    this.setState({
      files
    });
  }

  render() {
    const dropzoneStyle = {
        height : "20%",
        border : "1px dotted black",
        padding : "7%",
        margin: "1%"
    };
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)} style={dropzoneStyle}>
            <div>Upuść pliki tutaj, albo kliknij aby wybrać pliki do załadowania.</div>
          </Dropzone>
        </div>

        { this.state.files.length > 0 &&
          <aside>
            <h2>Załadowane pliki</h2>
            <ul>
              {
                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
        }

      </section>
    );
  }
}
