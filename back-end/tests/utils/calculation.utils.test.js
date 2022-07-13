const { createPassword, createStaffCode, calculateAge } = require('../../utils/calculation.util');

describe('Calculation Utils', () => {
  test(`Create Password Function`, () => {
    const username = 'admin';
    const dob = new Date('2000-11-18').setHours(0, 0, 0, 0);
    const password = createPassword(username, dob);

    expect(password).toEqual('admin@18112000');
  });

  test(`Create Staffcode Function`, () => {
    expect(createStaffCode(1)).toEqual('SD0001');
    expect(createStaffCode(10)).toEqual('SD0010');
    expect(createStaffCode(100)).toEqual('SD0100');
    expect(createStaffCode(1000)).toEqual('SD1000');
    expect(createStaffCode(10000)).toEqual('SD10000');
  });

  test(`Calculate Age Function`, () => {
    expect(
      calculateAge(
        new Date('2000-11-18').setHours(0, 0, 0, 0),
        new Date('2018-11-18').setHours(0, 0, 0, 0)
      )
    ).toEqual(18);

    expect(
      calculateAge(
        new Date('2000-11-18').setHours(0, 0, 0, 0),
        new Date('2018-10-18').setHours(0, 0, 0, 0)
      )
    ).toEqual(17);

    expect(
      calculateAge(
        new Date('2000-11-18').setHours(0, 0, 0, 0),
        new Date('2045-11-18').setHours(0, 0, 0, 0)
      )
    ).toEqual(45);

    expect(
      calculateAge(
        new Date('2000-11-18').setHours(0, 0, 0, 0),
        new Date('2030-10-18').setHours(0, 0, 0, 0)
      )
    ).toEqual(29);
  });
});
