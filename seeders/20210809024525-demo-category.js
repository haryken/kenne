module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Categories', [
      {
        categoryName: 'Laptop',
        categorySlug: 'LP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Monitor',
        categorySlug: 'MO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Persional Computer',
        categorySlug: 'PC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Categories', null, {}),
};
