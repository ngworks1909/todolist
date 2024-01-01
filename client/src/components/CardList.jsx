import React, { useContext } from 'react'
import '../css/CardList.css'
import { ModeContext } from '../context/ModeContext'
import Card from './Card'
import { TodoContext } from '../context/TodoContext';
import { useEffect } from 'react';



export default function CardList() {
    const {dark} = useContext(ModeContext);
    const {todos,getTodos} = useContext(TodoContext);
    useEffect(()=>{
       getTodos();
       // eslint-disable-next-line
    },[])
  return (
    <div className={`card-list ${dark && 'darkMode'}`}>
      <span className='card-heading'>TO DOs</span>
      <div className="card-items display-flex flex-column">
        {todos.map((todo) => {
            return <Card title={todo.title} _id = {todo._id} key={todo._id}/>
        })}
      </div>
    </div>
  )
}
