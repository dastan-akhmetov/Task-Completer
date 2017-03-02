import React, { Component } from 'react';
import $ from 'jquery';
import dateformat from 'dateformat';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        $.get('/task/delete?id=' + this.props.id).done(function(data) {
            console.log(data);
        }.bind(this));
    }

    render() {
        return  <tr>
                    <td>{this.props.title}</td>
                    <td>{dateformat(this.props.date, "longDate")}</td>
                    <td>{this.props.completed}</td>
                    <td>
                        <button onClick={this.handleRemove} id={this.props.id}>&times;</button>
                    </td>
                </tr>
    }
}