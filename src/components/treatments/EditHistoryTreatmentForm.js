import React from 'react';
import moment from 'moment';
import { treatsOptions } from '../../utils';
import jQuery from 'jquery';


class EditHistoryTreatmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.treatment ? moment(props.treatment.date).format("YYYY-MM-DD HH:mm").toString() : moment(),
            reason: props.treatment ? props.treatment.reason : '',
            error: '',
            selected: props.treatment && !jQuery.isEmptyObject(props.treatment.selected) ? treatsOptions.filter((option) => props.treatment.selected.includes(option.label)).map((option) => option.label) : [],

        }
    }

    onSubmit = ((e) => {
        e.preventDefault();
        console.log(this.props);
    })

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}

                <p className="page-header__title" style={{ marginBottom: 10 }}>מטופל - {this.props.treatment.clientName}</p>


                <div>
                    <button className="button" style={{ marginTop: 26 }}>עדכון טיפול</button>
                </div>
            </form>
        )
    }
}



export default EditHistoryTreatmentForm;