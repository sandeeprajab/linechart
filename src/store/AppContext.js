import * as React from "react";

const AppContext = React.createContext();

const initialState = {
    count: 10,
    currentColor: "#bada55",
    fileDetails: {
        fileName: "",
        fileType: "",
        fileSize: "",
        isValid: false,
        fileUploaded: false,
    },
    graphData: {

    },   

};

const reducer = (state, action) => {
    switch (action.type) {
        case "RESET":
            return initialState;
            
        case "UPDATE_FILE_DETAILS":
            return { ...state, fileDetails: action.payload };

        case "UPDATE_GRAPH_DATA":
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