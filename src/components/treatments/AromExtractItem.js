import React from 'react';
import { FaMinusCircle } from 'react-icons/fa';

class AromExtractItem extends React.Component {

    state = {
        name: this.props.name ? this.props.name : "",
        amount: this.props.amount ? this.props.amount : 0
    };

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState({ name });
        this.props.updateExtractsList(name, "name");

    }

    onAmounthange = (e) => {
        const amount = e.target.value;
        if (Number.isInteger(parseInt(amount)) && amount > 0 && amount <= 100 || amount === "") {
            this.setState({ amount });
            this.props.updateExtractsList(amount, "amount");

        }
    }

    removeExtract = () => {
        this.props.updateExtractsList(undefined, "removeExtract");

    }
    render() {
        const { id } = this.props;

        return (
            <div style={{ marginRight: 100 }}>
                <p className="form__edit-history-aromSynergy-title"> תמצית {id}</p>

                <div className="form__edit-history-row">
                    <div className="form__edit-history-data__item">
                        <span>שם התמצית</span>

                        <input
                            className="text-input-thin"
                            type="text"
                            placeholder="שם התמצית"
                            autoFocus
                            value={this.state.name}
                            onChange={this.onNameChange}
                        />
                    </div>

                    <div className="form__edit-history-data__item">
                        <span>כמות</span>

                        <input
                            className="text-input-thin"
                            type="text"
                            placeholder="כמות"
                            value={this.state.amount}
                            onChange={this.onAmounthange}
                        />
                    </div>

                    <i className="form__edit-history-add-icon__red" style={{ marginTop: 45 }} onClick={this.removeExtract}>
                        <FaMinusCircle data-tip="הסרת תמצית" />
                    </i>
                </div>
            </div >
        )
    }

}

export default AromExtractItem;