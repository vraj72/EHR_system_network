var x = document.cookie;
var check = false;
var id
if (x != null) {
    var dem = x.split(";");
    for (var _i = 0, dem_1 = dem; _i < dem_1.length; _i++) {
        var i = dem_1[_i];
        if (i.search("id") == 0) {
            var id=i.substring(i.indexOf('=') + 1);
            console.log(id);
            check = true;
            break;
        }
        
    }
}
var cook = id.split(",");

var message;
var xhr = new XMLHttpRequest()
var url = 'http://134.209.152.226:9060/patient/search'
xhr.open('POST', url)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(JSON.stringify({ id: cook[0]}))
xhr.onload = function () {
    if (this.status == 200) {
        message = JSON.parse(this.responseText)
        console.log(message)
        document.getElementById("reportlist").style.display = "block"
        var report = document.getElementById("reportlist")
        //Blood Report List
        flag=0
        var length = message.Reports.BloodReports.length
        if(length>0){
            var report_content = `
            <h3 style="text-align: center;">Blood Report List</h3><br>
            <table class="table table-bordered" id="reportlist" width="100%" cellspacing="0">
            <thead>
                <tr>
                    <th>Report ID</th>
                    <th>Date</th>
                    <th>Organisation</th>
                    <th>Action</th>
                    
                </tr>
            </thead>`
            for(var i=1;i<cook.length;i++){
                for(var j=0;j<length;j++){
                    if(cook[i]==message.Reports.BloodReports[j].ReportID){
                        report_content = report_content + `
                        <tr id="`+i+`">
                            <td>`+message.Reports.BloodReports[j].ReportID+`</td>
                            <td>`+message.Reports.BloodReports[j].GeneratedTime+`</td>
                            <td>`+message.Reports.BloodReports[j].IssuedBy+`</td>
                            <td><a onclick="blooddetail()" style="color:blue"><u>View Blood Report</u></a></td>
                        </tr>`
                    }
                }
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

        //Sugar Report List
        document.getElementById("sugarlist").style.display = "block"
        var report = document.getElementById("sugarlist")
			flag=0
			var length = message.Reports.SugarReports.length
			if(length>0){
				var report_content = `
                <h3 style="text-align: center;">Sugar Report List</h3><br>
				<table class="table table-bordered" id="sugartable" width="100%" cellspacing="0">
				<thead>
					<tr>
						<th>Report ID</th>
						<th>Date</th>
						<th>Organisation</th>
                        <th>Action</th>
						
					</tr>
				</thead>`
				for(var i=1;i<cook.length;i++){
                    for(var j=0;j<length;j++){
                        if(cook[i]==message.Reports.SugarReports[j].ReportID){
                            report_content = report_content + `
                                <tr>
                                    
                                    <td>`+message.Reports.SugarReports[j].ReportID+`</td>
                                    <td>`+message.Reports.SugarReports[j].GeneratedTime+`</td>
                                    <td>`+message.Reports.SugarReports[j].IssuedBy+`</td>
                                    <td><a onclick="sugardetail()" style="color:blue"><u>View Sugar Report</u></a></td>
                                </tr>`
                        }
                    }
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
    }
    else if (this.status == 400) {
        alert("Error 400")
    } else {
        alert("Some Error Occured")
    }
}
function blooddetail(){
    window.location.href = "BloodReport"
}

function sugardetail(){
    window.location.href = "SugarReport"
}
