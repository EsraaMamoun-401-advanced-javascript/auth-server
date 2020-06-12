'use strict';

const {server}=require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('server.js', () => {

  it('ROUTE ===> signup ', async() => {
    let theUser = { 'username': 'esraaMamoun', 'password': 'esraaMamoun.1234' };
    mockRequest
      .post('/signup').send(theUser).then(data => {
        expect(data.status).toEqual(403);
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

  it('ROUTE ===> read ', async() => {
    let theUser = { 'username': 'esraaMamoun', 'password': 'esraaMamoun.1234', 'role': 'user' };
    return mockRequest
      .get('/read').send(theUser).then(data => {
        expect(data.status).toEqual(500);
      });
  });

  it('ROUTE ===> add ', async() => {
    let theUser = { 'username': 'esraaMamoun', 'password': 'esraaMamoun.1234', 'role': 'writer' };
    return mockRequest
      .post('/add').send(theUser).then(data => {
        expect(data.status).toEqual(500);
      });
  });

  it('ROUTE ===> change ', async() => {
    let theUser = { 'username': 'esraaMamoun', 'password': 'esraaMamoun.1234', 'role': 'editor' };
    return mockRequest
      .put('/change').send(theUser).then(data => {
        expect(data.status).toEqual(500);
      });
  });


  it('ROUTE ===> remove ', async() => {
    let theUser = { 'username': 'esraaMamoun', 'password': 'esraaMamoun.1234', 'role': 'admin' };
    return mockRequest
      .delete('/remove').send(theUser).then(data => {
        expect(data.status).toEqual(500);
      });
  });

});




