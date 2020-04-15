import React, { useState } from 'react';

function makeList() {
  return [
    { id: 1, title: 'this is title 1 why you see me 😁' },
    { id: 2, title: 'this is title 2 wowwwww 😜' },
    { id: 3, title: 'this is title 3 let do it 🚯' }
  ];
}

function TodoList(props) {
  const [listTodo, setListTodo] = useState(() => {
    const items = makeList();

    return items
  });

  function handleTodoClick(todo) {
    if (todo === null) return;

    const index = listTodo.findIndex(x => x.id === todo.id)
    if (index < 0) return;
    const newList = [...listTodo];
    newList.splice(index, 1);
    setListTodo(newList);
  }

  return (
    < div >
      <ul>
        {
          listTodo.map(todo =>
            <li
              key={todo.id}
              onClick={() => handleTodoClick(todo)}
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