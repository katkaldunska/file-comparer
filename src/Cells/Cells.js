import React  from 'react';
import CustomButton from '../CustomButton';
import './Cells.css';

const redBackground = {
  style: {
    background: 'red'
  }
};
const redColor = {
  style: {
    color: 'red'
  }
};

export default class Cells extends React.Component {

  handleSubmit = event => {
    event.preventDefault();
  };

  createTable = () =>  {
    let table = [];
    const langs = this.props.languages;
    const translation = this.props.translation;


    Object.keys(translation).forEach(key => {
      if (translation[key]) {

        let leftDivProps = {};
        let rigthDivProps = {};
        const firstLangTag = translation[key][0][langs[0]];
        const secondLangTag = translation[key][1] ? translation[key][1][langs[1]] : '';
        if (!firstLangTag) {
          leftDivProps = redBackground;
        }
        if (!secondLangTag) {
          rigthDivProps = redBackground;
        }
        if (firstLangTag === secondLangTag) {
          leftDivProps = rigthDivProps = redColor;
        }

        table.push(
          <div className="divTableRow" key={key}>
            <div
              className="divTableCell"
              contentEditable
              suppressContentEditableWarning
              lang={langs[0]}
              onBlur={e => {
                this.props.translation[key][0][langs[0]] = e.target.innerHTML;
                this.forceUpdate();
              }}
              {...leftDivProps}
            >
              {firstLangTag}
            </div>
            <div
              className="divTableCell"
              contentEditable
              suppressContentEditableWarning
              lang={langs[1]}
              onBlur={e => {
                this.props.translation[key][0][langs[1]] = e.target.innerHTML;
                this.forceUpdate();
              }}
              {...rigthDivProps}
            >
              {secondLangTag}
            </div>
          </div>
        );
      }
    });

    return table;
  }
  render() {
    return (
      <section>
      <div className="divTable blueTable">
        <div className="divTableBody">
          { this.createTable() }
        </div>
      </div>
      <div className="fixed">
        <CustomButton lang = {this.props.languages[0]} translation = {this.props.translation}/>
        <CustomButton lang = {this.props.languages[1]} translation = {this.props.translation}/>
      </div>
      </section>
    )
  }
}
