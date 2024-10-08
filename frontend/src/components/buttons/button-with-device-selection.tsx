import "./../components.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleMediaControllerPopup,
  toggleButton,
  setMediaControllerPopupType,
} from "../../redux state/mediaControllerPopupSlice";
import { AppDispatch, RootState } from "./../../redux state/store";

interface MediaSelectionButtonProps {
  buttonName: string;
  onIcon: string;
  offIcon: string;
  isExpandable?: boolean;
  stateController: boolean;
}

const MediaSelectionButton: React.FC<MediaSelectionButtonProps> = ({
  onIcon,
  offIcon,
  buttonName,
  isExpandable = true,
  stateController,
}) => {
  const { isOpen, type } = useSelector(
    (state: RootState) => state.mediaControllerPopup
  ); // Read the state
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      className="media-selection-button button"
      style={{
        background: stateController ? "#494B4D" : "#DC3912",
      }}
    >
      <img
        src={stateController ? onIcon : offIcon}
        alt={buttonName}
        style={{ cursor: "pointer" }}
        onClick={() => {
          dispatch(toggleButton(buttonName));
        }}
      />
      {isExpandable && stateController && (
        <img
          src="/assets/icons/down-arrow-icon.svg"
          alt={buttonName}
          style={{
            cursor: "pointer",
            rotate: isOpen && type === buttonName ? "180deg" : "0deg",
            transition: "all 0.2s ease-in-out",
          }}
          onClick={() => {
            if (isExpandable) {
              dispatch(toggleMediaControllerPopup());
              dispatch(setMediaControllerPopupType(buttonName));
            }
          }}
        />
      )}
    </div>
  );
};

export default MediaSelectionButton;
