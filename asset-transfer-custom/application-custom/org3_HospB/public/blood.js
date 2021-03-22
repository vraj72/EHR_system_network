function searchid(){
    var load= document.getElementById("load");
    load.style.display = "block"
    var id = document.getElementById("patientid").value
    var xhr = new XMLHttpRequest()
    var url = 'http://localhost:9060/patient/search'
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