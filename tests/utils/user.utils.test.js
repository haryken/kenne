const { getPagination, getSort, getPagingData, createUsername } = require('../../utils/user.util');

describe('User Utils', () => {
  test(`Create Username Function`, async () => {
    expect(await createUsername('long', 'nguyen van')).toEqual('longnv');
    expect(await createUsername('thang', 'nguyen tan')).toEqual('thangnt');
    expect(await createUsername('linh', 'vo duy')).toEqual('linhvd');
  });

  test(`Get Pagination Function`, () => {
    expect(getPagination().limit).toEqual(10);
    expect(getPagination().offset).toEqual(0);

    expect(getPagination(2, 10).limit).toEqual(10);
    expect(getPagination(2, 10).offset).toEqual(20);

    expect(getPagination(5, 10).limit).toEqual(10);
    expect(getPagination(5, 10).offset).toEqual(50);
  });

  test(`Get Sort Function`, () => {
    expect(getSort().column).toEqual('firstName');
    expect(getSort().sortCol).toEqual('ASC');

    expect(getSort('lastName').column).toEqual('lastName');
    expect(getSort('lastName').sortCol).toEqual('ASC');

    expect(getSort('staffCode', 'DESC').column).toEqual('staffCode');
    expect(getSort('staffCode', 'DESC').sortCol).toEqual('DESC');
  });

  test(`Get Paging Data Function`, () => {
    const paginationData = getPagingData(
      {
        count: 50,
        rows: [],
      },
      1,
      10
    );

    expect(paginationData.currentPage).toEqual(1);
    expect(paginationData.totalPages).toEqual(5);
    expect(paginationData.dataRows).toEqual([]);
    expect(paginationData.totalItems).toEqual(50);
  });
});
