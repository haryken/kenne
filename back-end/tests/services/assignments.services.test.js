const moment = require('moment');
const {
  getAllAssignment,
  createAssignment,
  editAssignment,
  deleteAssignment,
} = require('../../services/assignments.service');
const { createAsset } = require('../../services/assets.service');
const { enumAssetState } = require('../../utils/enums.util');

describe('Assignments Services', () => {
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

  test(`Create Assignment Function`, async () => {
    const assignmentData = {
      assignedDate: '2021-08-20',
      note: 'Hello',
      assignedTo: 2,
      assignedAsset: createdAssetID,
    };
    const newAssignment = await createAssignment(assignmentData, 1);

    createdAssignmentID = newAssignment.id;

    expect(newAssignment.note).toEqual(assignmentData.note);
    expect(newAssignment.assignedTo).toEqual(assignmentData.assignedTo);
    expect(newAssignment.assignedAsset).toEqual(assignmentData.assignedAsset);
    expect(moment(newAssignment.assignedDate).format('YYYY-MM-DD')).toEqual(
      assignmentData.assignedDate
    );
  });

  test(`Get All Assignment Function`, async () => {
    const assignments = await getAllAssignment();

    expect(assignments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          assignedDate: expect.any(String),
          note: expect.any(String),
          assignmentState: expect.any(String),
          assignedTo: expect.any(Number),
          assignedBy: expect.any(Number),
          assignedAsset: expect.any(Number),
        }),
      ])
    );
  });

  test(`Update Assignment Function`, async () => {
    const modifiedAssignmentData = {
      id: createdAssignmentID,
      assignedDate: '2021-08-22',
      note: 'Hello There',
      assignedTo: 3,
      assignedAsset: createdAssetID,
    };
    const updatedAssignment = await editAssignment(modifiedAssignmentData);

    expect(updatedAssignment.id).toEqual(modifiedAssignmentData.id);
    expect(updatedAssignment.note).toEqual(modifiedAssignmentData.note);
    expect(updatedAssignment.assignedTo).toEqual(modifiedAssignmentData.assignedTo);
    expect(updatedAssignment.assignedAsset).toEqual(modifiedAssignmentData.assignedAsset);
    expect(moment(updatedAssignment.assignedDate).format('YYYY-MM-DD')).toEqual(
      modifiedAssignmentData.assignedDate
    );
  });

  test(`Delete Assignment Function`, async () => {
    const deletedAssignment = await deleteAssignment(createdAssignmentID);

    expect(deletedAssignment).toEqual(1);
  });
});
