import React from 'react';
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import moment from 'moment';
import jQuery from 'jquery';
import { treatsOptions } from '../../utils';
import DualListBox from 'react-dual-listbox';
import Select from 'react-select'
import { connect } from 'react-redux';
import { InputMoment } from 'react-input-moment';
import '../../styles/css/input-moment.css';


const NoOptionsMessage = () => {
    return (
        <p className="no-options-message-text">אין תוצאות</p>
    );
};

class TreatmentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clientName: props.treatment ? props.treatment.clientName : '',
            date: props.treatment ? moment(props.treatment.date).format("YYYY-MM-DD HH:mm").toString() : moment(),
            reason: props.treatment ? props.treatment.reason : '',
            error: '',
            selected: props.treatment && !jQuery.isEmptyObject(props.treatment.selected) ? treatsOptions.filter((option) => props.treatment.selected.includes(option.label)).map((option) => option.label) : [],
            buttonText: props.treatment ? 'עדכון טיפול' : 'הוסף טיפול',
            price: props.treatment ? props.treatment.price : ''

        }
    }


    activeClients = this.props.clients.filter((client) => client.isActive).map((client) => ({ value: client.fullName, label: client.fullName }));

    onChangeTreats = (selected) => {
        this.setState({ selected });
    };

    onClientChange = (client) => {
        this.setState({ clientName: client.label });
    }
    onReasonChange = (e) => {
        const reason = e.target.value;
        this.setState({ reason });
    }

    onPriceChange = (e) => {
        const price = e.target.value;
        if (price.match(/^[0-9]+$/) || price === "") {
            this.setState({ price });
        }
    }


    onSubmit = ((e) => {
        e.preventDefault();

        if (!this.state.clientName) {
            const errorMsg = 'אנא מלא/י שם מטופל'
            this.setState(() => ({ error: errorMsg }));
            window.scrollTo(0, 240);
        } else if (this.state.selected.length === 0) {
            const errorMsg = 'אנא מלא/י סוג טיפול'
            this.setState(() => ({ error: errorMsg }));
            window.scrollTo(0, 240);

        }
        else if (parseInt(this.state.price) < 0 || parseInt(this.state.price) > 9999 || this.state.price === "") {
            const errorMsg = 'אנא בחר/י מחיר הגיוני'
            this.setState(() => ({ error: errorMsg }));
            window.scrollTo(0, 240);

        } else {
            this.props.onSubmit({
                clientName: this.state.clientName,
                date: new Date(this.state.date).getTime(),
                selected: this.state.selected,
                reason: this.state.reason,
                price: this.state.price,
                clientId: this.props.clients.find((client) => client.fullName === this.state.clientName).id
            });
        }
    })




    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>

                {this.state.error && <p className="form__error">{this.state.error}</p>}


                <p className="page-header__title" style={{ marginBottom: 10 }}>מטופל\ת</p>
                <Select
                    options={this.activeClients}
                    className="thirty"
                    placeholder={"שם מלא..."}
                    onChange={this.onClientChange}
                    components={{ NoOptionsMessage }}
                    selec
                    value={{ label: this.state.clientName, value: this.state.clientName }}

                />

                <p className="page-header__title">מועד</p>
                <div className="thirty">
                    <InputMoment
                        moment={moment(this.state.date)}
                        onChange={date => this.setState({ date })}
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

                <div>
                    <button className="button" style={{ marginTop: 26 }}>{this.state.buttonText}</button>
                </div>
            </form>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        clients: state.clients
    }
}


export default connect(mapStateToProps)(TreatmentForm);
