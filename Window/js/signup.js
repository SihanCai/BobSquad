// var dummyData = {
//     "data": [
//         {
//             user_id: 1,
//             username: "Bob",
//             password: "1234",
//             userVideo: [],
//         },
//         {
//             user_id: 2,
//             username: "Test",
//             password: "123456",
//             userVideo: [],
//         }
//     ]
// }
let dummyData={data:JSON.parse(sessionStorage.getItem("users"))};
var check = function () {
    if (document.getElementById('password').value ==
        document.getElementById('passwordRe').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Repeated password matching';
        document.getElementById("submit").disabled = false;
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Repeated password not matching';
        document.getElementById("submit").disabled = true;
    }
}


function fuzzyQuery(list, username, password) {

    for (let i = 0; i < list.length; i++) {
        let str = list[i].username;
        let str1 = list[i].password;
        if (str === username && str1 === password) {
            return list[i];
        }
    }
    return false;
}

function checkSameUsername(username, list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].username === username) {
            return false;
        }
    }
    return true;
}

function Login() {
    var username = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;
    let result = fuzzyQuery(dummyData.data, username, password);
    if(result){
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("user_id", result.user_id);
        window.location.href="index.html";
    }
    else {
        alert("Your username or password is not correct.");
    }
}


// function getScenemapData(){
//   var jsondata={};
//   $.getJSON("/js/data.json", function (data,status){
//     console.log(1);
//     console.log("是是不是成功读到数据"+status);
//     if( status=='success'){
//     jsondata = data;
//    //在这里可以调用函数
//     dosomething();
//     return jsondata;
//   }else{
//   console.log("没有读取到本地文件："+status);
//   return false;
//     }
//   })
// }


function SignUp() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username === "" || password === "") {
        alert("Please input your username or password");
        return;
    }
    let message = checkSameUsername(username, dummyData.data);
    if (!message) {
        alert("The username is registered.");
    } else {
        var reuser_id = dummyData.data.length + 1;
        var obj = {"user_id": reuser_id, "username": username, "password": password, "userVideo": []};
        dummyData.data.push(obj);
        sessionStorage.setItem("users",JSON.stringify(dummyData.data));
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("user_id", reuser_id);
        window.location.href = "index.html";
    }
}