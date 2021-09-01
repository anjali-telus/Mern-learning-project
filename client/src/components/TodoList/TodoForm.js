import React,{useState} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addTodo } from '../../actions/todo';
import Button from '../UI/Button';
import './TodoList.css'

const TodoForm = ({addTodo}) => {
    const [text,setText] = useState('');
    return (
        <form onSubmit={e=>{
            e.preventDefault();
            addTodo({ text });
            setText('');
        }}>
        <div className="form-control">
          <label>Todo Items</label>
          <input type="text" onChange={e=> setText(e.target.value)} />
        </div>
        <Button type="submit">Add Todo</Button>
      </form>
    )
}

TodoForm.propTypes = {
    addTodo:PropTypes.func.isRequired,
}


export default connect(null,{addTodo})(TodoForm);
