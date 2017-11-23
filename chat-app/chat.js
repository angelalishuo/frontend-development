var logout = document.getElementById('logout');

var auth = firebase.auth();

logout.addEventListener('click', function(e) {
	auth.signOut();
});

var messagesList = document.getElementById("messages");
var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");
var currentUsername = "";
var profilePic = "";
var userId = "";
var userVerification = "";
var currentUser = "";
var emailVerified = false;
var submitError = document.getElementById('submit-error');

function setError(message) {
	submitError.classList.add('active');
	submitError.textContent = message;
}

function clearError() {
	submitError.textContent = "";
	submitError.classList.remove('active');
}

messageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var database = firebase.database();
    var messages = database.ref('messages');
    var message = messageInput.value;
    messages.push({
    	displayName: currentUser.displayName,
    	userId: userId,
    	photoURL: currentUser.photoURL,
        text: message,
        timestamp: new Date().getTime(),  
        newtimestamp: "" 
    })
    .then(function () {
        messageInput.value = "";       
    })
    .catch(function(error) {
        alert("Message not added successfully! Try again!")
    });	
});


auth.onAuthStateChanged(function(user) {
    if (user) {
    	if (user.emailVerified) {
    		clearError();
    		document.getElementById('chat-send-button').disabled = false;
    		document.getElementById('message-input').disabled = false;
    	} else {
    		setError('You have to verify your email before you can post a message! (refresh the page once you have verified your email) :)');
    		document.getElementById('chat-send-button').disabled = true;
    		document.getElementById('message-input').disabled = true;

    	}
    	emailVerified = user.emailVerified;
    	var database = firebase.database();
    	var updatedMessage = "";
    	currentUsername = user.displayName;
    	profilePic = user.photoURL;
    	userId = user.uid;
    	currentUser = user;

        var messages = database.ref('messages').limitToLast(100);

        messages.on('child_added', function(data) {
            var id = data.key;
            var message = data.val();

            var messageLi = document.createElement("li");
            messageLi.id = id;

            var text = message.text;
            var post = document.createElement("div");
            post.className = 'post';
            post.id = 'post-' + id;
            post.innerHTML = text;
               	
            var timestamp = new Date(message.timestamp).toLocaleString();         
            var time = document.createElement("span");
            time.innerHTML = timestamp;
            
            var nameHeader = document.createElement('span');
            nameHeader.id = 'display-name';
            nameHeader.innerHTML = message.displayName;   

            var imagediv = document.createElement('div');
            imagediv.id = 'image-div';
            var image = document.createElement('img');
            image.src = message.photoURL;
            image.id = 'image';    
            
            messagesList.appendChild(messageLi);
            messageLi.classList.add("new-post");
            messageLi.appendChild(nameHeader);
            messageLi.appendChild(time);

            var lastEdited = document.createElement('span');
            lastEdited.id = 'last-edited' + id;

            if (message.newtimestamp !== "") {	
            	lastEdited.innerHTML = "last edited: " + new Date(message.newtimestamp).toLocaleString();    	
            }

          	messageLi.appendChild(lastEdited);
            messageLi.appendChild(imagediv);
            imagediv.appendChild(image);

            if (message.userId == currentUser.uid) {
	            var edit = document.createElement("span");
	            edit.id = "edit" + id;
	            edit.innerHTML = "Edit";
	            
	            var remove = document.createElement("span");
	            remove.id = 'delete' + id;
	            remove.innerHTML = "Delete";

	            messageLi.appendChild(edit);
            	messageLi.appendChild(remove);

            	document.getElementById('delete' + id).addEventListener('click', function(e) {
	            	var r = confirm("Are you sure you want to delete?");
	            	if (r == true) {
	            		messageLi.parentNode.removeChild(messageLi);
	            		messages.child(id).remove();
	            	}
            	});

            	document.getElementById('edit' + id).addEventListener('click', function(e) {
            		post.parentNode.removeChild(post);
            		var editBox = document.createElement("textarea");
            		editBox.id = 'edit-box';
            		
            		if (updatedMessage == "") {
            			editBox.value = text;
            		} else {
            			editBox.value = post.innerHTML;
            		}

            		var editButton = document.createElement("button");
            		editButton.id = 'edit-button';
            		var cancelButton = document.createElement("button");
            		cancelButton.id = 'cancel-button';
            		messageLi.appendChild(editBox);
            		messageLi.appendChild(editButton);
            		messageLi.appendChild(cancelButton);
            		editButton.innerHTML = "Edit";
            		cancelButton.innerHTML = "Cancel";

            		document.getElementById('edit-button').addEventListener('click', function(e) {           			
            			document.getElementById('edit-button').parentNode.removeChild(editButton);
            			messageLi.appendChild(post);
            			cancelButton.parentNode.removeChild(cancelButton);
            			editBox.parentNode.removeChild(editBox);
            			post.innerHTML = editBox.value;
            			messages.child(id).update({text: editBox.value, newtimestamp: new Date().getTime()});           			
            		});

            		document.getElementById('cancel-button').addEventListener('click', function(e) {
            			messageLi.appendChild(post);
            			document.getElementById('edit-button').parentNode.removeChild(editButton);
            			cancelButton.parentNode.removeChild(cancelButton);
            			editBox.parentNode.removeChild(editBox);
            		});
            	});
	        }  
	        messageLi.appendChild(post);
        });

        messages = database.ref('messages');

        messages.on('child_changed', function(data) {
            var id = data.key;
            var message = data.val();
            var post = document.getElementById("post-" + id);
            updatedMessage = message.text;
            post.innerHTML = updatedMessage;
            document.getElementById('last-edited' + id).innerHTML = "last edited: " + new Date(message.newtimestamp).toLocaleString();
        });

        messages.on('child_removed', function(data) {
            var id = data.key;
            var toRemove = document.getElementById(id);
            toRemove.parentNode.removeChild(toRemove);
        });
    } else {
        window.location.href = 'index.html';
    }
});
