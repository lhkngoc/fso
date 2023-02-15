import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Blog from './Blog'

describe('Blog content', () => {
    
    beforeEach(() => {
        component = render(
            <Blog
                blog={blog}
                addLike={addLike}
                removeBlog={removeBlog}
                user={user}
            />
        )
    })
    let component

    const blog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'www.test.com',
        likes: 0,
    }

    const user = {
        username: 'Test user',
        name: 'Test name',
    }
    
    const addLike = jest.fn()
    const removeBlog = jest.fn()

    test('render blog title and author only', () => {

        expect(component.container).toHaveTextContent(blog.title)
    })

    test('renders additional contents when view button is pressed', () => {
        const viewButton = component.container.querySelector('button')
        fireEvent.click(viewButton)

        expect(component.container).toHaveTextContent(blog.likes)
    })

})