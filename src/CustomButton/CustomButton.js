import React  from 'react';

export default class CustomButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isLoading: false,
    };
  }

downloadJsonFile = () => {

    const content = {};
    const translation = this.props.translation;
    const lang = this.props.lang;
    return new Promise((resolve, reject)=> {
      Object.keys(translation).forEach(key => {
        translation[key].forEach(val => {
          if (val[lang]) {
            content[key] = val[lang];
          } else if (!content[key]){
            content[key] = '';
          }
        });
      });

      const downloadLink = document.createElement("a");
      const file = new Blob([JSON.stringify(content)], {type: 'text/plain'});
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = `new_${this.props.lang}`;//
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      resolve();
    });
}


  handleClick() {
    this.setState({ isLoading: true });
    this.downloadJsonFile().then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading } = this.state;
    return (
      <button
        className='btn btn-primary'
        disabled={isLoading}
        onClick={!isLoading ? this.handleClick : null}
      >
        {isLoading ? 'Ładowanie...' : `Pobierz plik: ${this.props.lang}`}
      </button>
    );
  }
}
