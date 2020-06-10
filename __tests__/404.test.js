'use strict';

const {server}=require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('server.js', () => {

  it('404 test' , ()=> {
    return mockRequest.get('/anyRouteRong')
      .then(data => {
        expect(data.status).toEqual(404);
      });
  });

});