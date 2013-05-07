//  Mold Fitness :: Project: Web App Part 4 :: By Tony Keiser 1112

//Wait until DOM is loaded
window.addEventListener("DOMContentLoaded", function(){

//###################################################################################
//Global Var ###################################################################
//###################################################################################
	var	name     = document.getElementById("name"),
		pass     = document.getElementById("pass"),	
		weight   = document.getElementById("weight"),
		activity = document.getElementById("activity"),
		reps     = document.getElementById("reps"),
		sets     = document.getElementById("sets"),
		cardio   = document.getElementById("cardio"),
		time     = document.getElementById("time"),
		notes    = document.getElementById("notes"),
		date     = document.getElementById("date"),
		male     = document.getElementById("male"),
		female   = document.getElementById("female"),
	    gender   = document.getElementsByName("gender"),
	    nReps    = document.getElementById("nReps"),
	    nSets    = document.getElementById("nSets"),
	    view     = document.getElementById("view"),
	    add      = document.getElementById("add");
	    recover  = document.getElementById("recover");
	    errors   = document.getElementById("errors");
	    
//###################################################################################
//Get Non-Text Values ###############################################################
//###################################################################################
//Radio Gender Value	
	var genderValue = function(){
		if (gender[0].checked!=true){
			 genderValue = gender[1].value
		} else {
			genderValue = gender[0].value;
			}
		};

//Range Display Value
	var changeSets = function(){		
		nSets.innerHTML=sets.value + " Sets of..."
	}

	var changeReps = function(){		
		nReps.innerHTML=reps.value + " Reps"
	}
	
	var changeCardio = function(){		
		nTime.innerHTML=time.value + " minutes."
	}
//Checkbox Value 

	var cardioChecked = function(){
		if(cardio.checked!=true){
			document.getElementById("cardioBox").setAttribute("class", "hide");
		} else {
			document.getElementById("cardioBox").removeAttribute("class");
			localStorage.setItem("Cardio Today", cardio.checked);
		}
	}
//###################################################################################
//Set Data ###################################################################
//###################################################################################
 	function setData(key){
		// If no key set new key...else edit current key
		if(!key){	
		var id       = Math.floor(Math.random()*1000000000);
		} else {
			id = key;
		}
		var fit 	 		= {};
			fit.name 		= ["Name:", name.value];
			fit.pass		= ["Password:", pass.value];		
			fit.gender		= ["Gender:", genderValue];
			fit.weight		= ["Weight:", weight.value];
			fit.muscle		= ["Activity:", activity.value];
			fit.sets 		= ["Number of Sets:", sets.value];
			fit.reps		= ["Number of Reps:", reps.value];
			fit.cardio 		= ["Cardio Today:", cardio.checked];
			fit.time 		= ["Cardio Time:", time.value + " Minutes"];
			fit.notes 		= ["Notes:", notes.value];
			fit.date		= ["Date:", date.value];
			
		localStorage.setItem(id, JSON.stringify(fit));
		addData();
	};	
//###################################################################################	
//View / Display Local ##############################################################
//###################################################################################
	var viewData = function(){
	    //Disable link if empty
		if(localStorage.length==0){
			alert("No workouts added, so Example data was added");
			autoFill();
			//Show by remove hidden
			document.getElementById("viewForm").removeAttribute("class");
			//Hide Form 
			document.getElementById("form").setAttribute("class", "hide");
		}

		//Add Workout button and DO NOT validate then read validation
		var showForm = function (){	
			document.getElementById("viewForm").setAttribute("class", "hide");
			document.getElementById("form").removeAttribute("class");
			add.addEventListener("click", validate);		
		}
		add.removeEventListener("click", validate);
	    add.addEventListener("click", showForm);
		//Show by remove hidden
		document.getElementById("viewForm").removeAttribute("class");
		//Hide Form 
		document.getElementById("form").setAttribute("class", "hide");
		//Display
	var target = document.getElementById('workout');
	var newDiv = document.createElement('div');
	newDiv.setAttribute("id", "aList");
	newDiv.setAttribute("class", "viewActivity")
	var makeList = document.createElement('ul');
	newDiv.appendChild(makeList);
	target.appendChild(newDiv);	
	
		for(var i=0, l=localStorage.length; i<l; i++){
			var listItem = document.createElement('li');
			var links = document.createElement('li');
			var space = document.createElement('br');
			var rule = document.createElement('hr');
			rule.setAttribute("class", "divide");
			makeList.appendChild(listItem);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// Convert
			var obj = JSON.parse(value);
			var subList = document.createElement('ul');				
	
					makeList.appendChild(subList);
				getImage(obj.muscle[1], subList);
				for (var n in obj){
					var makeSubLi = document.createElement('li');
					subList.appendChild(makeSubLi);
					var optSubText = obj[n][0]+ " " +obj[n][1];
					makeSubLi.innerHTML = optSubText; 	
					subList.appendChild(links);
					subList.appendChild(rule);	
					subList.appendChild(space);	
									
			}
			makeItemLinks(localStorage.key(i), links);
		} 
	}
//###################################################################################	
// Auto Fill Data ###################################################################
//###################################################################################

function autoFill(){
	//JSON Object = json.js Example Data
	//Store into local storage if empty
	for(var n in json){
		var id = Math.floor(Math.random()*1000000000);
		
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
	
}

//###################################################################################	
//GetImgae - Image for Activity list ################################################
//###################################################################################

	function getImage(iName, subList){
		var imgLi = document.createElement('li');
		imgLi.style.textAlign = "center";
		subList.appendChild(imgLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "_img/"+ iName +".png")
		imgLi.appendChild(newImg);
	}

//###################################################################################	
//makeItemLinks   -   Edit and delete links for storage ###############################
//###################################################################################
	function makeItemLinks(key, links){
		//Align Links to right Side
		links.style.textAlign = "center";
	
		var editLink = document.createElement('a');
		var editLinkImg = document.createElement('img');
		var editSrc = editLinkImg.setAttribute("src", "_img/edit.png");
		editLink.href = "#";
		editLink.key = key;	
		editLink.addEventListener("click", editItem);
		links.appendChild(editLink);
		editLink.appendChild(editLinkImg);		
		
		
		var deleteLink = document.createElement('a');
		var deleteLinkImg = document.createElement('img');
		var deleteSrc = deleteLinkImg.setAttribute("src", "_img/delete.png");
		deleteLink.href = "#";
		deleteLink.key = key;
		deleteLink.addEventListener("click", deleteItem);
		links.appendChild(deleteLink);
		deleteLink.appendChild(deleteLinkImg);
}
//###################################################################################
//Edit Link ###################################################################
//###################################################################################

	function editItem(){
		//Show form to edit		
		document.getElementById("form").removeAttribute("class");
		document.getElementById("viewForm").setAttribute("class", "hide");
		//Grab Data from Item in localStorage
		var value = localStorage.getItem(this.key);
		var fit = JSON.parse(value);
		
		name.value = fit.name[1];
		pass.value = fit.pass[1];
			if(fit.gender[1] == "Male"){
					gender[0].setAttribute("checked", "checked");
					genderValue = "Male"
				} else if(fit.gender[1] == "Female"){
					gender[1].setAttribute("checked", "checked");
					genderValue = "Female";
				}	
		weight.value = fit.weight[1];
		activity.value = fit.muscle[1];
		sets.value = fit.sets[1];
		reps.value = fit.reps[1];	
			if(fit.cardio[1] == true){
				cardio.setAttribute("checked", "checked");
			}
		time.value = fit.time[1];
		notes.value = fit.notes[1];
		date.value = fit.date[1];
		//Pre - populate range values for user	
		changeSets();
		changeReps();
		cardioChecked();
		changeCardio();
		//Remove listener to add
		add.removeEventListener("click", addData);
		//Change add value to save changes
		add.value="Save Changes";
		var saveEdit = add;
		//Save the key value established in this function as a property of editSubmit 
		//So we can use that value to save data edited
		saveEdit.addEventListener("click", validate);
		saveEdit.key = this.key;
	}

//###################################################################################	
//Delete Link ###################################################################
//###################################################################################

	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this activity?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Workout was deleted.")
			window.location.reload();
		} else {
			alert("Workout was NOT deleted.")
		}
	}
	
//###################################################################################
//Validate form ###################################################################
//###################################################################################

	function validate(){
		//Define elements to check
		var getName = name;
		var getPass = pass;
		var getActivity = activity;
		var getDate = date;
		//Reset eMsg & Style
	    errors.innerHTML="";
	   	getName.style.border = "";
		getName.style.boxShadow = "";
		getPass.style.border = "";
		getPass.style.boxShadow = "";
		getActivity.style.border = "";
		getActivity.style.backgroundColor = "";
		getDate.style.border = "";
		getDate.style.boxShadow = "";
		
		// Error Feedback
		var eMsg = [];
		//Name Validation
		if(getName.value==""){
			var nameError = "***Please enter in your name.***";
			getName.style.border = "1.5px outset #fc0792";
			getName.style.boxShadow = "0px 0px 20px #fc0792";
			eMsg.push(nameError);
		}
		//Pass Validataion
		if(getPass.value==""){
			var passError = "***Please enter in your password.***";
			getPass.style.border = "1.5px outset #fc0792";
			getPass.style.boxShadow = "0px 0px 20px #fc0792";
			eMsg.push(passError);
		}
		if(getActivity.value==""){
			var activityError = "***Please select an activity.***";
			getActivity.style.border = "1.5px outset #fc0792";
			getActivity.style.backgroundColor = "#fc0792";
			eMsg.push(activityError);
		}
		//Date Validation
		var re = /^(?:(?:(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-|\.)(?:0?2\1(?:29)))|(?:(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-|\.)(?:(?:(?:0?[13578]|1[02])\2(?:31))|(?:(?:0?[1,3-9]|1[0-2])\2(29|30))|(?:(?:0?[1-9])|(?:1[0-2]))\2(?:0?[1-9]|1\d|2[0-8]))))$/;
		if(!(re.exec(getDate.value))){
			var dateError = "***Please select a date.***"
			getDate.style.border = "1.5px outset #fc0792";
			getDate.style.boxShadow = "0px 0px 20px #fc0792";
			eMsg.push(dateError);
		}
		//Display Errors
		if (eMsg.length>=1){
			for(var i=0, e=eMsg.length; i<e; i++){
				var txt = document.createElement('li');
				txt.style.color = "black";	
				txt.style.textAlign= "center";
				txt.innerHTML = eMsg[i];
				errors.appendChild(txt);
				
			}
						return false;
		} else {
		// Save Data if pass validation - Send key value from editItem function
		// Remember this key value was passed through saveEdit as a property
			setData(this.key);
		}

	}
	
//###################################################################################
//Add Data & Clear Form ###############################################################
//###################################################################################

	var addData = function(){		
		document.getElementById("form").reset();
		alert("Workout Saved!");
		document.location.reload();
	}
		
//###################################################################################
//Clear Data ###################################################################
//###################################################################################

	var clearData = function(){
		localStorage.clear();
		alert("All Workouts Erased!");
		document.location.reload();
	}

	var iView = document.getElementById("iview");
	

//###################################################################################
//Index View Data ###################################################################
//###################################################################################
	
	 var myUrl = window.location.href;
	 var splitUrl = myUrl.split("/");
	 var lastUrl = splitUrl.length - 1
	
	 if(splitUrl[lastUrl]!="addItem.html" && splitUrl[lastUrl]!="addItem.html#"){
	 	function iViewData(){
			document.location.href = "addItem.html";
			viewData();
		}
		
		iView.addEventListener("click", iViewData);
		 console.log("hello");
	 }

//###################################################################################
//EventListeners ###################################################################
//###################################################################################

	cardio.addEventListener("change", cardioChecked);
	time.addEventListener("change", changeCardio);
	sets.addEventListener("change", changeSets);
	reps.addEventListener("change", changeReps);
	add.addEventListener("click", validate);
	view.addEventListener("click", viewData);
	clear.addEventListener("click", clearData);
	male.addEventListener("change", genderValue);
	female.addEventListener("change", genderValue);

//###################################################################################
// ##### OLD ELs #####
//###################################################################################
	/*
	name.addEventListener("blur", setData);
	pass.addEventListener("blur", setData);
	male.addEventListener("change", setGender);
	female.addEventListener("change", setGender);
	weight.addEventListener("blur", setData);
	activity.addEventListener("change", setData);
	sets.addEventListener("change", setData);
		sets.addEventListener("change", changeSets);
	reps.addEventListener("change", setData);
		reps.addEventListener("change", changeReps);
	cardio.addEventListener("change", cardioChecked)
	time.addEventListener("change", setData);
		time.addEventListener("change", changeCardio);
	notes.addEventListener("blur", setData);
	date.addEventListener("blur", setData);	
	*/


});