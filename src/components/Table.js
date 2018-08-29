import React from "react";
import PropTypes, { array } from "prop-types";

const Table = (props) => {
  const { DATA, headers } = props;

  const renderHeaders = (arr) => {
    const tableHeaders = arr.map((item, index) => {
      return (
        <th key={index}>{item}</th>
      );
    });
    return tableHeaders;
  }

  const renderContent = (arr) => {
    const tableContent = arr.map((obj, index) => {
      const itemsKeys = Object.keys(obj);
      const renderRow = () => {
        const rowContent = itemsKeys.map((key, index) => {
          return (
              <td key={index}>{obj[key]}</td>
          );
        });
        return rowContent;
      }

      return (
        <tr>
          {renderRow()}
        </tr>
      );
    })
    return tableContent;
  }

  return (
    <table className="c-table">
    <tbody>
      <tr>
        {renderHeaders(headers)}
      </tr>
      {renderContent(DATA)}
    </tbody>
    </table>
  );
}

Table.propTypes = {
  DATA: array,
  headers: array.isRequired
}

export default Table;
