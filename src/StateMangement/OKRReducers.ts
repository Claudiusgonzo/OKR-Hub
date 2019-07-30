import produce from "immer";
import * as Types from "./OKRActionTypes";
import { OKRMainState } from "../StateMangement/OKRState";
import { NavigationConstants } from "../OKRConstants";

export const initialState: OKRMainState = {
  pageLocation: NavigationConstants.AreaView,
  selectedArea: undefined,
  objectives: undefined,
  areas: undefined,
  error: undefined,
  addPanelExpanded: false,
  editPanelExpandedKey: undefined,
  areaPanelExpanded: false,
  editCommentKey: undefined
}

export const reducer = (state: OKRMainState = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // Navigation
      case Types.navigatePage:
        draft.pageLocation = action.payload.pageLocation;
        break;
      case Types.updateSelectedArea:
        draft.selectedArea = action.payload.selectedArea;
        break;

      // Error
      case Types.setError:
        draft.error = action.payload.error;
        break;

      // Areas
      case Types.getAreasSucceed:
        draft.areas = action.payload;
        // If an area isn't already selected, set the first areas as the selected area
        draft.selectedArea = draft.selectedArea ? draft.selectedArea : draft.areas[0];
        break;
      case Types.toggleAreaPanel:
        draft.areaPanelExpanded = action.payload.expanded
        break;
      case Types.createAreaSucceed:
        draft.areas.push(action.payload)
        draft.areaPanelExpanded = false;
        break;
      case Types.editAreaSucceed:
        draft.areas = draft.areas.map(a => {
          return a.id === action.payload.id ? action.payload : a;
        });
        draft.areaPanelExpanded = false;
        break;

      // Area failures
      case Types.createAreaFailed:
        draft.error = action.error;
        draft.areaPanelExpanded = false;
        break;
      case Types.areaOperationFailed:
        draft.error = action.error;
        break;

      // Objectives
      case Types.getObjectivesSucceed:
        draft.objectives = action.payload;
        break;
      case Types.toggleAddPanel:
        draft.addPanelExpanded = action.payload.expanded;
        break;
      case Types.createOKRSucceed:
        draft.objectives.push(action.payload);
        draft.addPanelExpanded = false;
        break;
      case Types.toggleEditPanel:
        draft.editPanelExpandedKey = action.payload.expandedKey;
        break;
      case Types.editOKRSucceed:
        draft.objectives = draft.objectives.map(o => {
          return o.id === action.payload.id ? action.payload : o;
        });
        draft.editPanelExpandedKey = undefined;
        draft.editCommentKey = undefined;
        break;
      case Types.cancelCreationOrEdit:
        draft.editPanelExpandedKey = undefined;
        draft.addPanelExpanded = false;
        break;
      case Types.editKRComment:
        draft.editCommentKey = action.payload.id;
        break;

      //Objective failures
      case Types.createOKRFailed:
        draft.error = action.error;
        draft.addPanelExpanded = false;
        break;
      case Types.editOKRFailed:
        draft.error = action.error;
        break;
      case Types.getObjectivesFailed:
        draft.objectives = [];
        draft.error = action.error;
        break;

      default:
        return state;
    }
  });
}