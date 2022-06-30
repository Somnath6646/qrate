import React from "react";
import "../../css/YesNoDialog.css";
import "../../css/BaseDialog.css";

const YesNoDialog = ({ isOpen, message, closeDialog, action }) => {
  var dialog = (
    <div
      class="base-dialog"
      onClick={() => {
        closeDialog();
      }}
    >
      <div
        class="delete-tag-dialog-container "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div class="add-tag-dialog-content">
          <div class="upper-container">
            <div class="delete-dialog-title-text">{message}</div>
          </div>
          <div class="action-button-containers">
            <div
              class="yes-button"
              onClick={() => {
                action();
              }}
            >
              <div class="yes-text">Yes</div>
            </div>
            <div
              class="no-button"
              onClick={() => {
                closeDialog();
              }}
            >
              <div class="no-text">No</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) dialog = null;

  return <div>{dialog}</div>;
};

export default YesNoDialog;
