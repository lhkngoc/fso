import React from 'react'
import { render, fireEvent  } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const addBlog = jest.fn()
  
    const component = render(
      <BlogForm addBlog={addBlog} />
    )
  
    const inputTitle = component.container.querySelector('.title')
    const inputAuthor = component.container.querySelector('.author')
    const form = component.container.querySelector('form')
  
    fireEvent.change(inputTitle, { 
      target: { value: 'testing of forms could be easier' } 
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'test author' }
    })
    fireEvent.submit(form)
  
   
    expect(addBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
    expect(addBlog.mock.calls[0][0].author).toBe('test author')
})