import React, { Fragment } from 'react';
import { AppContext } from './store/AppContext';
import CSVReader from 'react-csv-reader';
import { Alert } from 'react-bootstrap';
import '../node_modules/react-linechart/dist/styles.css';
import Jumbotron from 'react-bootstrap/Jumbotron'

const papaparseOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,  
    transformHeader: header =>
        header
            .toLowerCase()
            .replace(/\W/g, '_')
  
}

const parseSeriesData = (uploadedData) => {
    let parsedData = [];

    if(Array.isArray(uploadedData)){
        uploadedData.forEach(rows => {
            let record = [];
            let series = rows[0];

            for (var i = 1; i < rows.length; i++) {
                const data = rows[i].split("|");
                record.push({x: data[0], y: data[1]});
            }
            
            parsedData.push({points: record, name: series});
        });
    }
    else{

    }
}


function FileUploader() {
    const { state, dispatch } = React.useContext(AppContext);

    const onFileUpload = (data, fileInfo) => {
        console.log(data, fileInfo);
        const fileNameValidationRegex = new RegExp("^.+\\.(xlsx|xls|csv)$");
        let fileValid = false;

        if (fileNameValidationRegex.test(fileInfo.name)) {
            fileValid = true;
        }

        const fileDetails = {
            fileName: fileInfo.name,
            fileType: fileInfo.type,
            fileSize: fileInfo.size,
            isValid: fileValid,
            fileUploaded: true,
        };
        dispatch({ type: "UPDATE_FILE_DETAILS", payload: fileDetails });

        // if file is valid, update to store
        if (fileValid) {
            dispatch({ type: "UPDATE_GRAPH_DATA", payload: data });
        }
    };

    const uploadError = () => {
        console.log("File upload error");
    }

    return (
        <Fragment>
            {!state.fileDetails.isValid && state.fileDetails.fileUploaded &&
                <Alert variant="danger" onClose={() => { }} dismissible>
                    <Alert.Heading>Upload file is an invalid file.</Alert.Heading>
                </Alert>
            }

            <Jumbotron>
                <h1>Series Plotter</h1>
                <br />
                <CSVReader
                    cssClass="csv-reader-input"
                    label="Upload file in csv format  "
                    onFileLoaded={onFileUpload}
                    onError={uploadError}
                    parserOptions={papaparseOptions}
                    inputId="ObiWan"
                    inputStyle={{ color: 'red' }}
                />

            </Jumbotron>


        </Fragment>
    );

}

export default FileUploader;