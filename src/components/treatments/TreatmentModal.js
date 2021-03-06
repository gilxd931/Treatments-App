import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { setSelectedTreatment } from '../../actions/treatsFilters';
import geFilterById from '../../selectors/TreatmentById';
import moment from 'moment';
import { getTreatmentImages } from '../../actions/treatments';

Modal.setAppElement(document.getElementById('app'));


class TreatmentModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            urlList: []
        }
    }

    componentWillMount() {
        const treatmentData = geFilterById(this.props.treatmentsList, this.props.treatsFilters.selectedTreatment);
        const treatmentImagesNames = treatmentData.treatmentImagesNames;
        const id = treatmentData.id;

        let urlList = [];
        if (treatmentImagesNames) {
            treatmentImagesNames.forEach(name => {
                this.props.getTreatmentImages(id, name).then((url) => {
                    urlList.push(url);
                    this.setState({ urlList })

                });
            })
        }

    }

    render() {
        const treatmentData = geFilterById(this.props.treatmentsList, this.props.treatsFilters.selectedTreatment);
        const { clientName, reason, date, selected, selfFeedback, treatmentProcess, clientFeedback, bachFlowersExtracts, bachFlowersHow, bachFlowersPurpose,
            bachFlowersSynergyPurpose, bachFlowersTime, cardsType, cardsPurpose } = treatmentData

        const formatedDate = moment(date).locale('he').format('DD לMMMM YYYY')

        const bachFlowersDisplay = <div>
            <p className="modal__body"> {bachFlowersExtracts && <span>טיפול פרח בך:</span>} </p>
            <div>
                {bachFlowersExtracts && <p>סוגי תמציות:- {bachFlowersExtracts}</p>}
                {bachFlowersPurpose && <p>מטרה- {bachFlowersPurpose}</p>}
                {bachFlowersTime && <p>זמן השימוש- {bachFlowersTime}</p>}
                {bachFlowersHow && <p>אופן השימוש- {bachFlowersHow}</p>}
                {bachFlowersSynergyPurpose && <p>מטרת הסינרגיה- {bachFlowersSynergyPurpose}</p>}
            </div>

        </div>

        const cardsDisplay = <div>
            <p className="modal__body"> {cardsType && <span>קלפים טיפוליים:</span>} </p>
            <div>
                {cardsType && <p>סוג הקלפים- {cardsType.join(', ')}</p>}
                {cardsPurpose && <p>מטרת הטיפול- {cardsPurpose}</p>}

            </div>
        </div>
        return (
            <Modal
                isOpen={!!this.props.treatsFilters.selectedTreatment}
                contentLabel="Selected Option"
                onRequestClose={() => { this.props.setSelectedTreatment('') }}
                closeTimeoutMS={200}
                className="modal"
            >
                <h3 className="modal__title">{formatedDate}</h3>
                <h3 className="modal__title">{clientName}</h3>

                <p className="modal__body"><span>סוגי הטיפול</span>: {selected && selected.join(', ')}.</p>

                <p className="modal__body">{reason && <span>סיבת הטיפול:</span>} {reason}</p>

                <p className="modal__body">{treatmentProcess && <span>מהלך הטיפול:</span>} {treatmentProcess}</p>

                <div className="form__edit-images">
                    {
                        this.state.urlList.map((url) => (
                            < img className="modal_img" key={url} src={url} alt="תמונה מהטיפול" />
                        ))
                    }
                </div>

                <p className="modal__body">{selfFeedback && <span>פידבק עצמי:</span>} {selfFeedback}</p>

                <p className="modal__body"> {clientFeedback && <span>פידבק לקוח:</span>} {clientFeedback}</p>

                {bachFlowersDisplay}
                {cardsDisplay}
                <button className="button" onClick={() => { this.props.setSelectedTreatment('') }}>אוקיי</button>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        treatsFilters: state.treatsFilters,
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSelectedTreatment: (text) => dispatch(setSelectedTreatment(text)),
    getTreatmentImages: (treatmentId, imageName) => dispatch(getTreatmentImages(treatmentId, imageName))

});


export default connect(mapStateToProps, mapDispatchToProps)(TreatmentModal);
