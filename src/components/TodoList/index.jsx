import React from 'react';

function TodoList(props) {
  return (
    < div >
      <ul>
        {
          props.listTodo.map(todo =>
            <li
              key={todo.id}
              onClick={() => props.handleTodoClick(todo)}
            >
              {todo.title}
            </li>
          )
        }
      </ul>
    </div >
  );
}

export default TodoList;