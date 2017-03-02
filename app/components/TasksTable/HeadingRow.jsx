import React, { Component } from 'react';

export default class HeadingRow extends Component {
    render() {
        return  <thead>
                    <tr>
                        <th>{this.props.title}</th>
                        <th>{this.props.date}</th>
                        <th>{this.props.completed}</th>
                        <th>Delete</th>
                    </tr>
                </thead>
    }
}