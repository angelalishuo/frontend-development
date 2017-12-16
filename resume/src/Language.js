import React, {Component} from 'react';

const Languages = (props) => (
	<li>{props.item.name} <span className="lang-desc">({props.item.details})</span></li>
);

export default Languages;