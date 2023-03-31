import request from 'supertest';
import app from '../app.mjs';

// Test for cat posts API
describe('GET /home', () => {
  test('Should respond with 200', async () => {
    const res = await request(app).get('/home');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /adopt', () => {
  test('Should respond with 200', async () => {
    const res = await request(app).get('/adopt');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /aboutUs', () => {
  test('Should respond with 200', async () => {
    const res = await request(app).get('/aboutUs');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /contact', () => {
  test('Should respond with 200', async () => {
    const res = await request(app).get('/contact');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /add/post', () => {
  test('Should respond with 200', async () => {
    const res = await request(app).get('/add/post');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /edit/profile', () => {
  test('Should respond with 200', async () => {
    const res = await request(app).get('/edit/profile');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /cats/1', () => {
  test('Should respond with 200', async () => {
    const res = await request(app).get('/cats/1');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /add/post', () => {
  test('Should respond with 404', async () => {
    const res = await request(app).get('/other');
    expect(res.statusCode).toBe(404);
  });
});

