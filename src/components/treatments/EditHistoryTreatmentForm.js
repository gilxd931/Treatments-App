import React from 'react';
import moment from 'moment';
import { treatsOptions } from '../../utils';
import jQuery from 'jquery';
import { InputMoment } from 'react-input-moment';
import DualListBox from 'react-dual-listbox';
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import Select from 'react-select';
import { cardsTypeOptions } from '../../utils';

const NoOptionsMessage = () => {
    return (
        <p className="no-options-message-text">אין תוצאות</p>
    );
};

class EditHistoryTreatmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.treatment ? moment(props.treatment.date).format("YYYY-MM-DD HH:mm").toString() : moment(),
            reason: props.treatment ? props.treatment.reason : '',
            error: '',
            selected: props.treatment && !jQuery.isEmptyObject(props.treatment.selected) ? treatsOptions.filter((option) => props.treatment.selected.includes(option.label)).map((option) => option.label) : [],
            treatmentProcess: props.treatment.treatmentProcess ? props.treatment.treatmentProcess : '',
            selfFeedback: props.treatment.selfFeedback ? props.treatment.selfFeedback : '',
            clientFeedback: props.treatment.clientFeedback ? props.treatment.clientFeedback : '',
            bachFlowersPurpose: props.treatment.bachFlowersPurpose ? props.treatment.bachFlowersPurpose : '',
            bachFlowersExtracts: props.treatment.bachFlowersExtracts ? props.treatment.bachFlowersExtracts : '',
            bachFlowersTime: props.treatment.bachFlowersTime ? props.treatment.bachFlowersTime : '',
            bachFlowersHow: props.treatment.bachFlowersHow ? props.treatment.bachFlowersHow : '',
            bachFlowersSynergyPurpose: props.treatment.bachFlowersSynergyPurpose ? props.treatment.bachFlowersSynergyPurpose : '',
            cardsPurpose: props.treatment.cardsPurpose ? props.treatment.cardsPurpose : '',
            cardsType: props.treatment.cardsType ? props.treatment.cardsType : ''

        }
    }

    onSubmit = ((e) => {
        e.preventDefault();
        let obj = {
            date: new Date(this.state.date).getTime(),
            selected: this.state.selected,
            reason: this.state.reason,
            treatmentProcess: this.state.treatmentProcess,
            selfFeedback: this.state.selfFeedback,
            clientFeedback: this.state.clientFeedback,
            bachFlowersPurpose: this.state.bachFlowersPurpose,
            bachFlowersExtracts: this.state.bachFlowersExtracts,
            bachFlowersTime: this.state.bachFlowersTime,
            bachFlowersHow: this.state.bachFlowersHow,
            bachFlowersSynergyPurpose: this.state.bachFlowersSynergyPurpose,
            cardsPurpose: this.state.cardsPurpose,
            cardsType: this.state.cardsType
        }
        this.props.onSubmit(obj);
    })

    onDateChange = ((date) => {
        if (moment(date) < moment()) {
            this.setState({ date })
        }
    });

    onReasonChange = (e) => {
        const reason = e.target.value;
        this.setState({ reason });
    }

    onSelfFeedbackChange = (e) => {
        const selfFeedback = e.target.value;
        this.setState({ selfFeedback });
    }

    onClientFeedbackChange = (e) => {
        const clientFeedback = e.target.value;
        this.setState({ clientFeedback });
    }


    onTreatmentProcessChange = (e) => {
        const treatmentProcess = e.target.value;
        this.setState({ treatmentProcess });
    }

    oncardsPurposeChange = (e) => {
        const cardsPurpose = e.target.value;
        this.setState({ cardsPurpose });
    }

    onChangeTreats = (selected) => {
        this.setState({ selected });

    };

    onbachFlowersPurposeChange = (e) => {
        const bachFlowersPurpose = e.target.value;
        this.setState({ bachFlowersPurpose });
    }

    onbachFlowersTimeChange = (e) => {
        const bachFlowersTime = e.target.value;
        this.setState({ bachFlowersTime });
    }

    onbachFlowersHowChange = (e) => {
        const bachFlowersHow = e.target.value;
        this.setState({ bachFlowersHow });
    }

    onbachFlowersExtractsChange = (e) => {
        const bachFlowersExtracts = e.target.value;
        this.setState({ bachFlowersExtracts });
    }

    onbachFlowersSynergyPurposeChange = (e) => {
        const bachFlowersSynergyPurpose = e.target.value;
        this.setState({ bachFlowersSynergyPurpose });
    }

    onCardsTypeChange = (type) => {
        this.setState({ cardsType: type.label });
    }

    render() {
        const { clientName } = this.props.treatment;
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}

                <p className="page-header__title" style={{ marginBottom: 50 }}>עבור <span style={{ fontWeight: 1000, fontSize: 20 }}>{clientName}</span></p>

                <p className="page-header__title">מועד</p>
                <div className="thirty">
                    <InputMoment
                        moment={moment(this.state.date)}
                        onChange={this.onDateChange}
                        locale="he"
                    />
                </div>

                <p className="page-header__title" style={{ marginBottom: 0 }}> סוגי טיפולים</p>
                <div className="treats-title" style={{ marginBottom: 0 }}>
                    <p>אפשרויות</p>
                    <p>נבחרו</p>
                </div>
                <DualListBox
                    options={treatsOptions}
                    onChange={this.onChangeTreats}
                    selected={this.state.selected}
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

                <p className="page-header__title" style={{ marginBottom: 10 }}>סיבת הגעה</p>
                <textarea className="textarea"
                    placeholder="סיבת הגעה (אופציונלי)"
                    value={this.state.reason}
                    onChange={this.onReasonChange}
                >
                </textarea>

                <div className="form__edit-history-treatment-seperator"></div>

                <p className="page-header__title" style={{ marginBottom: 10 }}>מהלך הטיפול</p>
                <textarea className="textarea"
                    placeholder="מהלך הטיפול (אופציונלי)"
                    value={this.state.treatmentProcess}
                    onChange={this.onTreatmentProcessChange}
                >
                </textarea>

                <p className="page-header__title" style={{ marginBottom: 10 }}>פידבק מטופל</p>
                <textarea className="textarea"
                    placeholder="פידבק מטופל (אופציונלי)"
                    value={this.state.clientFeedback}
                    onChange={this.onClientFeedbackChange}
                >
                </textarea>

                <p className="page-header__title" style={{ marginBottom: 10 }}>פידבק עצמי</p>
                <textarea className="textarea"
                    placeholder="פידבק עצמי (אופציונלי)"
                    value={this.state.selfFeedback}
                    onChange={this.onSelfFeedbackChange}
                >
                </textarea>

                {this.state.selected.includes("פרחי בך") &&
                    <div>
                        <p className="page-header__title" style={{ marginBottom: 10 }}>פרחי בך</p>
                        <div className="form__edit-history-data">

                            <div className="form__edit-history-data__item">
                                <span>סוגי תמציות</span>
                                <textarea className="textarea"
                                    placeholder="סוגי תמציות"
                                    value={this.state.bachFlowersExtracts}
                                    onChange={this.onbachFlowersExtractsChange}
                                >
                                </textarea>
                            </div>

                            <div className="form__edit-history-data__item">
                                <span>מטרה</span>
                                <textarea className="textarea"
                                    placeholder="מטרה"
                                    value={this.state.bachFlowersPurpose}
                                    onChange={this.onbachFlowersPurposeChange}
                                >
                                </textarea>
                            </div>

                            <div className="form__edit-history-data__item">
                                <span>זמן השימוש</span>
                                <textarea className="textarea"
                                    placeholder="זמן השימוש"
                                    value={this.state.bachFlowersTime}
                                    onChange={this.onbachFlowersTimeChange}
                                >
                                </textarea>
                            </div>

                            <div className="form__edit-history-data__item">
                                <span>אופן השימוש</span>
                                <textarea className="textarea"
                                    placeholder="אופן השימוש"
                                    value={this.state.bachFlowersHow}
                                    onChange={this.onbachFlowersHowChange}
                                >
                                </textarea>
                            </div>

                            <div className="form__edit-history-data__item">
                                <span>מטרת הסינרגיה</span>
                                <textarea className="textarea"
                                    placeholder="מטרת הסינרגיה"
                                    value={this.state.bachFlowersSynergyPurpose}
                                    onChange={this.onbachFlowersSynergyPurposeChange}
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                }

                {this.state.selected.includes("קלפים טיפוליים") &&
                    <div>
                        <p className="page-header__title" style={{ marginBottom: 10 }}>קלפים טיפוליים</p>
                        <div className="form__edit-history-data">

                            <div className="form__edit-history-data__item">
                                <span>מטרת הטיפול</span>
                                <textarea className="textarea"
                                    placeholder="מטרת הטיפול"
                                    value={this.state.cardsPurpose}
                                    onChange={this.oncardsPurposeChange}
                                >
                                </textarea>
                            </div>

                            <div className="form__edit-history-data__item">
                                <span>סוגי קלפים</span>
                                <Select
                                    className="form__edit-history-data__select"
                                    options={cardsTypeOptions}
                                    placeholder={"סוג קלפים..."}
                                    onChange={this.onCardsTypeChange}
                                    components={{ NoOptionsMessage }}
                                    selec
                                    value={{ label: this.state.cardsType, value: this.state.cardsType }}

                                />
                            </div>

                        </div>
                    </div>
                }

                {this.state.selected.includes("ארומתרפיה") &&
                    <div>

                    </div>}

                <div>
                    <button className="button" style={{ marginTop: 26 }}>עדכון טיפול</button>
                </div>
            </form >
        )
    }
}



export default EditHistoryTreatmentForm;