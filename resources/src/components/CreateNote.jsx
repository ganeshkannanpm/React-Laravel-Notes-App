import React, { useState } from 'react'

const CreateNote = () => {

  return (
    <div>
        <form className='create-note'>
            <input type="text" name='title' placeholder='Title' />
            <input type="text" name='content' placeholder='Take a note...' />
            <button>Add</button>
        </form>
    </div>
  )
}

export default CreateNote