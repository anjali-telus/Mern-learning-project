import React, { useState } from 'react';
import TodoListAll from './TodoListAll/TodoListAll';
import TodoInput from './TodoInput/TodoInput';

import './TodoList.css';

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([
    { text: 'Do all exercises!', id: 'g1' },
    { text: 'Finish the course!', id: 'g2' }
  ]);

  const addTodoHandler = enteredText => {
    setTodoItems(prevTodos => {
      const updatedTodos = [...prevTodos];
      updatedTodos.unshift({ text: enteredText, id: Math.random().toString() });
      return updatedTodos;
    });
  };

  const deleteItemHandler = todoId => {
    setTodoItems(prevTodos => {
      const updatedTodos = prevTodos.filter(todo => todo.id !== todoId);
      return updatedTodos;
    });
  };

  let content = (
    <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
  );

  if (todoItems.length > 0) {
    content = (
      <TodoListAll items={todoItems} onDeleteItem={deleteItemHandler} />
    );
  }

  return (
    <div>
      <section id="todo-form">
        <TodoInput onAddTodo={addTodoHandler} />
      </section>
      <section id="todos">
        {content}
        
      </section>
    </div>
  );
};

export default TodoList;
