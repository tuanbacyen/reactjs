import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import './App.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/pagination';

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
  const [postList, setpostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 0,
    _limit: 0,
    _totalRows: 0,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  })

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

  function handlePageChange(newPage) {
    setFilters({ ...filters, _page: newPage });
  }

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?_limit=${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        const { data, pagination } = responseJSON;
        setpostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchPostList();
  }, [filters]);

  return (
    <div className="app">
      Hello world
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
      {/* <TodoForm
        onSubmit={onSubmit}
      />
      <TodoList
        listTodo={listTodo}
        handleTodoClick={handleTodoClick}
      /> */}
    </div>
  );
}

export default App;
