import axios from 'axios';
import {setAlert} from './alert';
import { GET_TODO,TODO_ERROR,ADD_TODO } from './types';

//get TODOS
export const getTodos =() => async dispatch=>{
   
    try{
    const res = await axios.get('/api/todos');
    dispatch({
    type :GET_TODO,
    payload:res.data
    
    });
    }
    catch(err){
      dispatch({
        type:TODO_ERROR,
        payload:{msg:err.response.statusText,
        status:err.response.status}
        });
    
    }
    }

    //add todo
    export const addTodo =formData => async dispatch=>{
      
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        try{
        const res = await axios.post('/api/todos',formData,config);
        dispatch({
        type :ADD_TODO,
        payload:res.data
        
        });
        dispatch(setAlert('Item Added','success'));
        }
        catch(err){
          dispatch({
            type:TODO_ERROR,
            payload:{msg:err.response.statusText,
            status:err.response.status}
            });
        
        }
        }