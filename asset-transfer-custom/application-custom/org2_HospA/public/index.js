
// Modal Code
// var modal = document.getElementById("mymodal");
// var btn = document.getElementById("sotp");
// var span = document.getElementsByClassName("close")[0] 
// btn.onclick = function() {
//   	modal.style.display = "block"
// }
// span.onclick = function() {
//   	modal.style.display = "none";
// }

var message,c;
//Patient Details
function searchid(){
	var id = document.getElementById("patientid").value
	document.getElementById("load").style.display ="block" ;
	
	var xhr = new XMLHttpRequest()
	var url = 'http://134.209.152.226:9060/patient/search'
	xhr.open('POST', url)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.send(JSON.stringify({ id: id}))

	xhr.onload = function () {
		if (this.status == 200) {
			document.getElementById("load").style.display = "none";
			document.getElementById("patient").style.display = "block"
			document.getElementById("report").style.display = "block"
			message = JSON.parse(this.responseText)
			console.log(message)

			//Patient Details
			document.getElementById('pid').innerHTML = message.ID
			document.getElementById('name').innerHTML = message.PersonalDetails.Name
			document.getElementById('dob').innerHTML = message.PersonalDetails.DOB
			document.getElementById('gender').innerHTML = message.PersonalDetails.Gender
			document.getElementById('mobile').innerHTML = message.PersonalDetails.Mobile

			//Blood Report list
			var report = document.getElementById("reportdesc")
			flag=0
			var length = message.Reports.BloodReports.length
			if(length>0){
				var report_content = `
				<table class="table table-bordered" id="reporttable" width="100%" cellspacing="0">
				<thead>
					<tr>
						<th>Action</th>
						<th>Report ID</th>
						<th>Date</th>
						<th>Organisation</th>
						
					</tr>
				</thead>`
				for(i=0;i<length;i++){
				report_content = report_content + `
					<tr>
						<td><input type="checkbox"></td>
						<td>`+message.Reports.BloodReports[i].ReportID+`</td>
						<td>`+message.Reports.BloodReports[i].GeneratedTime+`</td>
						<td>`+message.Reports.BloodReports[i].IssuedBy+`</td>
					</tr>`
				}
				flag=1
			}
			else{  
				report.insertAdjacentHTML('beforeend',`<p>NO Reports</p>`)
			}
			if(flag==1){
				report_content = report_content +  `</table>`
				report.insertAdjacentHTML('beforeend',report_content)
			}

			//Sugar Report list
			var report = document.getElementById("sugarlist")
			flag=0
			var length = message.Reports.SugarReports.length
			if(length>0){
				var report_content = `
				<table class="table table-bordered" id="sugartable" width="100%" cellspacing="0">
				<thead>
					<tr>
						<th>Action</th>
						<th>Report ID</th>
						<th>Date</th>
						<th>Organisation</th>
						
					</tr>
				</thead>`
				for(i=0;i<length;i++){
				report_content = report_content + `
					<tr>
						<td><input type="checkbox"></td>
						<td>`+message.Reports.SugarReports[i].ReportID+`</td>
						<td>`+message.Reports.SugarReports[i].GeneratedTime+`</td>
						<td>`+message.Reports.SugarReports[i].IssuedBy+`</td>
					</tr>`
				}
				flag=1
			}
			else{  
				report.insertAdjacentHTML('beforeend',`<p>NO Reports</p>`)
			}
			if(flag==1){
				report_content = report_content +  `</table>`
				report.insertAdjacentHTML('beforeend',report_content)
			}
			
		} else if (this.status == 400) {
			document.getElementById("load").style.display = "none";
			document.getElementById('tc').innerHTML = 'Invalid UserID'
		} else {
			document.getElementById("load").style.display = "none";
			document.getElementById('tc').innerHTML = 'Some Error Occured'
		}
	}
}

function request(){

	//Blood Report Chekbox
	var grid = document.getElementById("reporttable");
	var checkBoxes = grid.getElementsByTagName("input");
	var c =[],j=0;
	for (var i = 0; i < checkBoxes.length; i++) {
		if (checkBoxes[i].checked) {
			var row = checkBoxes[i].parentNode.parentNode;
			c[j] = row.cells[1].innerHTML;
			j++
		}
	}

	//Sugar Report Chekbox
	var grid1 = document.getElementById("sugartable");
	var checkBoxes1 = grid1.getElementsByTagName("input");
	for (var i = 0; i < checkBoxes1.length; i++) {
		if (checkBoxes1[i].checked) {
			var row = checkBoxes1[i].parentNode.parentNode;
			c[j] = row.cells[1].innerHTML;
			j++
		}
	}
	console.log(c)
	if(c.length==0){
		alert("No Reported Selected")
	}
	else{
		var d = new Date();
		var id= "2021" + Math.floor((Math.random() * 99999) + 100000)
		// var id="2017134979"

		var xhr = new XMLHttpRequest()
		var url = 'http://134.209.152.226:9060/permission/create'
		xhr.open('POST', url)
		xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.send(JSON.stringify({ id: id,pid:message.ID,rid:c,did:"Doctor1",time:d,status:"0",org:"Org2",request:d}))

		xhr.onload = function () {
			if (this.status == 200) {
				alert("Permission ID:" +id+ "\n\nPermission Succesfully Created")
				
				alert("Checking Permission Status")
				document.getElementById("request").style.display = "none"
				document.getElementById("loading").style.display = "block"
				
				//Continous Request Sending
				repeat()
				function repeat(){
					var xhr1 = new XMLHttpRequest()
					var url = 'http://134.209.152.226:9060/permission/list'
					xhr1.open('POST', url)
					xhr1.setRequestHeader('Content-Type', 'application/json')
					console.log(id)
					xhr1.send(JSON.stringify({ id: id}))
					xhr1.onload = function () {
						console.log("hello")
						if (this.status == 200) {
							permission = JSON.parse(this.responseText)
							
							if(permission.StatusOfRequest == "Allowed"){
								console.log("Allowed")
								document.cookie="id="+message.ID+","+c+";";
								alert("Permission Allowed")
								document.getElementById("loading").style.display = "none"
								// document.getElementById("sotp").style.display = "inline-block"
								window.location.href = "reportlist"
							}
							else if(permission.StatusOfRequest == "Denied"){
								document.getElementById("loading").style.display = "none"
								console.log("Permission Denied")
								alert("Permission Denied")
								window.location.href ="dashboard"
							}
							else
							setInterval(repeat(),50000);
						} else if (this.status == 400) {
							alert("Wrong")
						} else {
							alert('Some Error Occured')
						}
					}
				}
			}
		 	else if (this.status == 400) {
				alert("Wrong")
			} else {
				alert('Some Error Occured')
			}
			
		}
	}
}

function otp(){
  window.location.href = "reportlist"
}

function blood(){
	document.getElementById("type").innerHTML = "Blood Report"
	document.getElementById("reportdesc").style.display = "block"
	document.getElementById("sugarlist").style.display = "none"
	document.getElementById("request").style.display = "inline-block"
}

function sugar(){
	document.getElementById("type1").innerHTML = "Sugar Report"
	document.getElementById("sugarlist").style.display = "block"
	document.getElementById("reportdesc").style.display = "none"
	document.getElementById("request").style.display = "inline-block"

  
}


