import React from 'react';

const Work = (props) => (
	<div className="item">
		<div className="meta">
			<div className="upper-row">
				<h3 className="job-title">{props.item.title}</h3>
				<div className="time">{props.item.period}</div>
			</div>
			<div className="company"><a href={props.item.companyURL}>{props.item.company}</a></div>
	  	</div>
	  	<div className="details">

			{props.item.details ? (
				<li>{props.item.details}</li>
			) : (
				<p></p>
			)}
			
			<h5>{props.item.detail1title}</h5>
			
			{props.item.detail1.map(function(detail, index) {
                return <li key={index}>{detail}</li>
			})}

			<h5>{props.item.detail2title}</h5>

			{props.item.detail2.map(function(detail, index) {
                return <li key={index}>{detail}</li>
			})}
			
			<h5>{props.item.detail3title}</h5>

			{props.item.detail3.map(function(detail, index) {
                return <li key={index}>{detail}</li>
            })}
			
	 	</div>
	</div>
);

export default Work;