import React from 'react';
import calculateTreatmentsPrices from '../selectors/CalculateTreatmentsPrices';
import { connect } from 'react-redux';
import Select from 'react-select';


import PieChart, {
    Series,
    Label,
    Connector,
    Size,
    Export
} from 'devextreme-react/pie-chart';


function getAvailableYears() {
    const firstYear = 2020;
    const yearsList = [];
    const currYear = new Date().getFullYear();
    for (let i = firstYear; i <= parseInt(currYear); i++) {
        yearsList.push(
            { value: i.toString(), label: i.toString() },
        )
    }
    return yearsList;
}




class ReportsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pricesList: calculateTreatmentsPrices(props.historyTreatments),
            displayYear: new Date().getFullYear()
        }
    }

    yearsList = getAvailableYears();
    recalculatePrices = (year) => {
        const displayYear = year.value
        const pricesList = calculateTreatmentsPrices(this.props.historyTreatments, displayYear);
        this.setState(() => {
            this.setState(() => ({ pricesList, displayYear }))
        })
    }
    render() {
        return (
            <div >
                <div className="year_container">
                    <span>שנה</span>

                    <Select
                        className="reportpage__select_year"
                        options={this.yearsList}
                        placeholder={"שנה"}
                        onChange={this.recalculatePrices}
                        value={{ value: this.state.displayYear, label: this.state.displayYear }}
                    />
                </div>
                <div className="form__edit-images">
                    <PieChart
                        id="pie"
                        dataSource={this.state.pricesList}
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
                        dataSource={this.state.pricesList}
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

                </div>
            </div >
        );
    }
};


const mapStateToProps = (state) => {
    return {
        futureTreatments: state.futureTreatments,
        historyTreatments: state.historyTreatments
    };
};

export default connect(mapStateToProps)(ReportsPage);

