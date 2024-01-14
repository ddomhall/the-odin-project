import React, { Component } from "react";
import Count from './components/Count.jsx'

export default class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this)
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: "",
    }));
  }

  deleteTodo(e) {
    this.setState(state => ({
      todos: state.todos.filter(i => i != e.target.previousSibling.textContent),
      inputVal: state.inputVal
    }))
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <Count count={this.state.todos.length}/>
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo}>
              <p>{todo}</p>
              <button onClick={this.deleteTodo}>delete</button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
