/* eslint-disable no-await-in-loop */
const request = require('supertest');
const app = require('../../app');
const { Users } = require('../../models');
const { generateAssetsSortObject } = require('../../controllers/reports.controller');
const { encrypt } = require('../../utils/encryptor');
const { generateJWTToken } = require('../../utils/generateJWTToken');

const mainApiURL = `/api/v1/reports`;

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

describe('Reports API', () => {
  describe('Generate Filter and Sort Objects', () => {
    it('Generate Assets Sort Object Function', () => {
      const sortObjectOne = generateAssetsSortObject('category', 'ASC');
      const sortObjectTwo = generateAssetsSortObject('total', 'ASC');
      const sortObjectThree = generateAssetsSortObject('assigned', 'ASC');
      const sortObjectFour = generateAssetsSortObject('available', 'ASC');
      const sortObjectFive = generateAssetsSortObject('notAvailable', 'ASC');
      const sortObjectSix = generateAssetsSortObject('waiting_for_recycling', 'ASC');
      const sortObjectSeven = generateAssetsSortObject('recycled', 'ASC');

      expect(sortObjectOne).toEqual(expect.any(Array));
      expect(sortObjectTwo).toEqual(expect.any(Array));
      expect(sortObjectThree).toEqual(expect.any(Array));
      expect(sortObjectFour).toEqual(expect.any(Array));
      expect(sortObjectFive).toEqual(expect.any(Array));
      expect(sortObjectSix).toEqual(expect.any(Array));
      expect(sortObjectSeven).toEqual(expect.any(Array));
    });
  });

  describe('Get Reports', () => {
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

    test(`GET ${mainApiURL} -> get reports`, async () => {
      const token = generateJWTToken(globalValidUser);

      const response = await request(app)
        .get(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.rows).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            categoryName: expect.any(String),
            total: expect.any(Number),
            COUNT_WAITING_FOR_RECYCLING: expect.any(Number),
            COUNT_RECYCLED: expect.any(Number),
            COUNT_NOT_AVAILABLE: expect.any(Number),
            COUNT_AVAILABLE: expect.any(Number),
            COUNT_ASSIGNED: expect.any(Number),
          }),
        ])
      );
    });

    test(`GET ${mainApiURL} -> 403 when the token is not valid`, async () => {
      const token = generateJWTToken(globalInvalidUser);

      const response = await request(app)
        .get(`${mainApiURL}`)
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
  });
});
