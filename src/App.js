import React, { useState } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function makeList() {
  return [
    { id: 1, title: 'this is title 1 why you see me 😁' },
    { id: 2, title: 'this is title 2 wowwwww 😜' },
    { id: 3, title: 'this is title 3 let do it 🚯' }
  ];
}

function App() {
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

  function onSubmit(title) {
    setListTodo([...listTodo, { id: listTodo.length + 1, title }])
  }

  return (
    <div className="app">
      Hello world
      <TodoForm
        onSubmit={onSubmit}
      />
      <TodoList
        listTodo={listTodo}
        handleTodoClick={handleTodoClick}
      />
    </div>
  );
}

export default App;
