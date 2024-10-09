// AlertContext.tsx
import React, { createContext, ReactNode, useState } from "react";

//context states
interface AlertState {
  type: string;
  visible: boolean;
  title: string;
  body: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  setAlert: (title: string, body: string, type: string) => void;
  setPrimaryButton: (text: string, action: () => void) => void;
  setSecondaryButton: (text: string, action: () => void) => void;
}

// initial state
const initialState: AlertState = {
  type: "",
  visible: false,
  title: "",
  body: "",
  primaryButtonText: "",
  secondaryButtonText: "",
  setAlert: () => {},
  setPrimaryButton: () => {},
  setSecondaryButton: () => {},
};

// Create the context
const AlertContext = createContext<AlertState>(initialState);

interface AlertProviderProps {
  children: ReactNode; // Use ReactNode to allow for any valid React child
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [type, setType] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [primaryButtonText, setPrimaryButtonText] = useState<string>("");
  const [secondaryButtonText, setSecondaryButtonText] = useState<string>("");
  const [primaryButtonFunction, setPrimaryButtonFunction] = useState<
    () => void
  >(() => () => {});
  const [secondaryButtonFunction, setSecondaryButtonFunction] = useState<
    () => void
  >(() => () => {});

  const setAlert = (title: string, body: string, type: string) => {
    setTitle(title);
    setBody(body);
    setType(type);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setTitle("");
    setBody("");
    setType("");
  };

  const setPrimaryButton = (text: string, action: () => void) => {
    setPrimaryButtonText(text);
    setPrimaryButtonFunction(() => action);
  };

  const setSecondaryButton = (text: string, action: () => void) => {
    setSecondaryButtonText(text);
    setSecondaryButtonFunction(() => action);
  };

  return (
    <AlertContext.Provider
      value={{
        type,
        visible,
        title,
        body,
        primaryButtonText,
        secondaryButtonText,
        setAlert,
        setPrimaryButton,
        setSecondaryButton,
      }}
    >
      {children}
      {visible && (
        <AlertUI
          title={title}
          body={body}
          type={type}
          primaryButtonText={primaryButtonText}
          primaryButtonFunction={primaryButtonFunction}
          secondaryButtonText={secondaryButtonText}
          secondaryButtonFunction={secondaryButtonFunction}
          onClose={handleClose}
        />
      )}
    </AlertContext.Provider>
  );
};

// Alert UI Component
const AlertUI: React.FC<{
  title: string;
  body: string;
  type: string;
  primaryButtonText: string;
  primaryButtonFunction: () => void;
  secondaryButtonText: string;
  secondaryButtonFunction: () => void;
  onClose: () => void;
}> = ({
  title,
  body,
  type,
  primaryButtonText,
  primaryButtonFunction,
  secondaryButtonText,
  secondaryButtonFunction,
  onClose,
}) => {
  return (
    <div
      className="alert-container"
      style={{ position: "absolute", alignSelf: "center" }}
    >
      <div className="alert-box">
        {/* //responsive icon container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            alignSelf: "stretch",
          }}
        >
          <img
            src={
              //handle this later ra
              type === "info"
                ? "./../../public/assets/icons/info-icon.svg"
                : type === "error"
                ? "./../../public/assets/icons/info-icon.svg"
                : "./../../public/assets/icons/info-icon.svg"
            }
            alt={`${type} icon`}
          />
        </div>

        <h3 style={{ alignSelf: "stretch", fontWeight: 600 }}>{title}</h3>
        <h4
          style={{
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "20px",
            color: "rgba(21, 25, 32, 0.50)",
          }}
        >
          {body}
        </h4>
        <div>
          {/* {secondaryButtonText && (
            <button
              onClick={() => {
                secondaryButtonFunction();
                onClose();
              }}
            >
              {secondaryButtonText}
            </button>
          )} */}
          <div
            className="buttons-container"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <button
              className="button-outline button-m"
              style={{
                flex: 1,
                width: "100%",
                border: "1px solid inside rgba(86, 103, 137, 0.26)",
              }}
              onClick={onClose}
            >
              <h4
                style={{
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "20px",
                  color: "rgba(21, 25, 32, 0.50)",
                }}
              >
                Cancel
              </h4>
            </button>
            {primaryButtonText && (
              <button
                className="button-m"
                style={{
                  flex: 1,
                  width: "100%",
                }}
                onClick={() => {
                  primaryButtonFunction();
                  onClose();
                }}
              >
                <h4
                  style={{
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "20px",
                    color: "white",
                  }}
                >
                  {primaryButtonText}
                </h4>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the context and provider
export default AlertContext;
