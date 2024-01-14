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
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
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
      todos: state.todos.concat({todo: state.inputVal, edit: true, id: Math.random()}),
      inputVal: "",
    }));
  }

  deleteTodo(e) {
    this.setState(state => ({
      ...state,
      todos: state.todos.filter(i => i.id != e.target.parentElement.dataset.value)
    }))
  }

  toggleEdit(e) {
    this.setState(state => ({
      ...state,
      todos: state.todos.map(t => t.id == e.target.parentElement.dataset.value ? {todo: t.todo, edit: !t.edit, id: t.id} : t)
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
            <li key={todo.id} data-value={todo.id}>
              {todo.edit ? <input defaultValue={todo.todo}/> : <p>{todo.todo}</p>}
              {todo.edit ? <button onClick={this.toggleEdit}>resubmit</button> : <button onClick={this.toggleEdit}>edit</button>}
              <button onClick={this.deleteTodo}>delete</button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
