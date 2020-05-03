import React, { Fragment } from 'react';
import { AppContext } from './store/AppContext';
import CSVReader from 'react-csv-reader';
import '../node_modules/react-linechart/dist/styles.css';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';


const papaparseOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header =>
        header
            .toLowerCase()
            .replace(/\W/g, '_')

}

function FileUploader() {
    const { state, dispatch } = React.useContext(AppContext);

    //dispatch({ type: "RESET" });
    const sendData = () => {
        console.log("Sending data to server", JSON.stringify(state.graphData));
        // mock URL
        const url = "https://fusionlabslinechart.free.beeceptor.com";
        (async () => {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(state.graphData)
            });

            let result = await response;
            console.log(result);

        })();
    }

    const parseSeriesData = (uploadedData) => {
        let parsedData = [];
        let colorChoice = 0;
        if (Array.isArray(uploadedData)) {
            uploadedData.forEach(rows => {
                let record = [];
                let series = rows[0];
                if (rows.length > 0) {
                    for (var i = 1; i < rows.length; i++) {
                        if (rows[i] != null) {
                            const data = rows[i].split("|");
                            if(data[0] != null && data[1] != null && 
                                !isNaN(data[0]) && !isNaN(data[1])){
                                record.push({ x: data[0], y: data[1] });
                            }                            
                        }
                    }
                }

                // sort records based on series year
                record.sort((a, b) => a.x - b.x);

                parsedData.push({ points: record, name: series, color: state.colors[colorChoice] });
                colorChoice++;
            });
        }
        else {
            dispatch({ type: "UPDATE_FILE_VALIDATION", payload: false });
        }
        return parsedData;
    }


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
            const parsedData = parseSeriesData(data);

            console.log("parsedData: ", parsedData);

            dispatch({ type: "UPDATE_GRAPH_DATA", payload: parsedData });
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

                <br />
                <Button variant="light"
                    type="reset"
                    value="Reset"
                    onClick={() => { window.location.reload(); }}
                >
                    Reset
                </Button>
                &nbsp;
                {state.fileDetails.fileUploaded && state.fileDetails.isValid &&
                    <Button variant="dark"
                        disabled={!state.fileDetails.fileUploaded && !state.fileDetails.isValid}
                        onClick={() => { dispatch({ type: "UPDATE_PLOT_CHART", payload: true }); }}
                    >
                        Plot Chart
                </Button>
                }
                &nbsp;
                {state.fileDetails.fileUploaded && state.fileDetails.isValid &&
                    <Button variant="dark"
                        disabled={!state.fileDetails.fileUploaded && !state.fileDetails.isValid}
                        onClick={() => { sendData() }}
                    >
                        Send to Server
                </Button>
                }

            </Jumbotron>
        </Fragment>
    );

}

export default FileUploader;