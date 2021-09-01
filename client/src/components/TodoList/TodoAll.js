import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import TodoItem from './TodoItem';
import '../TodoList/TodoListAll/TodoListAll.css';

const TodoAll = (props,{auth}) => {
  return (
    <ul className="todo-list">
      {props.todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          onDelete={props.onDeleteItem}
          todos={todos}
        >
          {todo.text}
        </TodoItem>
      ))}
    </ul>
  );
};

TodoAll.propTypes = {
    todo:PropTypes.func.isRequired,
    auth:PropTypes.func.isRequired,
    }
    const mapStateToProps = state =>({
        auth:state.auth
    })
    
    export default connect(mapStateToProps,{})(TodoAll)
    