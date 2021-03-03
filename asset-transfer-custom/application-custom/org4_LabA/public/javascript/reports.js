var query = window.location.search.substring(1);
console.log(query);
function getParam(param){
    return new URLSearchParams(window.location.search).get(param);
  }
var id = getParam("id");
document.getElementById("email").innerHTML= getParam("email");
document.getElementById("id").innerHTML= getParam("id");
document.getElementById("name").innerHTML= getParam("name");
document.getElementById("phone").innerHTML= getParam("mobile");
document.getElementById("gender").innerHTML= getParam("gender");
document.getElementById("dob").innerHTML= getParam("dob");



console.log(getParam("email")+document.getElementById("email").value);
console.log(document.getElementById("email"))

function nextb(){
  var e = document.getElementById("e").value
  var h  = document.getElementById("h").value
  var hct = document.getElementById("hct").value
  var  p= document.getElementById("p").value
  var w = document.getElementById("w").value
  var r = document.getElementById("r").value
  var comment = document.getElementById("s_comment").value

  // console.log(t+value+result+comment);

  var xhr = new XMLHttpRequest()
  xhr.open('POST', '/reports/create_blood');
  xhr.setRequestHeader("Content-type", "application/json"); 
  var data = JSON.stringify({ID:id ,
  RBC:r,
  Hemoglobin:h,
  HCT:hct,
  Platelets:p,
  WBC:w,
  ESR:e,
  comment: comment,
  IssuedBy: "LAB A"
});

  xhr.onload = function () {
      if (this.status === 200) {
          var resp=this.responseText;
          console.log(resp)
          response = JSON.parse(this.responseText)
          loadResults(response)
          
      } else if (this.status == 404) {
          alert('No patient to show');
      } else {
          alert('Check Network!');
      }
  }

  
  xhr.send(data);

}

function next(){
  var t = document.getElementById("type").value
  var value = document.getElementById("s_value").value
  var result = document.getElementById("result").value
  var comment = document.getElementById("s_comment").value

  console.log(t+value+result+comment);

  var xhr = new XMLHttpRequest()
  xhr.open('POST', '/reports/create_sugar');
  xhr.setRequestHeader("Content-type", "application/json"); 
  var data = JSON.stringify({ID:id ,
  type : t,
  value : value,
  result : result,
  comment: comment,
  IssuedBy: "LAB A"
});

  xhr.onload = function () {
      if (this.status === 200) {
          var resp=this.responseText;
          console.log(resp)
          response = JSON.parse(this.responseText)
          loadResults(response)
          
      } else if (this.status == 404) {
          alert('No patient to show');
      } else {
          alert('Check Network!');
      }
  }

  
  xhr.send(data);

}