import React, { Component } from 'react';
import './App.css';
import resume from './resume.json';
import Work from './Work'
import Projects from './Projects';
import Skills from './Skills';
import Education from './Education';
import Languages from './Language';
import Interests from './Interests';
import Activities from './Activities';

class App extends Component {

	renderExperiences() {
		let resultsArray = [];
		resume.experiences.map((item, i) => {
			resultsArray.push(<Work item={item} key={i} />);
		});
		return resultsArray;
 	}

 	renderProjects() {
 		let resultsArray = [];
 		resume.projects.map((item, i) => {
 			resultsArray.push(<Projects item={item} key={i} />);
 		});
 		return resultsArray;
	}
	 
	 renderInterests() {
		let resultsArray = [];
		resume.interests.map((item, i) => {
			resultsArray.push(<Interests item={item} key={i} />);
		});
		return resultsArray;
	}

 	renderEducation() {
 		let resultsArray = [];
 		resume.education.map((item, i) => {
 			resultsArray.push(<Education item={item} key={i} />);	
 		});
 		return resultsArray;
 	}

 	renderLanguages() {
 		let resultsArray = [];
 		resume.languages.map((item, i) => {
 			resultsArray.push(<Languages item={item} key={i} />);	
 		});
 		return resultsArray;
 	}


 	renderActivities() {
 		let resultsArray = [];
 		resume.activities.map((item, i) => {
 			resultsArray.push(<Activities item={item} key={i} />);	
 		});
 		return resultsArray;
	 }
	 
	 renderSkills() {
		let resultsArray = [];
		resume.skills.map((item, i) => {
			resultsArray.push(<Skills item={item} key={i} />);	
		});
		return resultsArray;
	}

  render() {
	 return (
		<div className="wrapper">
		  <div className="sidebar-wrapper">
				<div className="profile-container">
					 <img className="profile" src={resume.image} alt="me" />
					 <h1 className="name">{resume.name}</h1>
					 <h3 className="tagline">{resume.job}</h3>
				</div>
				
				<div className="contact-container container-block">
					<h2 className="container-block-title">Contact Details</h2>
					 <ul className="list-unstyled contact-list">
						  <li className="email"><a href="mailto: yourname@email.com">{resume.email}</a></li>
						  <li className="phone"><a href="tel:0123 456 789">{resume.phone}</a></li>
						  
					 </ul>
				</div>

				<div className="education-container container-block">
					 <h2 className="container-block-title">Portfolio</h2>
					 
					 <p><a href="angelalishuo.squarespace.com">angelalishuo.squarespace.com</a></p>
				</div>

				<div className="languages-container container-block">
					 <h2 className="container-block-title">Skills</h2>
					 <ul className="list-unstyled interests-list">
					 {this.renderSkills()}
					 </ul>
				</div>
				
				<div className="languages-container container-block">
					 <h2 className="container-block-title">Languages</h2>
					 <ul className="list-unstyled interests-list">
					 {this.renderLanguages()}
					 </ul>
				</div>

				<div className="languages-container container-block">
					 <h2 className="container-block-title">Interests</h2>
					 <ul className="list-unstyled interests-list">
					 {this.renderInterests()}
					 </ul>
				</div>
				
				
				
		  </div>
		  
		  <div className="main-wrapper">
				
				<section className="section summary-section">
					 <h2 className="section-title">Introduction</h2>
					 <div className="summary">
						  <p>A junior in Human-Centered Design and Engineering program at the University of Washington, Seattle, passionate about making technology easier for people to use and understand. Given previous experience in frontend design and development, and UX research and design, currently looking for an internship in similar areas for summer 2018.
</p>
					</div>
				</section>

				<section className="section experiences-section">
					 <h2 className="section-title">Education</h2>
					 

					 {this.renderEducation()}

					 				 
				</section>
				
				<section className="section experiences-section">
					 <h2 className="section-title">Professional Experience</h2>
					 

					 {this.renderExperiences()}

					 				 
				</section>
				
		  </div>
	 </div>
	 );
  }
}

export default App;
