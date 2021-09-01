import React from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
// import {moment} from 'react-moment';
import {connect} from 'react-redux'

const TodoItem = ({auth,todo:{text,_id}}) => (
    <li className="todo-item">
    {text}
  </li>

)
   

TodoItem.propTypes = {
todo:PropTypes.func.isRequired,
auth:PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
    auth:state.auth
})

export default connect(mapStateToProps,{})(TodoItem)
