import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'react-bootstrap';
import moment from 'moment';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { getReport, setHeaderTitle } from '../../actions';
import { reportTableHeader } from '../../utils';
import { Paginator } from '../../components/Paginator';
import { ExportXlsx } from './component';

const ViewReport = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'category',
    order: 'ASC',
  });
  const date = moment(new Date()).format('DD/MM/YYYY');
  const { loading, data } = useSelector((state) => state.getReportReducer);
  const fileName = `AMS-Report-${date}`;

  useEffect(() => {
    dispatch(
      getReport({
        ...sortCriteria,
        page,
      })
    );
  }, [sortCriteria, dispatch, page]);

  useEffect(() => {
    dispatch(setHeaderTitle(['Report']));
  }, [dispatch]);

  const handlePageChange = (pageNumber) => setPage(pageNumber);
  const onChangeSortCriteria = (sortBy) => {
    if (sortCriteria.sortBy === sortBy) {
      return setSortCriteria({
        ...sortCriteria,
        sortBy,
        order: sortCriteria.order === 'ASC' ? 'DESC' : 'ASC',
      });
    }

    return setSortCriteria({
      ...sortCriteria,
      sortBy,
      order: 'ASC',
    });
  };
  const renderTableHeaders = () =>
    reportTableHeader.map((tableHeader, index) => {
      if (sortCriteria.sortBy === tableHeader.sortBy) {
        return (
          <th
            className={`sort-table-header-${index.toString()} sort-table-header active`}
            onClick={() => onChangeSortCriteria(tableHeader.sortBy)}
          >
            {tableHeader.name}

            {sortCriteria.order === 'ASC' ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
          </th>
        );
      }
      return (
        <th
          className={`sort-table-header-${index.toString()} sort-table-header`}
          onClick={() => onChangeSortCriteria(tableHeader.sortBy)}
        >
          {tableHeader.name}
          <BsFillCaretUpFill />
        </th>
      );
    });

  const renderRecordList = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    }
    if (!loading) {
      if (data.length === 0) {
        return <h2>No data</h2>;
      }
      return data.map((report) => (
        <>
          <tr className="row-data" key={report.id}>
            <td>{report.categoryName}</td>
            <td>{report.total}</td>
            <td>{report.COUNT_ASSIGNED}</td>
            <td>{report.COUNT_AVAILABLE}</td>
            <td>{report.COUNT_NOT_AVAILABLE}</td>
            <td>{report.COUNT_WAITING_FOR_RECYCLING}</td>
            <td>{report.COUNT_RECYCLED}</td>
          </tr>
        </>
      ));
    }
    return [];
  };

  const renderDataheader = (dataExport) => {
    const newArr = [];
    dataExport.map((item) =>
      newArr.push({
        Category: item.categoryName,
        Total: item.total,
        Assigned: item.COUNT_ASSIGNED,
        Available: item.COUNT_AVAILABLE,
        'Not Available': item.COUNT_NOT_AVAILABLE,
        'Waiting for recycling': item.COUNT_WAITING_FOR_RECYCLING,
        Recycled: item.COUNT_RECYCLED,
      })
    );
    return newArr;
  };

  return (
    <div>
      <h2 className="form-header"> Report </h2>
      <Row>
        <Col sm="2" className="ml-auto mb-2">
          <ExportXlsx csvData={renderDataheader(data)} fileName={fileName} />
        </Col>
      </Row>
      <Row>
        <Col md="12" className="table-report-list">
          <Table responsive className="report-table">
            <thead>
              <tr>{renderTableHeaders()}</tr>
            </thead>
            <tbody>{renderRecordList()}</tbody>
          </Table>
        </Col>
      </Row>
      <Paginator onChangePageNumber={handlePageChange} toTop />
    </div>
  );
};

export default ViewReport;
