import React = require("react");
import { Card } from "azure-devops-ui/Card";
import { Table, renderSimpleCell, ColumnFill, ITableRow } from "azure-devops-ui/Table";
import { ButtonGroup } from "azure-devops-ui/ButtonGroup";
import { Button } from "azure-devops-ui/Button";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { IItemProvider } from "azure-devops-ui/Utilities/Provider";
import { IWorkItemTableItem } from "./LinkWorkItemPanel";
import { ListSelection } from "azure-devops-ui/List";

import "./LinkWorkItemForm.scss";

export interface ILinkWorkItemFormProps {
    tableItems: IItemProvider<IWorkItemTableItem>;
    isZeroDay: boolean;
    onAdd: () => void;
    onDelete: (id: number) => void;
}

export const sizableColumns = [
    {
        id: "id",
        minWidth: 50,
        name: "Id",
        onSize: onSizeSizable,
        renderCell: renderSimpleCell,
        width: new ObservableValue(50)
    },
    {
        id: "title",
        maxWidth: 400,
        name: "Title",
        onSize: onSizeSizable,
        renderCell: renderSimpleCell,
        width: new ObservableValue(350)
    },
    {
        id: "state",
        name: "State",
        minWidth: 100,
        width: new ObservableValue(100),
        renderCell: renderSimpleCell
    },
    ColumnFill
];

export function onSizeSizable(event: MouseEvent, index: number, width: number) {
    (sizableColumns[index].width as ObservableValue<number>).value = width;
}

export const LinkWorkItemForm: React.FunctionComponent<ILinkWorkItemFormProps> = props => {
    const currentSelection = new ListSelection({multiSelect: false, selectOnFocus: true});

    return(<div className="link-form">
        {!props.isZeroDay ? 
        <Card className="flex-grow">
            <div className="flex-grow">
            <Table
                    columns={sizableColumns}
                    itemProvider={props.tableItems}
                    selection={currentSelection}
                />
            </div>
        </Card>
        : (<div className="link-zero-day">No work item has been linked to this Objective, start adding one!</div>)}
        <div className="link-form-submit">
            <ButtonGroup>
                <Button text="Add" primary={true} onClick={() => {
                    props.onAdd();
                }} />
                <Button text="Delete" onClick={() => {
                    if (currentSelection.value) {
                        const selected = currentSelection.value[0].beginIndex;
                        const workItem = props.tableItems.value[selected];
                        props.onDelete(workItem.id);
                    }
                }} />
            </ButtonGroup>
        </div>
    </div>);
}
