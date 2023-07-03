import React from "react";
import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";

import { confirmable, createConfirmation } from "react-confirm";

import { Button } from 'reactstrap';
// import "bootstrap/dist/css/bootstrap.min.css";

class Confirmation extends React.Component {
    render() {
        const {
            proceedLabel,
            cancelLabel,
            confirmation,
            show,
            proceed,
            enableEscape = true
        } = this.props;
        return (
            <div className="static-modal">
                <Modal
                    show={show}
                  
                    onHide={() => proceed(false)}
                    backdrop={enableEscape ? true : "static"}
                    keyboard={enableEscape}>

                    <Modal.Body style={{ fontSize: "16px" }}   className="modal-content">{confirmation}</Modal.Body>
                    <Modal.Footer>
                    <div className="row col-md-12">
                        <div className="col-md-6 pull-left">
                            <Button onClick={() => proceed(false)}
                                style={{ backgroundColor: "white", color: "blue" }}

                            >{cancelLabel}</Button>
                        </div>
                        <div className="col-md-6">
                            <Button
                                style={{ backgroundColor: "#24a0ed", color: "white" }}
                                onClick={() => proceed(true)}>
                                {proceedLabel}
                            </Button>
                        </div>
                    </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

Confirmation.propTypes = {
    okLabbel: PropTypes.string,
    cancelLabel: PropTypes.string,
    title: PropTypes.string,
    confirmation: PropTypes.string,
    show: PropTypes.bool,
    proceed: PropTypes.func, // called when ok button is clicked.
    enableEscape: PropTypes.bool
};

export function confirm(
    confirmation,
    proceedLabel = "Yes",
    cancelLabel = "No",
    options = {}
) {
    return createConfirmation(confirmable(Confirmation))({
        confirmation,
        proceedLabel,
        cancelLabel,
        ...options
    });
}
