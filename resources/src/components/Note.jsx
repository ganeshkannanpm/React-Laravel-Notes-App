import React from 'react'
import Header from './Header'
import CreateNote from './CreateNote'

const Note = () => {
  return (
    <>
    <Header />
    <CreateNote />
    <div className='note'>
        <h1>Title</h1>
        <p>Content</p>
    </div>
    </>
  )
}

export default Note