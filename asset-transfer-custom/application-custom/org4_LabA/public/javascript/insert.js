var data = ''
var response
var res
// var vd_id = get_cookie('vd_id')
// var vcd_id = get_cookie('vcd_id')

function get_patient(){
    var patient_id = document.getElementById('search_bar').value;
    if(patient_id.length >0){
        var xhr = new XMLHttpRequest()
        data = JSON.stringify({ patient_id : patient_id })

        xhr.onload = function () {
            if (this.status === 200) {
                response = JSON.parse(this.responseText)
                loadResults(response)
            } else if (this.status == 404) {
                alert('No patient to show');
            } else {
                alert('Check Network!');
            }
        }

        xhr.open('POST', '/getPatientList');
        xhr.send(data);

    }

}

function loadResults(response) {
    $('#cont').empty()
    var cont_div = document.getElementById('cont')
    for (var i = 0; i < response.length; i++) {
        var div =
            `<div class="cont" id="` +
            i +
            `">
                        <p class="heading">` +
            response[i].patient_name +
            `</p><br>
                        <div class="Tdetails">
                            <p class="RnoLabel"><strong>Patient ID :</strong></p>
                            <p >` +
            response[i].patient_id +
            `</p>
                            <p class="OdateLabel"><strong>Patient email:</strong></p>
                            <p id="Odate">` +
            response[i].email +
            `</p>
                            <p class="BdateLabel"><strong>DOB:</strong></p>
                            <p id="Bdate">` +
            response[i].dob+
            `</p>
                            <p class="BdateLabel"><strong>Gender:</strong></p>
                            <p id="dept">` +
                response[i].gender +
                `</p>
                        </div><br>
                        <div class="Tdetails">  
                        <p class="BdateLabel"><strong>Phone Number:</strong></p>
                        <p class="para">` +
            response[i].phone +
            `</p>
            </div>
            <br><button name="Blood Report" value='Blood Report' class="apply" onclick="apply_blood(` +
            response[i].patient_id +
            `)">Blood Report</button> <button name="Sugar Report" value='Sugar REport' class="apply" onclick="apply_sugar(` +
            response[i].patient_id +
            `)">Sugar Report</button>
                    </div>`

        cont_div.insertAdjacentHTML('beforeend', div)
    }
}


function apply(et_id) {
    
    Swal.fire({
        title: 'title',
        text: 'Please entery',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#663EFD',
        cancelButtonColor: '#a6a6a6',
        confirmButtonText: 'Login',
    }).then((result) => {
        console.log(result)
        window.location.href = '/l'
    })
    
}

function apply_sugar(id){
    setTimeout(function () {
        location = '/insert_sugar?id='+id;
    }, 0)
}

function apply_blood(id){
    setTimeout(function () {
        location = '/insert_blood?id='+id;
    }, 0)
}

response=`[
    {
        "patient_id": "123456789",
        "dob": "20/12/12",
        "patient_name": "Viraj Tandel",
        "gender": "male",
        "phone": "7894561230",
        "email": "dhdbdj@gmail.com"
    }
]`;
response = JSON.parse(response);
loadResults(response);



