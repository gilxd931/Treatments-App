import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import jQuery from 'jquery';
import { InputMoment } from 'react-input-moment';
import DualListBox from 'react-dual-listbox';
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown, FaPlusCircle } from 'react-icons/fa';
import { cardsTypeOptions, treatsOptions } from '../../utils';
import { AromatherapySynergy } from '../../objects/AromatherapySynergy';
import AromSynergyItem from './AromSynergyItem';
import { getTreatmentImages } from '../../actions/treatments';



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
            price: props.treatment ? props.treatment.price : '0',
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
            treatmentPurpose: props.treatment.treatmentPurpose ? props.treatment.treatmentPurpose : '',
            cardsUsed: props.treatment.cardsUsed ? props.treatment.cardsUsed : '',
            cardsType: props.treatment && !jQuery.isEmptyObject(props.treatment.cardsType) ? cardsTypeOptions.filter((cardType) => props.treatment.cardsType.includes(cardType.label)).map((cardType) => cardType.label) : [],
            aromatherapySynergyList: props.treatment.aromatherapySynergyList ? props.treatment.aromatherapySynergyList : [],
            treatmentImages: [],
            treatmentImagesNames: props.treatment.treatmentImagesNames ? props.treatment.treatmentImagesNames : [],
            displayImagesUrls: []
        }

    }

    componentDidMount() {
        this.state.treatmentImagesNames.forEach(name => {
            this.props.getTreatmentImages(this.props.treatment.id, name).then((url) => {
                let newState = this.state.displayImagesUrls;
                newState.push(url);
                this.setState({ displayImagesUrls: newState });
            });
        })

    }

    onSubmit = ((e) => {
        e.preventDefault();

        if (!this.state.price) {
            const errorMsg = 'אנא מלא/י מחיר'
            this.setState(() => ({ error: errorMsg }));
            window.scrollTo(0, 240);
        }

        let treatmentNewNames = this.state.treatmentImagesNames;
        for (let i = 0; i < this.state.treatmentImages.length; i++) {
            treatmentNewNames.push(this.state.treatmentImages[i].name);
        }

        let obj = {
            date: new Date(this.state.date).getTime(),
            selected: this.state.selected,
            reason: this.state.reason,
            price: this.state.price,
            treatmentProcess: this.state.treatmentProcess,
            selfFeedback: this.state.selfFeedback,
            clientFeedback: this.state.clientFeedback,
            bachFlowersPurpose: this.state.bachFlowersPurpose,
            bachFlowersExtracts: this.state.bachFlowersExtracts,
            bachFlowersTime: this.state.bachFlowersTime,
            bachFlowersHow: this.state.bachFlowersHow,
            bachFlowersSynergyPurpose: this.state.bachFlowersSynergyPurpose,
            treatmentPurpose: this.state.treatmentPurpose,
            cardsType: this.state.cardsType,
            aromatherapySynergyList: this.state.aromatherapySynergyList,
            treatmentImagesNames: treatmentNewNames,
            cardsUsed: this.state.cardsUsed
        }
        this.props.onSubmit(obj, this.state.treatmentImages);
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

    onTreatmentPurposeChange = (e) => {
        const treatmentPurpose = e.target.value;
        this.setState({ treatmentPurpose });
    }

    onCardsUsedChange = (e) => {
        const cardsUsed = e.target.value;
        this.setState({ cardsUsed });
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

    onCardsTypeChange = (cardsType) => {
        this.setState({ cardsType });
    }

    onPriceChange = (e) => {
        const price = e.target.value;
        if (price.match(/^[0-9]+$/) || price === "") {
            this.setState({ price });
        }
    }

    onFileUpload = (e) => {
        const files = e.target.files;
        this.setState({ treatmentImages: files });
    }

    addNewSynergy = () => {
        if (this.state.aromatherapySynergyList.length < 5) {
            let aromatherapySynergy = new AromatherapySynergy(this.state.aromatherapySynergyList.length + 1);
            this.state.aromatherapySynergyList.push(aromatherapySynergy);
            this.setState({ aromatherapySynergyList: this.state.aromatherapySynergyList });
        }
    }

    updateSynergyList = (id, type, prop) => {
        let newList = this.state.aromatherapySynergyList;

        switch (prop) {
            case "carrier":
                newList[id - 1].carrier = type;
                break;
            case "carrierOil":
                newList[id - 1].carrierOil = type;
                break;
            case "extractsList":
                newList[id - 1].extractsList = type;
                break;
            case "consumeTime":
                newList[id - 1].consumeTime = type;
                break;
            case "purpose":
                newList[id - 1].purpose = type;
                break;
            case "formOfUse":
                newList[id - 1].formOfUse = type;
                break;
            case "removeSynergy":
                newList.splice([id - 1], 1);
                break;
        }

        this.setState({ aromatherapySynergyList: newList });
    }


    render() {
        const { clientName } = this.props.treatment;
        return (
            <form className="form" onSubmit={this.onSubmit} encType="multipart/form-data">
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

                <p className="page-header__title" style={{ marginBottom: 10 }}>מחיר</p>
                <input className="text-input ten"
                    type="text"
                    placeholder="מחיר"
                    value={this.state.price}
                    onChange={this.onPriceChange}
                />

                <p className="page-header__title" style={{ marginBottom: 10 }}>מטרת הטיפול</p>
                <textarea className="textarea"
                    placeholder="מטרת הטיפול"
                    value={this.state.treatmentPurpose}
                    onChange={this.onTreatmentPurposeChange}
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

                <input type="file" onChange={this.onFileUpload} multiple />

                <div className="form__edit-images">
                    {
                        this.state.displayImagesUrls.map((url) => (
                            < img src={url} alt="תמונה מהטיפול" width="25%" height="300" />
                        ))
                    }
                </div>


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
                                <span>סוגי קלפים</span>
                                <DualListBox
                                    options={cardsTypeOptions}
                                    onChange={this.onCardsTypeChange}
                                    selected={this.state.cardsType}
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
                            <div className="form__edit-history-data__item">
                                <span>קלפים בשימוש</span>
                                <textarea className="textarea"
                                    placeholder="קלפים בשימוש"
                                    value={this.state.cardsUsed}
                                    onChange={this.onCardsUsedChange}
                                >
                                </textarea>
                            </div>

                        </div>
                    </div>
                }

                {this.state.selected.includes("ארומתרפיה") &&
                    <div>
                        <p className="page-header__title" style={{ marginBottom: 10 }}>ארומתרפיה</p>
                        {
                            this.state.aromatherapySynergyList.map((synergy) => (
                                <AromSynergyItem key={synergy.id}
                                    {...synergy}
                                    updateSynergyList={(type, prop) => this.updateSynergyList(synergy.id, type, prop)}
                                />
                            ))
                        }
                        {this.state.aromatherapySynergyList.length < 5 ?
                            <i className="form__edit-history-add-icon" onClick={this.addNewSynergy}>
                                <FaPlusCircle style={{ marginTop: 30 }} data-tip="סינרגיה חדשה" />
                            </i> : undefined
                        }
                    </div>
                }

                <div>
                    <button className="button" style={{ marginTop: 26 }}>עדכון טיפול</button>
                </div>
            </form >
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    getTreatmentImages: (treatmentId, imageName) => dispatch(getTreatmentImages(treatmentId, imageName))
});


export default connect(undefined, mapDispatchToProps)(EditHistoryTreatmentForm);

