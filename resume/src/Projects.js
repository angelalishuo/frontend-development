import React from 'react';

const Projects = (props) => (
	<div className="item">
		<span className="project-title"><a href={props.item.url}>{props.item.name}</a></span> - <span className="project-tagline">{props.item.detail}</span>
	</div>
);

export default Projects;