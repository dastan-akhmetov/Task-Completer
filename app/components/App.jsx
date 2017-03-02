import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Table from './TasksTable/Table.jsx';
import HeadingRow from './TasksTable/HeadingRow.jsx';
import TaskRow from './TasksTable/TaskRow.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: null };
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    fetchTasks() {
        $.get('/tasks').done(function(data) {
            this.setState({ tasks : data });
        }.bind(this));
    }

    addTask() {
        var text = $('#task');
        if (text.val() != null) {
            $.get('/task/create?title=' + text.val()).done(function(data) {
                text.val('');
            }.bind(this));
        }
    }

    componentDidMount() {
        this.fetchTasks();
    }

    componentDidUpdate() {
        this.fetchTasks();
    }

    handleClick() {
        this.addTask();
    }

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            this.addTask();
        }
    }

    render() {
        
        if (this.state.tasks) {
            var rows = [];

            for (var i in this.state.tasks) {
                var task = this.state.tasks[i];
                rows.push(<TaskRow key={task._id} id={task._id} title={task.title} date={task.date} completed={task.completed ? 'Completed' : 'Not Completed'} />);
            }

            return  <div className="container">
                        <div className="form-group">
                            <div className="col-lg-6">
                            <input className="form-control" type="text" name="task" id="task" onKeyPress={this.handleKeyPress}/>
                            </div>
                            <div className="col-lg-6">
                                <button className="btn btn-primary" onClick={this.handleClick}>Click</button>
                            </div>
                        </div>
                        <div id="result"></div>
                        <div id="tasks">
                            <table className="table table-striped table-hover ">
                                <HeadingRow title="Title" completed="Completed" date="Date Created"/>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
            
        }

        return <div>Loading...</div>
        
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));