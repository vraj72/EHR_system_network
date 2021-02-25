function show(){
    var userid= document.getElementById('username').value;
    var passw = document.getElementById('pass').value
    if (userid.length == 0) {
        document.getElementById('tc').innerHTML = 'Username cannot be Empty'
    } else if (passw.length == 0) {
        document.getElementById('tc').innerHTML = 'Password cannot be Empty'
    } else if(userid==="admina" &&  passw==="admin"){
        setTimeout(function () {
            location = '/insert'
        }, 150)
    }
    else{
        document.getElementById('tc').innerHTML = 'Invalid username or password'

    }
    
}