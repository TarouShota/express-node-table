## React-Table app which reads .csv files


<!-- https://user-images.githubusercontent.com/46716452/168608430-ec21c373-c333-47ee-96c4-6d664567b6cb.mp4 -->

![New Recording - 16_05_2022, 15_48_41-high](https://user-images.githubusercontent.com/46716452/168609006-8059d838-4a70-4e1f-bc43-e2ad6bf83ed3.gif)


### Upload your .csv file with the ';' delimeter, edit it, export the new .csv file



### How to start the back-end side 

Change the directory to the back-end folder

```bash
cd back-end
```
<!-- 
 Install the required packages
```bash
npm install bootstrap csv-parse csv-stringify express fs multer nodemon
```


After installing all of the required dependencies -->

```bash
npm run server
```

The uploaded file is saved on the server and it is not connected to cloud storage



### How to run the frontend side

Open another terminal


 Change directory to the frontend folder

```bash
cd frontend
```



<!-- 
 Install all of the required dependancies 

```bash
npm install axios bootstrap csv-parse csv-parser http-proxy-middleware multer react-do react-router-dom
```


 After installing all of the required dependencies -->

```bash
npm start
```


 The csv data delimeter is -> `;`


