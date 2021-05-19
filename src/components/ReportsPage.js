import React from 'react';
import calculateTreatmentsPrices from '../selectors/CalculateTreatmentsPrices';
import { connect } from 'react-redux';


import PieChart, {
    Series,
    Label,
    Connector,
    Size,
    Export
} from 'devextreme-react/pie-chart';


const ReportsPage = (props) => {



    const pricesList = calculateTreatmentsPrices(props.historyTreatments);

    return (
        <div className="form__edit-images">
            <PieChart
                id="pie"
                dataSource={pricesList}
                title="פילוח כמות טיפולים"
            >
                <Series
                    argumentField="treat"
                    valueField="count"
                >
                    <Label visible={true}>
                        <Connector visible={true} width={1} />
                    </Label>
                </Series>

                <Size width={700} />
                <Export enabled={true} />
            </PieChart>
            <PieChart
                id="pie"
                dataSource={pricesList}
                palette="Bright"
                title="פילוח רווחי טיפולים"
            >
                <Series
                    argumentField="treat"
                    valueField="price"
                >
                    <Label visible={true}>
                        <Connector visible={true} width={1} />
                    </Label>
                </Series>

                <Size width={700} />
                <Export enabled={true} />
            </PieChart>


        </div >
    );
};


const mapStateToProps = (state) => {
    return {
        futureTreatments: state.futureTreatments,
        historyTreatments: state.historyTreatments
    };
};

export default connect(mapStateToProps)(ReportsPage);

