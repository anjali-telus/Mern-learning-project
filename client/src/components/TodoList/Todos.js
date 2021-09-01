import React, { Fragment, useEffect,useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTodos } from "../../actions/todo";
// import {Spinner} from '../layout/Spinner';
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const Todos = ({ getTodos, todo:todos }) => {
  
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <Fragment>
      <h1 className="large text-primary">Todos List</h1>
      <TodoForm /> 
      <div className="todos">
       <ul>
      
       {todos && todos.map(todo =>(
          //  <li key = {todo._id} todo={todo}>{todo.text}</li>
                <TodoItem key = {todo._id} todo={todo}/>
            ))}
       </ul>
            
      </div>
      </Fragment>
  );
};

Todos.propTypes = {
  getTodos: PropTypes.func.isRequired,
  // todo: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
todo:state.todo
});
export default connect(mapStateToProps, { getTodos })(Todos);
