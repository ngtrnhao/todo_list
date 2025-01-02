import React from "react";

function ConfirmDialog({isOpen,message,onConfirm,onCancel}){
    if(!isOpen) return null;

    return (
        <div className ="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Xác nhận</button>
                    <button onClick={onCancel}>Hủy</button>
                </div>
            </div>
        </div>
    )
}
export default ConfirmDialog;