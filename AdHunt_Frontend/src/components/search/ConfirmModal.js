import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ConfirmModal({ show, onHide, onSubmit }) {
    return (
        <div>
            <Modal
                style={{ maxHeight: "95vh", overflow: "hidden" }}
                show={show}
                onHide={onHide}
                backdrop="static"
                size={"lg"}
                centered
            >
                <Modal.Header closeButton>
                    <h5 style={{ fontWeight: "bold" }}>Apply?</h5>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "70vh", overflow: "scroll" }}>
                    Are you sure you want to apply to this offer? This can't be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-primary"
                        onClick={onSubmit}
                        size={"lg"}
                    >
                        Yes !
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
