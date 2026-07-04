import { test, expect } from '@playwright/test';
import { validateSchema } from './helpers/validate';
import PostSchema from './schemas/post.schema.json';
import UserSchema from './schemas/user.schema.json';

test.describe('JSONPlaceholder /posts API', () => {
  
  test('1. Get all posts', async ({ request }) => {
    const response = await request.get('/posts');
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBe(100);
  });

  test('2. Get single post by ID', async ({ request }) => {
    const response = await request.get('/posts/1');
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(validateSchema(PostSchema, body)).toBe(true);
  });

  test('3. Create a new post', async ({ request }) => {
    const newPost = {
      title: "BF CRUD test",
      body: "Testing POST using strict env",
      userId: 1
    };

    const response = await request.post('/posts', {
      data: newPost
    });
    
    expect(response.status()).toBe(201);
    
    const body = await response.json();
    expect(validateSchema(PostSchema, body)).toBe(true);
  });

  test('4. Update a post', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: "Updated title",
      body: "Updated body",
      userId: 1
    };
    
    const response = await request.put('/posts/1', {
      data: updatedPost
    });
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(validateSchema(PostSchema, body)).toBe(true);
    expect(body.title).toBe("Updated title");
  });

  test('5. Delete a post', async ({ request }) => {
    const response = await request.delete('/posts/1');
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toEqual({});
  });

  test('6. Get single user and validate email format', async ({ request }) => {
    const response = await request.get('/users/1');
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(validateSchema(UserSchema, body)).toBe(true);
  });

  test('7. Create a new post and validate request + response', async ({ request }) => {
    const newPost = {
      userId: 1,
      title: "Contract Testing",
      body: "AJV is powerful"
    };

    const response = await request.post('/posts', {
      data: newPost
    });
    
    expect(response.status()).toBe(201);
    
    const body = await response.json();
    expect(validateSchema(PostSchema, body)).toBe(true);
    expect(typeof body.id).toBe('number');
  });

});