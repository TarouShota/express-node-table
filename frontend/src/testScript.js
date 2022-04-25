import React, { useEffect, useState } from "react";



const { Children } = require("react");
const { ColumnCalcsModule } = require("tabulator-tables");

// // import './App.css'
// import 'react-tabulator/lib/styles.css';
// import { ReactTabulator } from 'react-tabulator'
// import { Tabulator } from 'tabulator-tables';
// function submitFile() {

//     let formData = new FormData()
//     formData.append('file', file);

//     const fetchItems = async () => fetch("/api/tweets", {
//         // mode: 'no-cors',
//         method: 'POST',
//         body: formData
//     })
//         .then((response) => response.json())
//         .then(({ data }) => {
//             if (data.length) {
//                 return data
//                 console.log(data[1], data);
//                 data[0].push("jine");

//                 data.forEach((element, index) => {
//                     if (index == 0) {
//                         return
//                     }
//                     element.push("0")
//                 })

//                 let allArrays = data.slice(1, data.length);

//                 setTableRows(data[0]);
//                 setValues(allArrays);

//                 console.log(tableRows);
//                 console.log(values)
//                 const columns = data[0]
//                 /* Converting the array of arrays into an array of objects. */
//                 rows = data.splice(1).map((arr) => {

//                     const stateObject = {}
//                     columns.forEach((column, index) => {
//                         stateObject[column] = arr[index]
//                     })
//                     return stateObject
//                 })

//                 /* Adding a new property to each object in the array. */
//                 rows.forEach(element => {
//                     element.jine = "0"
//                 });
//                 console.log(rows);

//                 // console.log(rows, columns)

//                 const table = new Tabulator("#csvTable", {
//                     height: "300px",
//                     data: rows,
//                     autoColumns: true
//                 });
//             } else {
//                 alert('The CSV is empty')
//             }
//         })
//         .catch((e) => alert(e.message))
//     return fetchItems()
// }







let testArray = [["first", "1", "5", "10", "0"], ["second", "3", "7", "12", "0"], ["third", "5", "9", "14", "0"], ["fourth", "4", "8", "13", "0"]]
//'second', "3", "7", "12","0"
// , ["third", "5", "9", "14","0"]

let childObj = {}

//export the func
/**
 * It takes an array of arrays and returns an object with the first element of each array as the key
 * and the rest of the elements as the value.
 * @param jsonArray - [["1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
 * "0", "0", "0", "0
 * @returns {
 *     "1": {
 *         "1": {
 *             "clicked": true,
 *             "value": "0"
 *         },
 *         "2": {
 *             "clicked": false,
 *             "value": "1"
 *         },
 *         "3": {
 *             "
 */
export function objectConverter(jsonArray) {
    if (jsonArray == undefined) {
        return
    }

    let stateObject = {}
    jsonArray.forEach((element, index) => {
        // console.log(element[0])
        // console.log(element[index]);


        // console.log(stateObject[`${element[index]}`])
        element.forEach((e, childIndex) => {
            if (childIndex === 0) {
                return stateObject[`${element[0]}`] = {}
            }
            if (e == "0") {
                Object.assign(childObj, {
                    [childIndex]: {
                        clicked: true,
                        value: e

                    }
                })
            } else {
                Object.assign(childObj, {
                    [childIndex]: {
                        clicked: false,//make it false
                        value: e

                    }
                })
            }

            // console.log(e);

        });
        Object.assign(stateObject[`${element[0]}`], childObj);

    });
    return stateObject
}

let finalTestArray = (objectConverter(testArray))












/**
 * It takes an object with a bunch of nested objects, and returns an array of objects with the same
 * keys as the nested objects, but with the value of the nested objects added together.
 * @param testingObject - {
 * @returns An array of objects.
 */
export function calculateHours(testingObject) {
    let finalJson = [];
    for (const key in testingObject) {
        let finalObj = {}
        finalObj['nazev'] = key
        finalObj['hodiny'] = 0
        // key
        for (const childKey in testingObject[`${key}`]) {


            if (testingObject[`${key}`][`${childKey}`].clicked) {
                finalObj['hodiny'] += parseInt(testingObject[`${key}`][`${childKey}`].value)

                // finalObj['first'] = testingObject['1'].value
            }

        }
        finalJson.push(finalObj)

        // console.log(finalJson)
    }

    return finalJson

}















