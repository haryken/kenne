/* eslint-disable no-await-in-loop */
const request = require('supertest');
const app = require('../../app');
const { Users } = require('../../models');
const { encrypt } = require('../../utils/encryptor');
const { generateJWTToken } = require('../../utils/generateJWTToken');

const mainApiURL = `/api/v1/categories`;

function createRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

let globalValidUser;
let globalInvalidUser;

const createMockupUser = async (userData) => {
  globalValidUser = await Users.create(userData);
};

const generateInvalidUser = () => {
  globalInvalidUser = {
    id: 99999,
  };

  return globalInvalidUser;
};

const removeMockupUser = async () => {
  await globalValidUser.destroy();
  globalValidUser = null;
  globalInvalidUser = null;
};

describe('Categories API', () => {
  describe('Create Category', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_category_1',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`POST ${mainApiURL} -> create a new category`, async () => {
      const categoryData = {
        name: createRandomString(10),
        slug: createRandomString(3),
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(categoryData)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          categoryName: expect.any(String),
          categorySlug: expect.any(String),
        })
      );
    });

    test(`POST ${mainApiURL} -> 400 when the category data is insufficient`, async () => {
      const categoryData = {};
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(categoryData)
        .expect('Content-Type', /json/)
        .expect(422);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`POST ${mainApiURL} -> 400 when the category name is already existed`, async () => {
      const categoryData = {
        name: 'Laptop',
        slug: 'LP123',
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(categoryData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          message: expect.any(String),
        })
      );
    });

    test(`POST ${mainApiURL} -> 400 when the category prefix is already existed`, async () => {
      const categoryData = {
        name: 'Laptop123',
        slug: 'LP',
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(categoryData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          message: expect.any(String),
        })
      );
    });
  });

  describe('Get Categories', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_category_1',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`GET ${mainApiURL} -> get all categories`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .get(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            categoryName: expect.any(String),
            categorySlug: expect.any(String),
          }),
        ])
      );
    });
  });
});
