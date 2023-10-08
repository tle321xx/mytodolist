import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateTodolist from './pages/CreateTodolist'
import DeleteTodolist from './pages/DeleteTodolist'
import EditTodolist from './pages/EditTodolist'
import Home from './pages/Home'
import ShowTodolist from './pages/ShowTodolist'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/lists/create' element={<CreateTodolist />} />
      <Route path='/lists/details/:id' element={<ShowTodolist />} />
      <Route path='/lists/edit/:id' element={<EditTodolist />} />
      <Route path='/lists/delete/:id' element={<DeleteTodolist />} />
    </Routes>
  )
}

export default App