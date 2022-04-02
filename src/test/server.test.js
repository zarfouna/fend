const request = require('supertest');
const app = require('../server/app')
process.env.NODE_ENV = 'test';
 test('the function "handleSubmit()" should exist',() => {
   
     request(app).get('/').send('./dist/index.html').then(r=>{
        expect(r.statusCode).toBe(200);
     });
      
    
  });