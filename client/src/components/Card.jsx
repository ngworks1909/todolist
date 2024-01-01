import React, { useContext, useState } from 'react'
import '../css/Card.css'
import { MdDeleteSweep } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { ModeContext } from '../context/ModeContext';
import { TodoContext } from '../context/TodoContext';

export default function Card({title,_id}) {
    const {dark} = useContext(ModeContext);
    const {deleteTodo, updateTodo} = useContext(TodoContext);
    const [edit, setEdit] = useState(false);
    const [text, setText ] = useState(title);

  return (
    <>
        <div className={`card display-flex flex-row align-center justify-between ${dark && 'darkMode'}`}>
            
            {!edit ? <>
              <span className="title">{title}</span>
            </> : <>
            <input type="text" name="edit-card" id="edit-card" value={text} onChange={(e)=>{setText(e.target.value)}} placeholder='Add title to update...' className='edit-card'/>
            </>}
            <div className="card-options display-flex align-center">
                {!edit ? <>
                  <BiEdit className='card-icon cursor-pointer' onClick={(e)=>{e.preventDefault(); setEdit(true)}}  />
                <MdDeleteSweep className='card-icon cursor-pointer' onClick={(e)=>{e.preventDefault();deleteTodo(_id)}}/>
                </>:<>
                  <button type="button" className={`btn btn-${dark ? "light":"dark"}`} onClick={(e)=>{e.preventDefault();setEdit(false)}} >Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={async(e)=>{e.preventDefault();if(text.toUpperCase() !== title){await updateTodo(_id,text)};setEdit(false)}}>Update</button>
                </>}
            </div>
        </div>
        
    </>
  )
}
