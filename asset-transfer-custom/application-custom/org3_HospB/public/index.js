//Modal Code
// Get the modal
var modal = document.getElementById("mymodal");

// Get the button that opens the modal
var btn = document.getElementById("otp");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

var message;
//Patient Details
function searchid(){
  var load= document.getElementById("load");
  load.style.display = "block"
  var id = document.getElementById("patientid").value
  var xhr = new XMLHttpRequest()
  var url = 'http://134.209.152.226:9060/patient/search'
  xhr.open('POST', url)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({ id: id}))

  xhr.onload = function () {
      if (this.status == 200) {
        message = JSON.parse(this.responseText)
        load.style.display = "none";
        document.getElementById("patient").style.display = "block"
        console.log(message)
        document.getElementById('pid').innerHTML = message.ID
        document.getElementById('name').innerHTML = message.PersonalDetails.Name
        document.getElementById('dob').innerHTML = message.PersonalDetails.DOB
        document.getElementById('gender').innerHTML = message.PersonalDetails.Gender
        document.getElementById('mobile').innerHTML = message.PersonalDetails.Mobile
      } else if (this.status == 400) {
          load.style.display = "none";
          document.getElementById('tc').innerHTML = 'Invalid UserID'
      } else {
          document.getElementById('tc').innerHTML = 'Some Error Occured'
      }
  }
}
function otp(){
  modal.style.display = "none";
  document.getElementById("report").style.display = "block"
}
function blood(){
  document.getElementById("type").innerHTML = "Blood Report"
  document.getElementById("reportdesc").style.display = "block"
  document.getElementById('rid').innerHTML = message.ID
  document.getElementById('date').innerHTML = message.PersonalDetails.Name
  document.getElementById('test').innerHTML = message.PersonalDetails.DOB
  document.getElementById('result').innerHTML = message.PersonalDetails.Gender
  document.getElementById('comments').innerHTML = message.PersonalDetails.Mobile
}

function sugar(){
  document.getElementById("type").innerHTML = "Sugar Report"
  document.getElementById("reportdesc").style.display = "block"
  document.getElementById('rid').innerHTML = message.ID
  document.getElementById('date').innerHTML = message.PersonalDetails.Name
  document.getElementById('test').innerHTML = message.PersonalDetails.DOB
  document.getElementById('result').innerHTML = message.PersonalDetails.Gender
  document.getElementById('comments').innerHTML = message.PersonalDetails.Mobile
}

function ecg(){
  document.getElementById("type").innerHTML = "ECG Report"
  document.getElementById("reportdesc").style.display = "block"
  document.getElementById('rid').innerHTML = message.ID
  document.getElementById('date').innerHTML = message.PersonalDetails.Name
  document.getElementById('test').innerHTML = message.PersonalDetails.DOB
  document.getElementById('result').innerHTML = message.PersonalDetails.Gender
  document.getElementById('comments').innerHTML = message.PersonalDetails.Mobile
}

function covid(){
  document.getElementById("type").innerHTML = "Covid Report"
  document.getElementById("reportdesc").style.display = "block"
  document.getElementById('rid').innerHTML = message.ID
  document.getElementById('date').innerHTML = message.PersonalDetails.Name
  document.getElementById('test').innerHTML = message.PersonalDetails.DOB
  document.getElementById('result').innerHTML = message.PersonalDetails.Gender
  document.getElementById('comments').innerHTML = message.PersonalDetails.Mobile
}

function blooddetail(){
  window.location.href = "BloodReport"
}

function sugardetail(){
  window.location.href = "SugarReport"
}
