import React, { useEffect, useState } from "react";

const { Children } = require("react");
const { ColumnCalcsModule } = require("tabulator-tables");




let childObj = {};





/**
 * It takes a 2D array and returns an object with the first element of each array as the key and the
 * rest of the elements as the value.
 * 
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
 *             "clicked": false,
 *             "value": "2
 */
export function objectConverter(jsonArray) {
    if (jsonArray == undefined) {
        return;
    }

    let stateObject = {};
    jsonArray.forEach((element, index) => {

        element.forEach((e, childIndex) => {
            if (childIndex === 0) {
                return (stateObject[`${element[0]}`] = {});
            }
            if (e == "0") {
                Object.assign(childObj, {
                    [childIndex]: {
                        clicked: true,
                        value: e,
                    },
                });
            } else {
                Object.assign(childObj, {
                    [childIndex]: {
                        clicked: false,
                        value: e,
                    },
                });
            }

            // console.log(e);
        });
        Object.assign(stateObject[`${element[0]}`], childObj);
    });
    return stateObject;
}

// let finalTestArray = (objectConverter(testArray))

/**
 * It takes an object with a bunch of nested objects, and returns an array of objects with the same
 * keys as the nested objects, but with the value of the nested objects added together.
 * @param testingObject - {
 * @returns An array of objects.
 */
export function calculateHours(testingObject) {
    let finalJson = [];
    for (const key in testingObject) {
        let finalObj = {};
        finalObj["nazev"] = key;
        finalObj["hodiny"] = 0;
        // key
        for (const childKey in testingObject[`${key}`]) {
            if (testingObject[`${key}`][`${childKey}`].clicked) {
                finalObj["hodiny"] += parseInt(
                    testingObject[`${key}`][`${childKey}`].value
                );

                // finalObj['first'] = testingObject['1'].value
            }
        }
        finalJson.push(finalObj);

        // console.log(finalJson)
    }

    return finalJson;
}
