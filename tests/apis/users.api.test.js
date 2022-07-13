/* eslint-disable no-await-in-loop */
const request = require('supertest');
const app = require('../../app');
const { Users } = require('../../models');
const { encrypt } = require('../../utils/encryptor');
const { generateJWTToken } = require('../../utils/generateJWTToken');

const mainApiURL = `/api/v1/users`;

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

describe('Users API', () => {
  let createdUserID;

  afterAll(async () => {
    const theCreatedUser = await Users.findByPk(createdUserID);
    await theCreatedUser.destroy();
  });

  describe('Create User', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_user_1',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => {
      await removeMockupUser();
    });

    test(`POST ${mainApiURL} -> create a new user`, async () => {
      const userData = {
        firstName: 'Ngan',
        lastName: 'Nguyen Thi Thanh',
        dateOfBirth: '2000-11-30',
        gender: 'Female',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0300',
        username: 'nganntt27',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(201);

      createdUserID = response.body.id;

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          dateOfBirth: expect.any(String),
          gender: expect.any(String),
          joinedDate: expect.any(String),
          userType: expect.any(String),
          staffCode: expect.any(String),
          username: expect.any(String),
          userLocation: expect.any(String),
          firstTimeLogin: expect.any(Boolean),
        })
      );
    });

    test(`POST ${mainApiURL} -> 403 when the token is not valid`, async () => {
      const userData = {};
      const token = generateJWTToken(globalInvalidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(403);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`POST ${mainApiURL} -> 400 when the user data is insufficient`, async () => {
      const userData = {};
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(422);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });
  });

  describe('Get User', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_user_2',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`GET ${mainApiURL}/:id -> get a user`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .get(`${mainApiURL}/${createdUserID}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          dateOfBirth: expect.any(String),
          gender: expect.any(String),
          joinedDate: expect.any(String),
          userType: expect.any(String),
          staffCode: expect.any(String),
          username: expect.any(String),
          userLocation: expect.any(String),
          firstTimeLogin: expect.any(Boolean),
        })
      );
    });

    test(`GET ${mainApiURL}/:id -> 403 when the token is not valid`, async () => {
      const token = generateJWTToken(globalInvalidUser);

      const response = await request(app)
        .get(`${mainApiURL}/${createdUserID}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(403);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`GET ${mainApiURL}/:id -> 404 when the user is not found`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .get(`${mainApiURL}/1000`)
        .set('Authorization', `Bearer ${token}`)
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

  describe('Edit User', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_user_3',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`PUT ${mainApiURL} -> update a user`, async () => {
      const userData = {
        id: `${createdUserID}`,
        dateOfBirth: '2001-11-30',
        gender: 'Female',
        joinedDate: '2021-08-02',
        userType: 'Admin',
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .put(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          dateOfBirth: expect.any(String),
          gender: expect.any(String),
          joinedDate: expect.any(String),
          userType: expect.any(String),
          staffCode: expect.any(String),
          username: expect.any(String),
          userLocation: expect.any(String),
          firstTimeLogin: expect.any(Boolean),
        })
      );
    });

    test(`PUT ${mainApiURL} -> 403 when the token is not valid`, async () => {
      const userData = {};
      const token = generateJWTToken(globalInvalidUser);

      const response = await request(app)
        .put(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(403);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`PUT ${mainApiURL} -> 422 when the user data is insufficient`, async () => {
      const userData = {};
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .put(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(422);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });
  });

  describe('Check User Disability', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_user_4',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`GET ${mainApiURL}/check/:id -> check a user`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .get(`${mainApiURL}/check/${createdUserID}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          success: expect.any(Boolean),
        })
      );
    });

    test(`GET ${mainApiURL}/check/:id -> 403 when the token is not valid`, async () => {
      const token = generateJWTToken(globalInvalidUser);

      const response = await request(app)
        .get(`${mainApiURL}/check/${createdUserID}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(403);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`GET ${mainApiURL}/check/:id -> 404 when the user is not found`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .get(`${mainApiURL}/check/999999`)
        .set('Authorization', `Bearer ${token}`)
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

  describe('Disable User', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_user_5',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`PUT ${mainApiURL}/:id/disable -> check a user`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .put(`${mainApiURL}/${createdUserID}/disable`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          dateOfBirth: expect.any(String),
          gender: expect.any(String),
          joinedDate: expect.any(String),
          userType: expect.any(String),
          staffCode: expect.any(String),
          username: expect.any(String),
          userLocation: expect.any(String),
          firstTimeLogin: expect.any(Boolean),
        })
      );
    });

    test(`PUT ${mainApiURL}/:id/disable -> 403 when the token is not valid`, async () => {
      const token = generateJWTToken(globalInvalidUser);

      const response = await request(app)
        .put(`${mainApiURL}/${createdUserID}/disable`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(403);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`PUT ${mainApiURL}/:id/disable -> 404 when the user is not found`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .put(`${mainApiURL}/99999/disable`)
        .set('Authorization', `Bearer ${token}`)
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

  describe('Login', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_1',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`POST ${mainApiURL}/login -> return the logged in user along with a token`, async () => {
      const user = globalValidUser;

      const response = await request(app)
        .post(`${mainApiURL}/login`)
        .send({
          username: user.username,
          password: '123456',
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          token: expect.any(String),
          user: expect.objectContaining({
            id: expect.any(Number),
            firstName: expect.any(String),
            lastName: expect.any(String),
            dateOfBirth: expect.any(String),
            gender: expect.any(String),
            joinedDate: expect.any(String),
            userType: expect.any(String),
            staffCode: expect.any(String),
            username: expect.any(String),
            userLocation: expect.any(String),
            firstTimeLogin: expect.any(Boolean),
          }),
          firstTimeLogin: expect.any(Boolean),
        })
      );
    });

    test(`POST ${mainApiURL}/login -> return 400 if invalid`, async () => {
      const userData = {
        username: 'longntp12312312312',
        password: '12345631231232e3e',
      };

      const response = await request(app)
        .post(`${mainApiURL}/login`)
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });
  });

  describe('Change Password', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test 2',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0010',
        username: 'testing_user_6',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`PATCH ${mainApiURL}/change-password -> 400 if the user does not exist`, async () => {
      const data = {};
      const token = generateJWTToken(globalInvalidUser);

      const response = await request(app)
        .patch(`${mainApiURL}/change-password`)
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(403);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`PATCH ${mainApiURL}/change-password -> 400 if the user does not give the password for first time password change`, async () => {
      const data = {
        password: null,
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .patch(`${mainApiURL}/change-password`)
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`PATCH ${mainApiURL}/change-password -> 400 if the user give the same password for first time change`, async () => {
      const data = {
        password: '123456',
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .patch(`${mainApiURL}/change-password`)
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`PATCH ${mainApiURL}/change-password -> 200 successfully change password for first time user`, async () => {
      const data = {
        password: '1234567',
      };

      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .patch(`${mainApiURL}/change-password`)
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
        })
      );
    });

    test(`PATCH ${mainApiURL}/change-password -> 400 if the user is not truly login for the first time`, async () => {
      const data = {};
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .patch(`${mainApiURL}/change-password`)
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`PATCH ${mainApiURL}/change-password -> 400 if the old password is not the same as the current password in the database`, async () => {
      const data = {
        oldPassword: '123456',
        newPassword: '12345678',
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .patch(`${mainApiURL}/change-password`)
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`PATCH ${mainApiURL}/change-password -> 400 if the new password is the same as the current password in the database`, async () => {
      const data = {
        oldPassword: '1234567',
        newPassword: '1234567',
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .patch(`${mainApiURL}/change-password`)
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`PATCH ${mainApiURL}/change-password -> 400 if the user does not give an old password`, async () => {
      const data = {
        newPassword: '1234567',
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .patch(`${mainApiURL}/change-password`)
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`PATCH ${mainApiURL}/change-password -> 400 if the user does not give a new password`, async () => {
      const data = {
        oldPassword: '1234567',
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .patch(`${mainApiURL}/change-password`)
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`PATCH ${mainApiURL}/change-password -> 200 successfully change password`, async () => {
      const data = {
        oldPassword: '1234567',
        newPassword: '123456789',
      };

      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .patch(`${mainApiURL}/change-password`)
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
        })
      );
    });
  });
});
