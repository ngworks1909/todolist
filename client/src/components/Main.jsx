import React, { useContext } from 'react'
import '../css/Main.css'
import { ModeContext } from '../context/ModeContext'
import AddTodo from './AddTodo';
import CardList from './CardList';

export default function Main() {
    const {dark} = useContext(ModeContext);
  return (
    <div className={`main ${dark && "darkMode"}`}>
        <AddTodo/>
        <CardList/>
    </div>
  )
}
