import React from 'react';
import './Cells.css';

export default class Cells extends React.Component {
  constructor(props) {
    super(props);
    this.createTable = this.createTable.bind(this);
  }
  createTable()  {
    let table = [];
    const langs = this.props.languages;
    const translation = this.props.translation;
    console.log(Object.keys(translation))
    Object.keys(translation).forEach(key => {
      if (translation[key]) {
        const firstLangTag = translation[key][0][langs[0]];
        const secondLangTag = translation[key][1] ? translation[key][1][langs[1]] : '';

        table.push(
          <div className="divTableRow" key={key}>
            <div className="divTableCell">
              <input type="text" name="name" defaultValue = {firstLangTag}/>
            </div>
            <div className="divTableCell">
              <input type="text" name="name" defaultValue = {secondLangTag}/>
            </div>
          </div>
        );

      }
    });

    return (
      table
    );
  }
  render() {
    return (
      <div className="divTable greenTable">
      <div className="divTableBody">
      { this.createTable() }
      </div>
      </div>
    )
  }
}
