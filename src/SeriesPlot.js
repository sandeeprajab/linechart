import React, { Fragment } from 'react';
import { AppContext } from './store/AppContext';
import LineChart from 'react-linechart';

function SeriesPlot() {
    const { state } = React.useContext(AppContext);
    console.log("graphData: ", state.graphData);
    return (
        <Fragment>
            {
                state.plotChart &&
                <LineChart
                    width={600}
                    height={400}
                    xLabel={'year'}
                    yLabel={'score'}
                    //margins= { top: 50, right: 20, bottom: 50, left: 55 }
                    showLegends= {true}
                    legendPosition="top-right"
                    data={state.graphData}
                />
            }

        </Fragment>

    );
}

export default SeriesPlot;