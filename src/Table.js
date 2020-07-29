import React from "react";
import "./style/Table.css";
function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ countryInfo, country, cases }) => (
        <tr>
          <td>
            <img src={countryInfo.flag} alt="countryFlag"></img>
          </td>
          <td>
            <p>{country}</p>
          </td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}
export default Table;
