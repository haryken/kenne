/* eslint-disable no-await-in-loop */
const request = require('supertest');
const app = require('../../app');
const { Users } = require('../../models');
const {
  generateAssetsFilterObject,
  generateAssetsSortObject,
} = require('../../controllers/assets.controller');
const { encrypt } = require('../../utils/encryptor');
const { enumAssetState } = require('../../utils/enums.util');
const { generateJWTToken } = require('../../utils/generateJWTToken');

const mainApiURL = `/api/v1/assets`;

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

describe('Assets API', () => {
  let createdAssetID;

  describe('Generate Filter and Sort Objects', () => {
    it('Generate Assets Filter Object Function', () => {
      const filterObject = generateAssetsFilterObject(
        '1,2,3',
        `${enumAssetState.AVAILABLE},${enumAssetState.NOT_AVAILABLE}`,
        'Laptop'
      );

      expect(filterObject).toEqual(expect.any(Object));
    });

    it('Generate Assets Sort Object Function', () => {
      const sortObjectOne = generateAssetsSortObject('assetCode', 'ASC');
      const sortObjectTwo = generateAssetsSortObject('assetName', 'ASC');
      const sortObjectThree = generateAssetsSortObject('categoryName', 'ASC');
      const sortObjectFour = generateAssetsSortObject('state', 'ASC');

      expect(sortObjectOne).toEqual(expect.any(Array));
      expect(sortObjectTwo).toEqual(expect.any(Array));
      expect(sortObjectThree).toEqual(expect.any(Array));
      expect(sortObjectFour).toEqual(expect.any(Array));
    });
  });

  describe('Create Asset', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_asset_1',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`POST ${mainApiURL} -> create a new asset`, async () => {
      const assetData = {
        name: 'Laptop Testing 1',
        category: 1,
        specification: 'Laptop Testing 1',
        location: 'HCM',
        installedDate: '2021-08-20',
        state: enumAssetState.AVAILABLE,
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(assetData)
        .expect('Content-Type', /json/)
        .expect(201);

      createdAssetID = response.body.id;

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          assetName: expect.any(String),
          categoryId: expect.any(Number),
          assetSpec: expect.any(String),
          assetLocation: expect.any(String),
          installedDate: expect.any(String),
          state: expect.any(String),
        })
      );
    });

    test(`POST ${mainApiURL} -> 403 when the token is not valid`, async () => {
      const assetData = {};
      const token = generateJWTToken(globalInvalidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(assetData)
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
      const assetData = {};
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .send(assetData)
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

  describe('Get Asset', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_asset_2',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`GET ${mainApiURL}/:id -> get a asset`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .get(`${mainApiURL}/${createdAssetID}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          assetName: expect.any(String),
          categoryId: expect.any(Number),
          assetSpec: expect.any(String),
          assetLocation: expect.any(String),
          installedDate: expect.any(String),
          state: expect.any(String),
        })
      );
    });

    test(`GET ${mainApiURL}/:id -> 404 when the asset is not found`, async () => {
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

  describe('Edit Asset', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_asset_3',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`PUT ${mainApiURL}/:id -> update an asset`, async () => {
      const assetData = {
        name: 'Laptop Testing 123',
        category: 2,
        specification: 'Laptop Testing 123',
        installedDate: '2021-08-19',
        state: enumAssetState.NOT_AVAILABLE,
        location: 'HCM',
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .put(`${mainApiURL}/${createdAssetID}`)
        .set('Authorization', `Bearer ${token}`)
        .send(assetData)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          assetName: expect.any(String),
          categoryId: expect.any(Number),
          assetSpec: expect.any(String),
          assetLocation: expect.any(String),
          installedDate: expect.any(String),
          state: expect.any(String),
        })
      );
    });

    test(`PUT ${mainApiURL}/:id -> 403 when the token is not valid`, async () => {
      const assetData = {
        name: 'Laptop Testing 123',
        category: 2,
        specification: 'Laptop Testing 123',
        installedDate: '2021-08-19',
        state: enumAssetState.NOT_AVAILABLE,
        location: 'HCM',
      };
      const token = generateJWTToken(globalInvalidUser);

      const response = await request(app)
        .put(`${mainApiURL}/${createdAssetID}`)
        .set('Authorization', `Bearer ${token}`)
        .send(assetData)
        .expect('Content-Type', /json/)
        .expect(403);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    });

    test(`PUT ${mainApiURL}/:id -> 422 when the asset data is insufficient`, async () => {
      const assetData = {
        name: 'Laptop Testing 123',
        category: 2,
        specification: 'Laptop Testing 123',
        installedDate: '2021-08-19',
        state: enumAssetState.NOT_AVAILABLE,
      };
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .put(`${mainApiURL}/${createdAssetID}`)
        .set('Authorization', `Bearer ${token}`)
        .send(assetData)
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

  describe('Delete Asset', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'Test',
        lastName: 'This Is A',
        dateOfBirth: '2000-07-30',
        gender: 'Male',
        joinedDate: '2021-08-02',
        userType: 'Admin',
        staffCode: 'SD0020',
        username: 'testing_asset_4',
        userLocation: 'HCM',
        password: encrypt('123456'),
      };

      await createMockupUser(userData);
      generateInvalidUser();
    });

    afterAll(async () => removeMockupUser());

    test(`DELETE ${mainApiURL}/:id -> delete an asset`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .delete(`${mainApiURL}/${createdAssetID}`)
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
        .delete(`${mainApiURL}/${createdAssetID}`)
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

    test(`DELETE ${mainApiURL}/:id -> 404 when the asset is not found`, async () => {
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
