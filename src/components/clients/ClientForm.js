import React from 'react';
import DualListBox from 'react-dual-listbox';
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import moment from 'moment';
import jQuery from 'jquery';
import Switch from "react-switch";
import { treatsOptions } from '../../utils';


export default class ClientForm extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            fullName: props.client ? props.client.fullName : '',
            address: props.client ? props.client.address : '',
            note: props.client ? props.client.note : '',
            birthday: props.client ? moment(props.client.birthday).format("YYYY-MM-DD").toString() : '',
            sex: props.client ? props.client.sex : 'זכר',
            isActive: props.client ? props.client.isActive : true,
            error: '',
            buttonText: props.client ? 'עדכון מטופל' : 'הוסף מטופל',
            selected: props.client && !jQuery.isEmptyObject(props.client.selected) ? treatsOptions.map((option) => props.client.selected.includes(option.label) ? option.value : false) : [],
        }
    }

    onNameChange = (e) => {
        const fullName = e.target.value;
        if (fullName.match(/^[א-ת0-9 ]{0,25}$/))
            this.setState(() => ({ fullName }))
    }

    onBirthdayChange = (e) => {
        const birthday = e.target.value;

        this.setState(() => ({ birthday }));
    }


    onAddressChange = (e) => {
        const address = e.target.value;
        this.setState(() => ({ address }))
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }))
    }

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    }
    v

    onChangeTreats = (selected) => {
        this.setState({ selected });
    };

    onSubmit = ((e) => {
        e.preventDefault();

        if (!this.state.fullName || !this.state.address) {
            const errorMsg = 'אנא מלא/י שם וכתובת'
            this.setState(() => ({ error: errorMsg }));
            window.scrollTo(0, 240);


        } else {
            // clear error
            this.setState(() => ({ error: '' }));

            let treats = [];
            treatsOptions.forEach(element => {
                if (this.state.selected.includes(element.value)) {
                    treats.push(element.label);
                }
            });
            this.props.onSubmit({
                fullName: this.state.fullName,
                address: this.state.address,
                note: this.state.note,
                isActive: this.state.isActive,
                birthday: new Date(this.state.birthday).getTime(),
                selected: treats,
                sex: this.state.sex
            });
        }
    })

    render() {

        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}

                <div className="form-item-activity">
                    <p className="page-header__title" style={{ marginLeft: 20 }}>מצב פעילות</p>
                    <Switch onChange={() => { this.setState(() => ({ isActive: !this.state.isActive })) }} checked={this.state.isActive} />
                </div>


                <p className="page-header__title" style={{ marginBottom: 10 }}>שם מלא</p>
                <input className="text-input thirty"
                    type="text"
                    placeholder="שם מלא"
                    autoFocus
                    value={this.state.fullName}
                    onChange={this.onNameChange}
                />

                <p className="page-header__title" style={{ marginBottom: 10 }}>כתובת</p>
                <input className="text-input thirty"
                    maxLength={20}
                    type="text"
                    placeholder="כתובת"
                    value={this.state.address}
                    onChange={this.onAddressChange}
                />

                <div>
                    <p className="page-header__title" style={{ marginBottom: 10 }}>תאריך לידה</p>

                    <input
                        className="text-input"
                        type="date"
                        placeholder="תאריך לידה"
                        autoFocus
                        value={this.state.birthday}
                        onChange={this.onBirthdayChange}
                        min="1920-01-01"
                        max="2050-12-31"
                    />
                </div>



                <p className="page-header__title" style={{ marginBottom: 10 }}>מין</p>

                <select className="select"
                    style={{ width: 100 }}

                    onChange={(e) => {
                        if (e.target.value === 'male') {
                            this.setState(() => ({ sex: 'זכר' }))
                        }
                        else if (e.target.value === 'female') {
                            this.setState(() => ({ sex: 'נקבה' }))
                        }
                    }}
                >
                    <option value="male">זכר</option>
                    <option value="female" selected={this.state.sex === 'נקבה'}>נקבה</option>
                </select>


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

                <textarea className="textarea"
                    placeholder=" מידע על המטופל (אופציונלי)"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>

                <div>

                    <button className="button" style={{ marginTop: 26 }}>{this.state.buttonText}</button>
                </div>
            </form >
        );
    }
}
