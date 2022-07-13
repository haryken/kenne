import * as Yup from 'yup';

export const AddAndUpdateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is a required field')
    .max(255)
    .test('name', 'Invalid name', (value) => {
      if (value) {
        const str = value.replace(/\s\s+/g, ' ');
        return str === value;
      }
      return true;
    })
    .test('name', 'Invalid name', (value) => {
      if (value) {
        return !value.slice(-1).includes(' ');
      }
      return true;
    }),
  category: Yup.string().required('Category is a required field'),
  specification: Yup.string().required('Specification is a required field'),
  installedDate: Yup.date()
    .required('Installed Date is a required field')
    .test(
      'installedDate',
      'Installed Date must be before current date!',
      (value) => new Date(value) < new Date()
    ),
  state: Yup.string().required('State is a required field').max(255),
});
