/* eslint-disable no-await-in-loop */
const request = require('supertest');
const app = require('../../app');
const { Users } = require('../../models');
const {
  generateAssignmentsSortObject,
  generateAssetsFilterObject,
} = require('../../controllers/assignments.controller');
const { encrypt } = require('../../utils/encryptor');
const { enumAssetState, enumAssignmentState } = require('../../utils/enums.util');
const { generateJWTToken } = require('../../utils/generateJWTToken');
const { createAsset } = require('../../services/assets.service');

function createRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const mainApiURL = `/api/v1/assignments`;

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

describe('Assignments API', () => {
  let createdAssignmentID;
  let createdAssetID;

  beforeAll(async () => {
    const assetData = {
      name: 'Laptop Testing 1',
      category: 1,
      specification: 'Lorem Ipsum Amet',
      location: 'HCM',
      installedDate: '2021-08-20',
      state: enumAssetState.AVAILABLE,
    };
    const newAsset = await createAsset(assetData);

    createdAssetID = newAsset.id;
  });

  describe('Generate Filter and Sort Objects', () => {
    it('Generate Assets Filter Object Function', () => {
      const filterObject = generateAssetsFilterObject(
        'Laptop',
        '2021-08-21',
        `${enumAssignmentState.WAITING_FOR_ACCEPTANCE},${enumAssignmentState.ACCEPTED}`,
        'HCM',
        '2021-08-21',
        true
      );

      const filterObjectTwo = generateAssetsFilterObject(
        'Laptop',
        '2021-08-21',
        `${enumAssignmentState.WAITING_FOR_ACCEPTANCE},${enumAssignmentState.ACCEPTED}`,
        'HCM',
        '2021-08-21',
        false
      );

      expect(filterObject).toEqual(expect.any(Object));
      expect(filterObjectTwo).toEqual(expect.any(Object));
    });

    it('Generate Assets Sort Object Function', () => {
      const sortObjectOne = generateAssignmentsSortObject('id', 'ASC');
      const sortObjectTwo = generateAssignmentsSortObject('assetCode', 'ASC');
      const sortObjectThree = generateAssignmentsSortObject('assetName', 'ASC');
      const sortObjectFour = generateAssignmentsSortObject('assignedTo', 'ASC');
      const sortObjectFive = generateAssignmentsSortObject('assignedBy', 'ASC');
      const sortObjectSix = generateAssignmentsSortObject('requestedBy', 'ASC');
      const sortObjectSeven = generateAssignmentsSortObject('acceptedBy', 'ASC');
      const sortObjectEight = generateAssignmentsSortObject('assignedDate', 'ASC');
      const sortObjectNine = generateAssignmentsSortObject('returnedDate', 'ASC');
      const sortObjectTen = generateAssignmentsSortObject('state', 'ASC');

      expect(sortObjectOne).toEqual(expect.any(Array));
      expect(sortObjectTwo).toEqual(expect.any(Array));
      expect(sortObjectThree).toEqual(expect.any(Array));
      expect(sortObjectFour).toEqual(expect.any(Array));
      expect(sortObjectFive).toEqual(expect.any(Array));
      expect(sortObjectSix).toEqual(expect.any(Array));
      expect(sortObjectSeven).toEqual(expect.any(Array));
      expect(sortObjectEight).toEqual(expect.any(Array));
      expect(sortObjectNine).toEqual(expect.any(Array));
      expect(sortObjectTen).toEqual(expect.any(Array));
    });
  });

  describe('Create Assignment', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0030',
        username: createRandomString(20),
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    test(`POST ${mainApiURL} -> create a new assignment`, async () => {
      const assignmentData = {
        assignedDate: '2021-08-20',
        note: 'Hello',
        assignedTo: 2,
        assignedAsset: createdAssetID,
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(assignmentData)
        .expect('Content-Type', /json/)
        .expect(201);

      createdAssignmentID = response.body.id;

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          assignedDate: expect.any(String),
          note: expect.any(String),
          assignmentState: expect.any(String),
          assignedTo: expect.any(Number),
          assignedBy: expect.any(Number),
          assignedAsset: expect.any(Number),
        })
      );
    });

    test(`POST ${mainApiURL} -> 403 when the token is not valid`, async () => {
      const assignmentData = {};
      const token = generateJWTToken(globalInvalidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(assignmentData)
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
      const assignmentData = {};
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(assignmentData)
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

  describe('Get Assignment', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_assignment_2',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`GET ${mainApiURL}/:id -> get an assignment`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .get(`${mainApiURL}/${createdAssignmentID}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          assignedDate: expect.any(String),
          note: expect.any(String),
          assignmentState: expect.any(String),
          assignedTo: expect.any(Number),
          assignedBy: expect.any(Number),
          assignedAsset: expect.any(Number),
        })
      );
    });

    test(`GET ${mainApiURL}/:id -> 404 when the assignment is not found`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .get(`${mainApiURL}/1000`)
        .set('Authorization', `Bearer ${token}`)
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

  describe('Edit Assignment', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_assignment_3',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`PUT ${mainApiURL} -> update an asset`, async () => {
      const modifiedAssignmentData = {
        id: createdAssignmentID,
        assignedDate: '2021-08-22',
        note: 'Hello There',
        assignedTo: 3,
        assignedAsset: createdAssetID,
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .put(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(modifiedAssignmentData)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          assignedDate: expect.any(String),
          note: expect.any(String),
          assignmentState: expect.any(String),
          assignedTo: expect.any(Number),
          assignedBy: expect.any(Number),
          assignedAsset: expect.any(Number),
        })
      );
    });

    test(`PUT ${mainApiURL} -> 403 when the token is not valid`, async () => {
      const assignmentData = {};
      const token = generateJWTToken(globalInvalidUser);

      const response = await request(app)
        .put(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(assignmentData)
        .expect('Content-Type', /json/)
        .expect(403);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`PUT ${mainApiURL} -> 422 when the assignment data is insufficient`, async () => {
      const assignmentData = {};
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .put(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(assignmentData)
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

  describe('Delete Assignment', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_assignment_4',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`DELETE ${mainApiURL}/:id -> delete an assignment`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .delete(`${mainApiURL}/${createdAssignmentID}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          success: expect.any(Boolean),
        })
      );
    });

    test(`DELETE ${mainApiURL}/:id -> 403 when the token is not valid`, async () => {
      const token = generateJWTToken(globalInvalidUser);

      const response = await request(app)
        .delete(`${mainApiURL}/${createdAssignmentID}`)
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

    test(`DELETE ${mainApiURL}/:id -> 404 when the assignment is not found`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .delete(`${mainApiURL}/99999`)
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
});
