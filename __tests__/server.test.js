'use strict';

const {server}=require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('server.js', () => {

  it('ROUTE ===> signup ', async() => {
    let theUser = { 'username': 'esraaMamoun', 'password': 'esraaMamoun.1234' };
    mockRequest
      .post('/signup').send(theUser).then(data => {
        expect(data.status).toEqual(200);
      });
  });

  it('ROUTE ===> signin ', async() => {
    let theUser = { 'username': 'esraaMamoun', 'password': 'esraaMamoun.1234' };
    mockRequest
      .post('/signin').send(theUser).then(data => {
        expect(data.status).toEqual(500);
      });
  });

  it('ROUTE ===> users ', () => {
    return mockRequest
      .get('/users').then(data => {
        expect(data.status).toEqual(200);
      });
  });

  it('ROUTE ===> secret ', async() => {
    let theUser = { 'username': 'esraaMamoun', 'password': 'esraaMamoun.1234' };
    return mockRequest
      .get('/secret').send(theUser).then(data => {
        expect(data.status).toEqual(500);
      });
  });

});




