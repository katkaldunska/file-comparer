import React  from 'react';
import CustomButton from '../CustomButton';
import './Cells.css';

export default class Cells extends React.Component {
  constructor(props) {
    super(props);
    this.createTable = this.createTable.bind(this);

  }

  handleSubmit = event => {
    event.preventDefault();
  };

  createTable()  {
    let table = [];
    const langs = this.props.languages;
    const translation = this.props.translation;
    Object.keys(translation).forEach(key => {
      if (translation[key]) {
        const firstLangTag = translation[key][0][langs[0]];
        const secondLangTag = translation[key][1] ? translation[key][1][langs[1]] : '';

        table.push(
          <div className="divTableRow" key={key}>
            <div className="divTableCell"
              contentEditable
              suppressContentEditableWarning
              lang={langs[0]}
              onBlur={e => {
                this.props.translation[key][0][langs[0]] = e.target.innerHTML;
                this.forceUpdate();
              }}
              >
            {firstLangTag}
            </div>
            <div className="divTableCell"
              contentEditable
              suppressContentEditableWarning
              lang={langs[1]}
              onBlur={e => {
                this.props.translation[key][0][langs[1]] = e.target.innerHTML;
                this.forceUpdate();
              }}
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
      <div className="divTable greenTable">
        <div className="divTableBody">
          <div className="divTableRow fixed">
            <div className="divTableCell">
            <CustomButton lang = {this.props.languages[0]} translation = {this.props.translation}/>
            </div>
            <div className="divTableCell">
            <CustomButton lang = {this.props.languages[1]} translation = {this.props.translation}/>
            </div>
          </div>
          { this.createTable() }
        </div>
      </div>
    )
  }
}
