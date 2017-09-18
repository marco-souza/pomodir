import React from "react";
import { connect } from "react-redux";
import LoggerFactory from "utils/logger";
import styles from "./styles";

type Props = {
    init: Number,
    interval: Number,
    type: String,
    max: ?Number,
    min: ?Number,
    editable: ?Boolean,
}

let Logger = new LoggerFactory("NumberSelect");

const mapDispatchToProps = dispatch => {
    return {
        setCounter: ( value, type, max ) => {
            dispatch({ type, value, max });
        }
    };
};

class Component extends React.Component<Props> {

    static defaultProps: Props = {
        init: 0,
        interval: 1,
        min: 0,
        max: 100,
        editable: true
    }

    componentWillMount() {
        let logger = Logger.create("componentDidMount");
        logger.info("enter");
    }

    render() {
        return (
            <div className={styles.main} >
                <div
                    className={this.props.editable ? styles.button : styles.buttonDisabled}
                    onClick={() => {
                        let result = this.props.init + this.props.interval;
                        this.props.setCounter( result < this.props.max ? result : this.props.max, this.props.type, this.props.max );
                    }}
                >+</div>

                <div>
                    { ("" + this.props.init).length > 1 ?
                        "" + this.props.init : "0" + this.props.init }
                </div>

                <div
                    className={this.props.editable ? styles.button : styles.buttonDisabled}
                    onClick={() => {
                        let result = this.props.init - this.props.interval;
                        this.props.setCounter( result > this.props.min ? result : this.props.min , this.props.type );
                    }}
                >-</div>
            </div>
        );
    }
}



// Connect with redux
export default connect(
    null,
    mapDispatchToProps
)(Component);