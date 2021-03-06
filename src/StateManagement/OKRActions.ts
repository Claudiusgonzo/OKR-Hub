import * as Actions from "./OKRActionTypes";
import { OKRMainState } from "./OKRState";
import { TimeFrame, TimeFrameSet } from "../TimeFrame/TimeFrame";
import { Area } from "../Area/Area";

export interface IOKRActions {
    // TODO: type the data.        
    navigatePage: (data: any) => {};
    getObjectives: (data: {timeFrameId: string}) => {};
    getAreas: () => {};
    cancelCreationOrEdit: (data: any) => {};
    editOKR: (data: any) => {};
    createOKR: (data: any) => {};
    toggleAddPanel: (data: any) => {};
    toggleEditPanel: (data: any) => {};
    toggleSettings: (data: any) => {};
    editKRStatus: (data: any) => {};
    editKRComment: (data: any) => {};
    editArea: (data: any) => {};
    toggleAreaPanel: (data: any) => {};
    updateSelectedArea: (data: any) => {};
    createArea: (data: any) => {};
    createFirstArea: (data: Area) => {};
    createAreaFailed: (data: any) => {};
    createTimeFrame: (data: TimeFrameSet) => {}; 
    setError: (data: any) => {};
    areaOperationFailed: (data: any) => {};
    objectivesOperationFailed: (data: any) => {};
    removeOKR: (data: any) => {};
    removeArea: (data: any) => {};
    getProjectName: (data: any) => {};
    getTimeFrames: () => {};
    getTimeFramesSucceed: (data: any) => {};
    editTimeFrame: (data: TimeFrameSet) => {};
    editTimeFrameSucceed: (data: any) => {};
    toggleLinkWorkItemPanel: (data: string) => {};
    getWorkItems: (data: number[]) => {};
    addWorkItems: (data: { ids: string[]; objectiveId: string }) => {};
    deleteWorkItems: (data: { id: number; objectiveId: string }) => {};
    openWorkItem: (data: number) => {};
    createFirstAreaSuccess: (data: {timeFrame: TimeFrame, area: Area}) => {};
    updateDisplayedTimeFrame: (data: TimeFrame) => {}; 
}

export const useActions = (state: OKRMainState, dispatch) => ({
    navigatePage: data => dispatch({ type: Actions.navigatePage, payload: data }),
    getObjectives: (data) => dispatch({ type: Actions.getObjectives,payload: data }),
    getAreas: () => dispatch({ type: Actions.getAreas }),
    updateSelectedArea: data => dispatch({ type: Actions.updateSelectedArea, payload: data }),
    cancelCreationOrEdit: data => dispatch({ type: Actions.cancelCreationOrEdit, payload: data }),
    editOKR: data => dispatch({ type: Actions.editOKR, payload: data }),
    createOKR: data => dispatch({ type: Actions.createOKR, payload: { data: data, objectives: state.objectives } }),
    createTimeFrame: data => dispatch({type: Actions.createTimeFrame, payload: data}),
    toggleAddPanel: data => dispatch({ type: Actions.toggleAddPanel, payload: data }),
    toggleEditPanel: data => dispatch({ type: Actions.toggleEditPanel, payload: data }),
    toggleSettings: data => dispatch({ type: Actions.toggleTimeFrameSettings, payload: data }),
    editArea: data => dispatch({ type: Actions.editArea, payload: data }),
    editAreaSucceeded: data => dispatch({ type: Actions.editAreaSucceed, payload: data }),
    editKRStatus: data => dispatch({ type: Actions.editKRStatus, payload: data }),
    editKRComment: data => dispatch({ type: Actions.editKRComment, payload: data }),
    // Create Area
    createArea: data => dispatch({ type: Actions.createArea, payload: { data: data, areas: state.areas } }),
    createAreaSucceed: data => dispatch({ type: Actions.createAreaSucceed, payload: data }),
    createAreaFailed: data => dispatch({ type: Actions.createAreaFailed, payload: data }),

    updateDisplayedTimeFrame: data => dispatch({type: Actions.updateDisplayedTimeFrame, payload: data}),
    createFirstArea: data => dispatch({ type: Actions.createFirstArea, payload: data }),
    createFirstAreaSuccess: data => dispatch({ type: Actions.createFirstAreaSuccess, payload: data }),
    toggleAreaPanel: data => dispatch({ type: Actions.toggleAreaPanel, payload: data }),
    setError: data => dispatch({ type: Actions.setError, payload: data }),
    areaOperationFailed: data => dispatch({ type: Actions.areaOperationFailed, payload: data }),
    objectivesOperationFailed: data => dispatch({ type: Actions.objectiveOperationFailed, payload: data }),
    removeOKR: data => dispatch({ type: Actions.removeOKR, payload: data }),
    removeArea: data => dispatch({ type: Actions.removeArea, payload: data }),
    getProjectName: data => dispatch({ type: Actions.getProjectName, payload: data }),
    getTimeFrames: () => dispatch({ type: Actions.getTimeFrames}),
    editTimeFrame: data => dispatch({ type: Actions.editTimeFrame, payload: data }),
    editTimeFrameSucceed: data => dispatch({ type: Actions.editTimeFrameSucceed, payload: data }),
    getTimeFramesSucceed: data => dispatch({ type: Actions.getTimeFramesSucceed, payload: data }),
    toggleLinkWorkItemPanel: data => dispatch({ type: Actions.toggleLinkPanel, payload: data }),
    getWorkItems: data => dispatch({ type: Actions.getWorkItems, payload: data }),
    addWorkItems: data => dispatch({ type: Actions.addWorkItems, payload: { data: data, objectives: state.objectives } }),
    deleteWorkItems: data => dispatch({ type: Actions.deleteWorkItems, payload: { data: data, objectives: state.objectives } }),
    openWorkItem: data => dispatch({ type: Actions.openWorkItem, payload: data })
} as IOKRActions); 
