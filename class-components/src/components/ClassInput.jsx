import { Component } from 'react';
import ClassCount from './ClassCount';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      editingIndex: null,
      editVal: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
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
      inputVal: '',
    }));
  }

  handleEdit(index) {
    this.setState({
      editingIndex: index,
      editVal: this.state.todos[index],
    });
  }

  handleEditChange(e) {
    this.setState({
      editVal: e.target.value,
    });
  }

  handleResubmit(index) {
    this.setState((state) => {
      const updated = [...state.todos];
      updated[index] = state.editVal;

      return {
        todos: updated,
        editingIndex: null,
        editVal: '',
      };
    });
  }

  handleDelete(indexToDelete) {
    this.setState((state) => ({
      todos: state.todos.filter((_, index) => index !== indexToDelete),
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
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
        <ClassCount count={this.state.todos.length} />
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={index}>
              {this.state.editingIndex === index ? (
                <>
                  <input
                    value={this.state.editVal}
                    onChange={this.handleEditChange}
                  />
                  <button
                    type="button"
                    onClick={() => this.handleResubmit(index)}
                  >
                    Resubmit
                  </button>
                </>
              ) : (
                <>
                  {todo}
                  <button type="button" onClick={() => this.handleEdit(index)}>
                    Edit
                  </button>
                </>
              )}
              <button type="button" onClick={() => this.handleDelete(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
