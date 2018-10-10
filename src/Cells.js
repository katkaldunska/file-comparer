import React from 'react';

export default class Cells extends React.Component {
    render() {
        return (
            <td>{this.props.value}</td>
        );
    }
}
