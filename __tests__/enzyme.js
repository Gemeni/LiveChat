import React from 'react'
import { configure, shallow, moumnt } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import SignUp from '../client/components/SignUp.jsx'

configure({adapter: new Adapter()})

describe('check if a form is rendered', () => {
  describe('signup form test', () => {
    let wrapper
    beforeAll(() => {
      wrapper = shallow(<SignUp />)
    })
    it('test for form', ()=> {
      // expect(toJson(wrapper)).toMatchSnapshot()
      expect(wrapper.find("form").length).toBe(1)
    })
  })
})