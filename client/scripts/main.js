import '../styles/reset.css';

const renderTodos = (todos) => {
  const todoItems = [];

  todos.forEach(todo => {
    todoItems.push([
      '<li>',
        `<label for="${ todo.id }">`,
          `<input ${ todo.done ? 'checked' : '' } id="${ todo.id }" type="checkbox" />`,
          todo.description,
        '</label>',
      '</li>',
    ].join(''));
  });

  document.querySelector('#root').innerHTML = `<ul>${ todoItems.join('') }</ul>`;
};

const getTodos = () => {
  return new Promise((resolve) => {
    fetch('http://localhost:3004/api/todos')
      .then(r => r.json())
      .then(data => resolve(data));
  });
};

document.addEventListener('DOMContentLoaded', () => getTodos().then(renderTodos));
