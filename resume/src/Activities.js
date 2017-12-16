import React from 'react';

const Activities = (props) => (
	<div className="item">
		<div className="meta">
			<div className="upper-row">
				<h3 className="job-title">{props.item.name}</h3>
			</div>
	  	</div>
	  	<div className="details">
			 <p>{props.item.detail}</p>
	 	</div>
	</div>
);

export default Activities;