/* eslint-disable no-await-in-loop */
const request = require('supertest');
const app = require('../../app');

const mainApiURL = `/api/v1/posts`;

const invalidDataList = [
  {
    postText: 'Do Homework',
    imageURL: 'Do Homework',
  },
  {
    title: 'Do Homework',
    imageURL: 'Do Homework',
  },
  {
    title: 'Do Homework',
    postText: 'Do Homework',
  },
  {},
];

let createdRecordID;

describe('Posts API', () => {
  test(`POST ${mainApiURL} -> create and return a new post`, async () => {
    const newPost = {
      title: 'Do Homework',
      postText: 'Do Homework',
      imageURL: 'Do Homework',
    };

    const response = await request(app)
      .post(`${mainApiURL}`)
      .send(newPost)
      .expect('Content-Type', /json/)
      .expect(201);

    createdRecordID = response.body.id;

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        postText: expect.any(String),
        imageURL: expect.any(String),
      })
    );
  });

  test(`POST ${mainApiURL} -> return 422 if enter invalid data`, async () => {
    for (let i = 0; i < invalidDataList.length; i += 1) {
      const currentData = invalidDataList[i];

      const response = await request(app)
        .post(`${mainApiURL}`)
        .send(currentData)
        .expect('Content-Type', /json/)
        .expect(422);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    }
  });

  test(`GET ${mainApiURL} -> array of posts`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          postText: expect.any(String),
          imageURL: expect.any(String),
        }),
      ])
    );
  });

  test(`GET ${mainApiURL}/id -> a post`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}/${createdRecordID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        postText: expect.any(String),
        imageURL: expect.any(String),
      })
    );
  });

  test(`GET ${mainApiURL}/id -> 404 if not found`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}/9999`)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: expect.any(Number),
        message: expect.any(String),
      })
    );
  });

  test(`PUT ${mainApiURL}/id -> 404 if not found`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}/9999`)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: expect.any(Number),
        message: expect.any(String),
      })
    );
  });

  test(`PUT ${mainApiURL}/id -> return the updated post`, async () => {
    const modifiedPost = {
      title: 'Do Homework',
      postText: 'Do Homework',
      imageURL: 'Do Homework',
    };

    const response = await request(app)
      .put(`${mainApiURL}/${createdRecordID}`)
      .send(modifiedPost)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        postText: expect.any(String),
        imageURL: expect.any(String),
      })
    );
  });

  test(`PUT ${mainApiURL}/id -> return 422 if enter invalid data`, async () => {
    for (let i = 0; i < invalidDataList.length; i += 1) {
      const currentData = invalidDataList[i];

      const response = await request(app)
        .put(`${mainApiURL}/${createdRecordID}`)
        .send(currentData)
        .expect('Content-Type', /json/)
        .expect(422);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    }
  });

  test(`DELETE ${mainApiURL}/id -> return the deleted post`, async () => {
    const response = await request(app)
      .delete(`${mainApiURL}/${createdRecordID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        postText: expect.any(String),
        imageURL: expect.any(String),
      })
    );
  });

  test(`DELETE ${mainApiURL}/id -> 404 if not found`, async () => {
    const response = await request(app)
      .delete(`${mainApiURL}/9999`)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: expect.any(Number),
        message: expect.any(String),
      })
    );
  });
});
