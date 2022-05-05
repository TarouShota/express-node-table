import React, { useEffect, useState } from 'react';

// import './App.css'
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'
import { Tabulator } from 'tabulator-tables';
import { ReactTable } from './components/react-table';
import { useTable } from 'react-table'

/* Checking if the react version is the same. */
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

/**
 * It takes a CSV file, converts it into an array of objects, and then adds a new property to each
 * object in the array.
 */
export function ReadCsv() {
    /* A React hook that is used to store the values of the table. */
    const [tableRows, setTableRows] = useState([]);

    //State to store the values
    const [values, setValues] = useState([]);



    let file = null;
    function fileInput(e) {
        //setting the columns of the csv table
        file = e.target.files[0]
        // console.log(e.target.files[0]);
    }
    /**
     * It fetches a CSV file, in a json format, then converts it into an array of
     * objects
     *
     */
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
                    console.log(data[0], data);
                    
                    //removing the first array from the object
                    let allArrays = data.slice(1, data.length);

                    setTableRows(data[0]);
                    setValues(allArrays);

                     /* Setting the columns of the table. */
                    
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

