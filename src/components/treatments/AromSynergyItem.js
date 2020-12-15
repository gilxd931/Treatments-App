import React from 'react';
import { aromCarriars, aromFormOfUse } from '../../utils';
import Select from 'react-select';
import { FaPlusCircle, FaMinusCircle, FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { AromatherapyExtract } from '../../objects/AromatherapyExtract';
import AromExtractItem from './AromExtractItem';
import DualListBox from 'react-dual-listbox';

const NoOptionsMessage = () => {

    return (
        <p className="no-options-message-text">אין תוצאות</p>
    );
};

class AromSynergyItem extends React.Component {

    state = {
        carrier: this.props.carrier ? this.props.carrier : "",
        carrierOil: this.props.carrierOil ? this.props.carrierOil : undefined,
        extractsList: this.props.extractsList ? this.props.extractsList : [],
        purpose: this.props.purpose ? this.props.purpose : "",
        consumeTime: this.props.consumeTime ? this.props.consumeTime : "",
        formOfUse: this.props.formOfUse ? this.props.formOfUse : []
    };

    onSynergyChangeCarrier = (type) => {
        this.setState({ carrier: type.label });
        this.props.updateSynergyList(type.label, "carrier");
    }

    onCarrierOilChange = (e) => {
        const carrierOil = e.target.value;
        this.setState(() => ({ carrierOil }))
        this.props.updateSynergyList(carrierOil, "carrierOil");
    }

    addNewExtract = () => {
        if (this.state.extractsList.length < 6) {
            let aromatherapySynergy = new AromatherapyExtract(this.state.extractsList.length + 1);
            this.state.extractsList.push(aromatherapySynergy);
            this.setState({ extractsList: this.state.extractsList });
        }
    }

    updateExtractsList = (id, type, prop) => {
        let newList = this.state.extractsList;

        switch (prop) {
            case "name":
                newList[id - 1].name = type;
                break;
            case "amount":
                newList[id - 1].amount = type;
                break;
            case "removeExtract":
                newList.splice([id - 1], 1);
                break;
        }

        this.setState({ extractsList: newList });
        this.props.updateSynergyList(this.state.extractsList, "extractsList");
    }

    removeSynergy = () => {
        this.props.updateSynergyList(undefined, "removeSynergy");
    }

    onPurposeChange = (e) => {
        const purpose = e.target.value;
        this.setState(() => ({ purpose }))
        this.props.updateSynergyList(purpose, "purpose");
    }

    onConsumeTimeChange = (e) => {
        const consumeTime = e.target.value;
        this.setState(() => ({ consumeTime }))
        this.props.updateSynergyList(consumeTime, "consumeTime");
    }

    onFormOfUseChange = (formOfUse) => {
        this.setState({ formOfUse });
        this.props.updateSynergyList(formOfUse, "formOfUse");

    };

    render() {

        const { id } = this.props;

        return (
            <div>

                <div className="form__edit-synergy-title-icon">
                    <p className="form__edit-history-aromSynergy-title"> סינרגיה {id}</p>
                    <i className="form__edit-history-add-icon__red" onClick={this.removeSynergy}>
                        <FaMinusCircle data-tip="הסרת סינרגיה" />
                    </i>
                </div>

                <div className="form__edit-history-row">
                    <div className="form__edit-history-data__item">
                        <span>נשא</span>
                        <Select
                            className="form__edit-history-data__select"
                            options={aromCarriars}
                            placeholder={"נשא..."}
                            onChange={this.onSynergyChangeCarrier}
                            components={{ NoOptionsMessage }}
                            selec
                            value={{ label: this.state.carrier, value: this.state.carrier }}

                        />
                    </div>


                    {this.state.carrier === "שמן" && <div className="form__edit-history-data__item">
                        <span>שמן נשא</span>

                        <input
                            className="text-input-thin"
                            type="text"
                            placeholder="שמן נשא"
                            autoFocus
                            value={this.state.carrierOil}
                            onChange={this.onCarrierOilChange}
                        />
                    </div>
                    }
                </div>

                {
                    this.state.extractsList.map((extract) => (
                        <AromExtractItem key={extract.id}
                            {...extract}
                            updateExtractsList={(type, prop) => this.updateExtractsList(extract.id, type, prop)}
                        />
                    ))
                }



                {this.state.extractsList.length == 0 ?
                    <i className="form__edit-history-add-icon__purple" onClick={this.addNewExtract}>
                        <FaPlusCircle data-tip="תמצית חדשה" />
                    </i> : undefined
                }

                {this.state.extractsList.length >= 1 && this.state.extractsList.length < 6 ?
                    <i className="form__edit-history-add-icon__purple" style={{ marginRight: 100 }} onClick={this.addNewExtract}>
                        <FaPlusCircle data-tip="תמצית חדשה" />
                    </i> : undefined
                }

                <div className="form__edit-history-column">

                    <div className="form__edit-history-data__item">
                        <span>מטרת הסינרגיה</span>
                        <textarea className="textarea"
                            style={{ marginBottom: 30 }}
                            placeholder="מטרת הסינרגיה"
                            value={this.state.purpose}
                            onChange={this.onPurposeChange}
                        >
                        </textarea>
                    </div>

                    <div className="form__edit-history-data__item">
                        <span>זמן השימוש</span>
                        <input
                            className="text-input-thin"
                            type="text"
                            style={{ marginBottom: 30 }}
                            placeholder="זמן שימוש"
                            autoFocus
                            value={this.state.consumeTime}
                            onChange={this.onConsumeTimeChange}
                        />
                    </div>

                    <div className="form__edit-history-data__item">
                        <span style={{ marginBottom: 10 }}>צורת שימוש</span>
                        <DualListBox
                            options={aromFormOfUse}
                            onChange={this.onFormOfUseChange}
                            selected={this.state.formOfUse}
                            canFilter
                            filterPlaceholder="פילטר..."
                            icons={{
                                moveLeft: <FaChevronRight key={1} />,
                                moveAllLeft: [
                                    <FaChevronRight key={2} />,
                                    <FaChevronRight key={3} />
                                ],
                                moveRight: <FaChevronLeft key={1} />,
                                moveAllRight: [
                                    <FaChevronLeft key={2} />,
                                    <FaChevronLeft key={3} />,
                                ],
                                moveDown: <FaChevronDown />,
                                moveUp: <FaChevronUp />,
                            }}
                        />
                    </div>
                </div>

            </div>
        )
    }
}


export default AromSynergyItem;