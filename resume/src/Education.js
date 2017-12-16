import React from 'react';

const Education = (props) => (
	<div className="item">
		<p>{props.item.university}</p>
		<p>{props.item.degree}</p>
		<p>GPA: {props.item.gpa}</p>
		<p>{props.item.period}</p><br />
		<h3 className="job-title">Relevant Coursework:</h3><br />
		<p>{props.item.course1}</p>
		
		<p>{props.item.course2}</p>
		
		<p>{props.item.course3}</p>
		
		<p>{props.item.course4}</p>
		
	</div>
);

export default Education; 