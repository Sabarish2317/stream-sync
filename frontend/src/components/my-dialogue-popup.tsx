import React from "react";

interface MyDialoguePopupProps {
  title: string;
  content: string;
  primaryAction: Function;
  secondaryAction: Function;
  primaryActionText: string;
  secondaryActionText: string;
  primaryActionColor: string;
}

const MyDialoguePopup: React.FC<MyDialoguePopupProps> = ({
  title,
  content,
  primaryAction,
  primaryActionText,
  primaryActionColor,
  secondaryAction,
  secondaryActionText,
}) => {
  return (
    <div className="background-wrapper-for-dialogue">
      <div className="my-dialogoue-popup">
        <h3 style={{ color: primaryActionColor, fontWeight: "600" }}>
          {title}
        </h3>
        <h4>{content}</h4>
        <div
          className="buttons-row row"
          style={{ justifyContent: "end", gap: "12px" }}
        >
          <div
            className="secondary terinary-button"
            onClick={() => secondaryAction}
          >
            <h5 style={{ fontWeight: "500" }}>{secondaryActionText}</h5>
          </div>
          <div
            className="primary terinary-button"
            onClick={() => primaryAction}
            style={{ backgroundColor: primaryActionColor }}
          >
            <h5 style={{ fontWeight: "500", color: "white" }}>
              {primaryActionText}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDialoguePopup;
