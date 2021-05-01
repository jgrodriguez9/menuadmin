import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import CardMenu from '../components/CardMenu'
import { MemoryRouter as Router, withRouter } from 'react-router'

test('render content', ()=>{
    const item = {
        id: 'test',
        menu: {
            name_es: "test name es",
            section: [
                {
                    id: 'sect1',
                    name_es: "prodtest1",
                    productos: []
                }
            ]
        }
    }

    const mockHandler = jest.fn()

    const component = render(<Router><CardMenu item={item} onHandleDeleteSection={mockHandler}/></Router>)

    const btn = component.getByTestId("test")
    fireEvent.click(btn)

    expect(mockHandler.mock.calls).toHaveLength(1)

   // console.log(component)
})