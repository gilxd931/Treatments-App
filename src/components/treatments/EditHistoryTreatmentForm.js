import React from 'react';
import moment from 'moment';
import { treatsOptions } from '../../utils';
import jQuery from 'jquery';
import { InputMoment } from 'react-input-moment';
import DualListBox from 'react-dual-listbox';
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown } from 'react-icons/fa';


class EditHistoryTreatmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.treatment ? moment(props.treatment.date).format("YYYY-MM-DD HH:mm").toString() : moment(),
            reason: props.treatment ? props.treatment.reason : '',
            error: '',
            selected: props.treatment && !jQuery.isEmptyObject(props.treatment.selected) ? treatsOptions.filter((option) => props.treatment.selected.includes(option.label)).map((option) => option.label) : [],
            treatmentProcess: props.treatment ? props.treatment.treatmentProcess : '',
            selfFeedback: props.treatment ? props.treatment.selfFeedback : '',
            clientFeedback: props.treatment ? props.treatment.clientFeedback : ''
        }
    }

    onSubmit = ((e) => {
        e.preventDefault();
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

                <div>
                    <button className="button" style={{ marginTop: 26 }}>עדכון טיפול</button>
                </div>
            </form>
        )
    }
}



export default EditHistoryTreatmentForm;