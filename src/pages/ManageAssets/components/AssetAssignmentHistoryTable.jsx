import moment from 'moment';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAssetsAssignmentHistory } from '../../../actions';

const AssetAssignmentHistoryTable = ({ assetID }) => {
  const dispatch = useDispatch();

  const {
    loading,
    assignments: assignmentList,
    error,
  } = useSelector((state) => state.getAssetsAssignmentHistoryReducer);

  useEffect(() => {
    dispatch(getAssetsAssignmentHistory(assetID));
  }, [assetID]);

  const renderAssignmentItems = () =>
    assignmentList.map((assignmentItem) => (
      <tr key={assignmentItem.id}>
        <td>{moment(assignmentItem.assignedDate).format('DD/MM/YYYY')}</td>
        <td>{assignmentItem.Assigned_To.username}</td>
        <td>{assignmentItem.Assigned_By.username}</td>
        <td>
          {assignmentItem.returnedDate
            ? moment(assignmentItem.returnedDate).format('DD/MM/YYYY')
            : 'N/A'}
        </td>
      </tr>
    ));

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (assignmentList && assignmentList.length === 0) {
    return <p>This asset does not have any assignment</p>;
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Assigned To</th>
          <th>Assigned By</th>
          <th>Returned Date</th>
        </tr>
      </thead>
      <tbody>{renderAssignmentItems()}</tbody>
    </Table>
  );
};

export default AssetAssignmentHistoryTable;
