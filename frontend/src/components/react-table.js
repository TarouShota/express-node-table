import React, { cloneElement, useEffect, useState } from "react";
import { useTable } from "react-table";
import { objectConverter, calculateHours } from "../testScript";
import "../index.css";

const borderStyle = {};
const activeCell = {
    backgroundColor: "#16DB65",
};

export function ReactTable(jsonArray) {
    // console.log(window.rows)
    /* The above code is creating a variable called rowData and assigning it to the window.rows. The
      window.rows is a global variable that is created in the HTML file. The window.rows is an array of
      objects that contains the row data. The row data is the data that is displayed in the first
      column of the table. */

    let rowData = window.rows;
    let columnData = window.columns;
    let jsonStateArray = jsonArray.jsonArray;
    let convertedArray = objectConverter(jsonStateArray);

    const [cellData, setCellData] = useState(convertedArray);

    const [hourlyRate, setHourlyRate] = useState(0);

    const [totalHours, setTotalHours] = useState(0);

    /* Creating an object with the same keys as the convertedArray. */

    let jineObject = {};
    for (const key in convertedArray) {
        jineObject[key] = 0;
    }
    /* Creating a state variable called value and setting it to the value of jineObject. */
    const [value, setValue] = useState(jineObject);

    /**
     * `const onChange = (e, name) => setValue({...value, [name]: e.target.value})`
     * @param e - the event object
     * @param name - The name of the field.
     */
    const onChange = (e, name) => {
        console.log(e);
        const changeJine = () =>
            setValue({
                ...value,
                [name]: e.target.value,
            });
        changeJine();
    };

    /**
     * It takes a name and a columnIndex as arguments, and then updates the value of the cellData
     * object at the location specified by the name and columnIndex arguments.
     * @param name - the name of the cell
     * @param columnIndex - the index of the column that was clicked
     */
    const updateMyData = (name, columnIndex) => {
        const togleState = () =>
            setCellData({
                ...cellData,
                [name]: {
                    ...cellData[name],
                    [columnIndex]: {
                        ...cellData[name][columnIndex],
                        value: value[name],
                    },
                },
            });
        togleState();
    };

    /**
     * It toggles the state of the clicked property of the object in the cellData array.
     * @param name - the name of the row
     * @param columnIndex - the index of the column that was clicked
     */
    function MudaObject(name, columnIndex) {
        function stateToggle() {
            return !cellData[name][columnIndex].clicked;
        }

        const togleState = () =>
            setCellData({
                ...cellData,
                [name]: {
                    ...cellData[name],
                    [columnIndex]: {
                        ...cellData[name][columnIndex],
                        clicked: stateToggle(),
                    },
                },
            });
        togleState();
    }

    //using the React.use memo, so it would not cause unneccessary rerender
    let data = React.useMemo(() => rowData, []);

    /* Creating an array of objects. */
    let testColumns = [];

    /* Columns of the table */
    columnData.forEach((element, index) => {
        let testObj = {
            Header: element,
            accessor: element,
            id: index,
        };
        testColumns.push(testObj);
    });

    let columns = React.useMemo(() => testColumns, []);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    /**
     * It returns a React element.
     * @returns The function FinalButton is being returned.
     */
    function FinalButton() {
        return (
            <>
                <h4 style={{ marginTop: "2rem" }}>Celkový počet hodin {totalHours}</h4>
                <h4>Celková částka - {totalHours * hourlyRate}</h4>
            </>
        );
    }

    /**
     * It takes an array of objects, adds a new property to each object, and then adds a new object to the
     * end of the array.
     *
     * The new property is called "součet" and it's value is the product of two other properties in the
     * object.
     *
     * The new object is called "celkem" and it's value is the sum of all the "hodiny" properties in the
     * array.
     *
     * The function also sets a global variable called "totalHours" to the value of the "celkem" property.
     *
     * The function also sets a global variable called "lastData" to the array of objects.
     *
     * The function also calls a function called "submitFile" and passes it the array of objects.
     *
     * The function also calls a function called "setTotalHours" and passes it the value of the "celkem"
     * property.
     * @param e - the event object
     */
    function createLastData(e) {
        let lastData = calculateHours(cellData);
        let totalSum = 0;
        lastData.forEach((element) => {
            totalSum += element.hodiny;
            element["součet"] = element.hodiny * hourlyRate;
        });

        lastData[lastData.length] = {
            nazev: "celkem",
            hodiny: totalSum,
            součet: totalSum * hourlyRate,
        };
        // console.log(lastData)
        window.lastData = lastData;
        console.log(window.lastData);
        setTotalHours(totalSum);
        //console.log(window.jsonToCsvData)
        // submitFile(jsonToCsvData)
    }

    /**
     * It takes an array of objects and returns a string of the objects in CSV format.
     * @param objArray - The array of objects that you want to convert to CSV.
     * @returns A string of the data in the format of a CSV file.
     */

    function convertToCSV(objArray) {
        var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
        var str = "";
        // console.log(array)

        for (var i = 0; i < array.length; i++) {
            var line = "";
            for (var index in array[i]) {
                if (line != "") line += ";";

                line += array[i][index];
            }

            str += line + "\r\n";
        }

        return str;
    }

    /**
     * It takes an array of objects, converts it to a CSV string, and then downloads the CSV file.
     * @param headers - An array of strings that will be used as the headers in the CSV file.
     * @param items - The array of objects that you want to export.
     * @param fileTitle - The title of the file you want to export.
     */
    function exportCSVFile(headers, items, fileTitle) {
        if (headers) {
            items.unshift(headers);
        }

        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);

        var csv = convertToCSV(jsonObject);

        var exportedFilenmae = fileTitle + ".csv" || "export.csv";

        var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) {
                // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    /* Creating an object with three properties. */
    let headers = {
        nazev: "nazev".replace(/,/g, ""), // remove commas to avoid errors
        hodiny: "hodiny",
        součet: "součet",
    };

    return (
        <>
            {/* <h1>Zap</h1> */}
            <table {...getTableProps()} className="table table-bordered table-dark ">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, j) => {
                                    /* Checking if the cell is in the first column.
                                                       no click event for the elements in the first column
                                                      */
                                    if (cell.column.Header == testColumns[0].Header) {
                                        return (
                                            <td rowSpan={cell.rowSpan} {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    }

                                    /* Checking if the column header is equal to 'jine'.
                                                         Jine cells have input form, which can be changed
                                                      */
                                    if (cell.column.Header == "jine") {
                                        return (
                                            <td
                                                rowSpan={cell.rowSpan}
                                                {...cell.getCellProps()}
                                                style={activeCell}
                                            >
                                                <input
                                                    style={{ width: "4rem" }}
                                                    value={value[row.cells[0].value]}
                                                    onChange={(e) => onChange(e, row.cells[0].value)}
                                                    onBlur={() =>
                                                        updateMyData(row.cells[0].value, cell.column.id)
                                                    }
                                                ></input>
                                            </td>
                                        );
                                    }
                                    //Default cell render
                                    if (
                                        cellData[row.cells[0].value][cell.column.id].clicked == true
                                    ) {
                                    }

                                    return (
                                        <td
                                            rowSpan={cell.rowSpan}
                                            onClick={() =>
                                                MudaObject(row.cells[0].value, cell.column.id)
                                            }
                                            {...cell.getCellProps()}
                                            style={
                                                cellData[row.cells[0].value][cell.column.id].clicked
                                                    ? activeCell
                                                    : borderStyle
                                            }
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br />
            <input
                style={{ marginBottom: "2rem" }}
                className="form-control"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="hodinova sazba"
            ></input>

            <button className="btn btn-success" onClick={createLastData}>
                {" "}
                Vypočíst
            </button>
            <br />
            <p style={{ marginTop: "0.5rem", opacity: 0.8 }}>
                export only after clicking 'vypočíst'
            </p>

            <FinalButton />
            <button
                type="button"
                className="btn btn-dark"
                onClick={() => exportCSVFile(headers, window.lastData, "perfektniFile")}
                style={{ marginTop: "2rem" }}
            >
                Export csv
            </button>
        </>
    );
}
