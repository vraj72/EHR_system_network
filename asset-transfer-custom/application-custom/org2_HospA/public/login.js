function show() {
    var mail = document.getElementById('inputEmailAddress').value
    var passw = document.getElementById('inputPassword').value
    if (mail.length == 0) {
        document.getElementById('tc').innerHTML = 'Email cannot be Empty'
    } else if (passw.length == 0) {
        document.getElementById('tc').innerHTML = 'Password cannot be Empty'
    }
    else {
        if(mail== 'hadmin1' && passw=='hadmin1'){
            setTimeout(function () {
                location = '/dashboard'
            }, 2000)
        }
        else{
            document.getElementById('inputEmailAddress').value = ''
            document.getElementById('inputPassword').value = ''
            document.getElementById('tc').innerHTML = 'Wrong Username or Password Entered'
        }
        // var xhr = new XMLHttpRequest()
        // var url = 'localhost:9000/login'
        // xhr.open('POST', url)
        // xhr.setRequestHeader('Content-Type', 'application/json')
        // xhr.send(JSON.stringify({ username: mail, password: passw }))
        
        // xhr.onload = function () {
        //     if (this.status == 200) {
        //     } else if (this.status == 400) {
        //         document.getElementById('tc').innerHTML = 'Invalid Username or Password'
        //     } else {
        //         document.getElementById('tc').innerHTML = 'Some Error Occured'
        //     }
        // }
    }
}
