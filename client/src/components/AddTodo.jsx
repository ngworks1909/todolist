import React, { useContext, useState } from 'react'
import '../css/AddTodo.css'
import { FaCirclePlus } from "react-icons/fa6";
import { ModeContext } from '../context/ModeContext';
import { TodoContext } from '../context/TodoContext';


export default function AddTodo() {
  const {dark} = useContext(ModeContext);
  const {addTodo} = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const handleClick = (e) =>{
    e.preventDefault();
    if(title !== '' && title.length > 2){
       addTodo(title.toUpperCase());
       setTitle('');
    }
  }
  return (
    <div className={`addtodo display-flex align-center justify-between ${dark && 'darkMode'}`}>
        <input type="text" className="add-input" id="search-bar" placeholder="Add a task..." value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
        <FaCirclePlus className='add-item cursor-pointer' onClick={handleClick} />
    </div>
  )
}
