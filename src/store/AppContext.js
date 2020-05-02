import * as React from "react";

const AppContext = React.createContext();

const initialState = {
    colors: ["magenta", "red", "green", "orange", "pink", "blue", "indigo", "violet"],
    fileDetails: {
        fileName: "",
        fileType: "",
        fileSize: "",
        isValid: false,
        fileUploaded: false,
    },
    graphData: {},
    plotChart: false,
    savedToServer: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "RESET":
            return initialState;

        case "UPDATE_FILE_DETAILS":
            return { ...state, fileDetails: action.payload };

        case "UPDATE_FILE_VALIDATION":
            return {
                ...state,
                fileDetails: {
                    ...state.fileDetails,
                    isValid: false
                }
            };

        case "UPDATE_PLOT_CHART":
            return { ...state, plotChart: action.payload};
        
        case "UPDATE_GRAPH_DATA":
            console.log("UPDATE_GRAPH_DATA");
            return { ...state, graphData: action.payload };

        default: return initialState;
    }
};

function AppContextProvider(props) {
    let [state, dispatch] = React.useReducer(reducer, initialState);
    let value = { state, dispatch };
    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );
}

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };