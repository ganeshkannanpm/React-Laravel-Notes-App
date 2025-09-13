import React from 'react'
import Header from './Header'

const Note = () => {
  return (
    <>
    <Header />
    <div className='note'>
        <h1>Title</h1>
        <p>Content</p>
    </div>
    </>
  )
}

export default Note