import React from 'react'
import { configure, shallow, moumnt } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
// import { createShallow } from '@material-ui/core/test-utils';
import SignUp from '../client/components/SignUp.jsx'
import Login from '../client/components/Login'

configure({adapter: new Adapter()})

describe('check if a form is rendered', () => {
  let wrapper;
  describe('signup form test', () => {
    // let shallow;
    beforeAll(() => {
      // shallow = createShallow();
      wrapper = shallow(<SignUp />);

    })
    it('test for form', ()=> {
      // expect(toJson(wrapper)).toMatchSnapshot()
      expect(wrapper.find("form").length).toBe(1)
    })
    it('should have a form nested in a div', ()=>{
     expect(wrapper.find('div').find("form").length).toBe(1)
     expect(wrapper.find('.makeStyles-paper-3').length).toBe(1)
    //  console.log(wrapper.find('form').debug());
    })
    it('Should have a button with text of "Sign Up"', ()=>{
      expect(wrapper.find('.makeStyles-submit-6').text()).toEqual("Sign Up") 
    })
    it("Contains an input for username", () => {
      expect(wrapper.find('.user').text()).toBe('')

    })
    it("Contains an input for password", () => {
      // let handleClick = jest.fn()
      expect(wrapper.find('.password').text()).toBe('')
      // wrapper.find('form').simulate('submit', {target:{handleClick}});
      // expect(mock.mock.calls.length).toBe(1)
    }) 
  })
  describe('Login form test', () => { 
    beforeAll(()=>{
      wrapper = shallow(<Login/>);
    })
    it('Should contain "Sign In" text', () => {
      expect(wrapper.find('.makeStyles-submit-12').text()).toBe('Sign In');
    })
    it('Should allow the user to signup if they don\'t have an account', () => {
      expect(wrapper.find('.linkClass').text()).toBe("Don't have an account? Sign Up");
    })
    it("Contains an input for username", () => {
      expect(wrapper.find('#email').text()).toBe('')

    })
    it("Contains an input for password", () => {

      expect(wrapper.find('#password').text()).toBe('')

    })
  })
})


