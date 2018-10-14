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
    Object.keys(translation).forEach(key => {
      translation[key].forEach(val => {
        if (val[lang]) {
          content[key] = val[lang];
        } else if (!content[key]){
          content[key] = '';
        }
      });
    });
    // var Type = require('js-binary');
    // Type.

    const downloadLink = document.createElement("a");
    const file = new Blob([JSON.stringify(content)], {type: 'text/plain'});
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = `new_${this.props.lang}`;//
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


  handleClick() {
    this.setState({ isLoading: true });
    this.downloadJsonFile();
    // This probably where you would have an `ajax` call
    setTimeout(() => {
      // Completed of async action, set loading state back
      this.setState({ isLoading: false });
    }, 2000);
  }

  render() {
    const { isLoading } = this.state;
    return (
      <button
        className='btn btn-primary'
        disabled={isLoading}
        onClick={!isLoading ? this.handleClick : null}
      >
        {isLoading ? 'Loading...' : `Download for lang: ${this.props.lang}`}
      </button>
    );
  }
}
