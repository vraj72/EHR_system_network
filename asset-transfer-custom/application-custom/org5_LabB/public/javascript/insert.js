var response, responseP
var res


function get_patient(){
    var patient_id = document.getElementById('search_bar').value;
    console.log(patient_id);
    if(patient_id.length >0){
        var xhr = new XMLHttpRequest()
        xhr.open('POST', '/getPatientDetails');
        xhr.setRequestHeader("Content-type", "application/json"); 
        var data = JSON.stringify({"id":patient_id});

        xhr.onload = function () {
            if (this.status === 200) {
                var resp=this.responseText;
                console.log("gto"+this.responseText+resp.slice(resp.length-13))
                if(resp.slice(resp.length-14)==="does not exist"){
                    alert('No patient to show');
                }
                else{
                response = JSON.parse(this.responseText)
                loadResults(response)
                }
            } else if (this.status == 404) {
                alert('No patient to show');
            } else {
                alert('Check Network!');
            }
        }

        
        xhr.send(data);

    }

}

function loadResults(response) {
    $('#cont').empty()
    responseP=response.PersonalDetails;
    var cont_div = document.getElementById('cont')
    var i=0;
    var div =`<div class="cont" id="` +
            i +
            `">
                        <p class="heading">` +
            responseP.Username +
            `</p><br>
                        <div class="Tdetails">
                            <p class="RnoLabel"><strong>Patient ID :</strong></p>
                            <p >` +
            response.ID +
            `</p>
                            <p class="OdateLabel"><strong>Patient email:</strong></p>
                            <p id="Odate">` +
            responseP.Email +
            `</p>
                            <p class="BdateLabel"><strong>DOB:</strong></p>
                            <p id="Bdate">` +
            responseP.DOB+
            `</p>
                            <p class="BdateLabel"><strong>Gender:</strong></p>
                            <p id="dept">` +
                responseP.Gender +
                `</p>
                        </div><br>
                        <div class="Tdetails">  
                        <p class="BdateLabel"><strong>Phone Number:</strong></p>
                        <p class="para">` +
            responseP.Mobile +
            `</p>
            </div>
            <br><button name="Blood Report" value='Blood Report' class="apply" onclick="apply_blood('` +response.ID +`')">Blood Report</button>`+
            ` <button name="Sugar Report" value='Sugar REport' class="apply" onclick="apply_sugar('` +response.ID + `')">Sugar Report</button></div>`;

        cont_div.insertAdjacentHTML('beforeend', div);
    
}



function apply_sugar(id){
    console.log("sugar "+id)
    setTimeout(function () {
        location = '/insert_sugar?id='+id+'&name='+responseP.Username+'&gender='+responseP.Gender+'&mobile='+responseP.Mobile+'&email='+responseP.Email+'&dob='+responseP.DOB;
    }, 0)
}

function apply_blood(id){
    setTimeout(function () {
        location = '/insert_blood?id='+id+'&name='+responseP.Username+'&gender='+responseP.Gender+'&mobile='+responseP.Mobile+'&email='+responseP.Email+'&dob='+responseP.DOB;
    }, 0)
}


