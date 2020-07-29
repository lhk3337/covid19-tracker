import React from "react";
import "./Table.css";
function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ countryInfo, country, cases }) => (
        <tr>
          <td>
            <img src={countryInfo.flag}></img>
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
