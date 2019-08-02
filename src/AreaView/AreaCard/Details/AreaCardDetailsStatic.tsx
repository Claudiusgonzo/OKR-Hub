import * as React from "react";
import { Area } from "../../../Area/Area";

export interface IAreaCardDetailsStaticProps {
	area: Area;
	buttons: JSX.Element;
}

export const AreaCardDetailsStatic: React.FunctionComponent<IAreaCardDetailsStaticProps> = props => {
	const { area, buttons } = props;

	return <>
		<div className="card-header">
			<h3 style={{marginBottom: 10, flexGrow: 1}}><div className="area-name-title">{area.Name}</div></h3>
			{buttons}
		</div>
		<p className="card-description">{area.Description}</p>
	</>;
}




