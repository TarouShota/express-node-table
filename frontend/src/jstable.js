import React, { useEffect, useState } from 'react';

// import './App.css'
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'
import { Tabulator } from 'tabulator-tables';
import { ReactTable } from './components/react-table';
import { useTable } from 'react-table'


export function ReadCsv() {
    const [tableRows, setTableRows] = useState([]);

    //State to store the values
    const [values, setValues] = useState([]);



    let file = null;
    function fileInput(e) {
        file = e.target.files[0]
        // console.log(e.target.files[0]);
    }
    function submitFile() {

        let formData = new FormData()
        formData.append('file', file);

        const fetchItems = async () => fetch("/api/tweets", {
            // mode: 'no-cors',
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then(({ data }) => {
                if (data.length) {
                    // data.forEach((element, index) => {
                    //     if (index == 0) {
                    //         return
                    //     } console.log(element);
                    // })
                  
                    data[0].push("jine");

                    data.forEach((element, index) => {
                        if (index == 0) {
                            return
                        }
                        element.push("0")
                    })
                    console.log(data[1], data);
                    
                    
                    let allArrays = data.slice(1, data.length);

                    setTableRows(data[0]);
                    setValues(allArrays);

                    console.log(tableRows);
                    console.log(values)
                    window.columns = data[0]
                    /* Converting the array of arrays into an array of objects. */
                    window.rows = data.splice(1).map((arr) => {

                        const obj = {}
                        window.columns.forEach((column, index) => {
                            obj[column] = arr[index]
                        })
                        return obj
                    })

                    /* Adding a new property to each object in the array. */
                    window.rows.forEach(element => {
                        element.jine = "0"
                    });
                    console.log(window.rows);

                } else {
                    alert('The CSV is empty')
                }
            })
            .catch((e) => alert(e.message))
        fetchItems()


    }
  function CreateTable() {
        return (
            <table className='table table-bordered table-dark'>
                <thead>
                    <tr>
                        {tableRows.map((rows, index) => {
                            return <th key={index}>{rows}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {values.map((value, index) => {
                        return (
                            <tr key={index}>
                                {value.map((val, i) => {
                                    return <td  key={i}>{val}</td>;
                                })}

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    }





    return (
        <div className="container py-4">
            <h1>Nahrát CSV</h1>
            <label htmlFor='file'>Vyberte file</label>
            <input type='file' className="form-control" name='file' id='file' onChange={fileInput} />
            <button className="btn btn primary mt-2" id="submitFile" onClick={submitFile}>Přečíst</button>
            {/* <div className="mt-2" id="csvTable"></div> */}
            {(window.rows != undefined && window.columns) &&
                <ReactTable jsonArray={values} />
            }

            {/* <h1>{tableRows} and {values}</h1> */}
            {/* <CreateTable /> */}

        </div>

    )
}





    // const data = require("./data");


  

    // function tableClick(e) {
    //     console.log(e)
    //     console.log(e.target.innerText)
    //     console.log()
    // }

