"use strict";

var index = 0;
var leftButton = document.getElementsByClassName('left')[0];
leftButton.onclick = left;
var rightButton = document.getElementsByClassName('right')[0];
rightButton.onclick = right;

document.getElementsByClassName('first_dot')[0].onclick = firstScreen;
document.getElementsByClassName('second_dot')[0].onclick = secondScreen;
document.getElementsByClassName('third_dot')[0].onclick = thirdScreen;
document.getElementsByClassName('fourth_dot')[0].onclick = fourthScreen;
document.onkeydown = function(event) {
	if (event.keyCode == "37") {
		left();
	} else if (event.keyCode == "39") {
		right();
	}
}

function left() {
	index--;
	toScreen();
}

function right() {
	index++;
	if (index > 3) {
		index = 0;
	}
	toScreen();
}

function toScreen() {
	if (index == 0) {
		firstScreen();
	} else if (index == 1) {
		secondScreen();
	} else if (index == 2) {
		thirdScreen();
	} else {
		fourthScreen();
	}
}

function firstScreen() {
	index = 0;
	screenStyles("0%", "0%", "hidden", "visible");
	dotsOpacity("first_dot", "second_dot", "third_dot", "fourth_dot");
}

firstScreen();

function secondScreen() {
	index = 1;
	screenStyles("-100%", "25%", "visible", "visible");
	dotsOpacity("second_dot", "first_dot", "third_dot", "fourth_dot");
}

function thirdScreen() {
	index = 2;
	screenStyles("-200%", "50%", "visible", "visible");
	dotsOpacity("third_dot", "first_dot", "second_dot", "fourth_dot");
}

function fourthScreen() {
	index = 3;
	screenStyles("-300%", "75%", "visible", "hidden");
	dotsOpacity("fourth_dot", "third_dot", "first_dot", "second_dot", );
}

function screenStyles(slide, logo, left, right) {
	document.getElementsByClassName('slides')[0].style.left = slide;
	document.getElementsByClassName('logo')[0].style.left = logo;
	document.getElementsByClassName('left')[0].style.visibility = left;
	document.getElementsByClassName('right')[0].style.visibility = right;
}

function dotsOpacity(full, half1, half2, half3) {
	document.getElementsByClassName(full)[0].style.opacity = "1";
	document.getElementsByClassName(half1)[0].style.opacity = "0.5";
	document.getElementsByClassName(half2)[0].style.opacity = "0.5";
	document.getElementsByClassName(half3)[0].style.opacity = "0.5";
}



