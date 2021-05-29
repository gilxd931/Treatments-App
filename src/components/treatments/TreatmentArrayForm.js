import React from 'react';
import DualListBox from 'react-dual-listbox';
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import jQuery from 'jquery';
import { treatsOptions } from '../../utils';


export default class TreatmentArrayForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            arrayName: props.treatArray ? props.treatArray.arrayName : '',
            buttonText: props.treatArray ? 'עדכון מערך' : 'הוסף מערך',
            info: props.treatArray ? props.treatArray.info : '',
            selected: props.treatArray && !jQuery.isEmptyObject(props.treatArray.selected) ?
                treatsOptions.filter((option) => props.treatArray.selected.includes(option.label)).map((option) => option.label) : [],

        }
    }

    onChangeTreats = (selected) => {
        this.setState({ selected });
    };

    onInfoChange = (e) => {
        const info = e.target.value;
        this.setState(() => ({ info }))
    }


    onArrayNameChange = (e) => {
        const arrayName = e.target.value;
        this.setState(() => ({ arrayName }))
    }

    onSubmit = ((e) => {
        e.preventDefault();


        // clear error
        this.setState(() => ({ error: '' }));

        if (this.state.arrayName === "") {
            const errorMsg = 'אנא מלא/י שם מערך'
            this.setState(() => ({ error: errorMsg }));
        }
        else if (this.state.info === "") {
            const errorMsg = 'אנא מלא/י את תיאור מערך הטיפול'
            this.setState(() => ({ error: errorMsg }));
        }
        else if (this.state.selected.length === 0) {
            const errorMsg = 'אנא מלא/י לפחות סוג טיפול אחד'
            this.setState(() => ({ error: errorMsg }));
        }
        else {
            this.props.onSubmit({
                fullName: this.state.fullName,
                address: this.state.address,
                note: this.state.note,
                isActive: this.state.isActive,
                birthday: new Date(this.state.birthday).getTime(),
                selected: this.state.selected,
                sex: this.state.sex
            });
        }
    })

    render() {

        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}

                <div>
                    <p className="page-header__title " style={{ marginBottom: 10 }}>שם המערך</p>
                    <input className="text-input"
                        type="text"
                        placeholder="שם המערך"
                        value={this.state.arrayName}
                        onChange={this.onArrayNameChange}
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
                <textarea className="textarea"
                    placeholder="תיאור מערך הטיפול"
                    value={this.state.info}
                    onChange={this.onInfoChange}
                >
                </textarea>
                <div>
                    <button className="button" style={{ marginTop: 26 }}>{this.state.buttonText} </button>
                </div>
            </form >
        );
    }
}
