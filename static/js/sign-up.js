import axios from "axios";

//Add event listener to the login button
document.getElementById("user-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    //Get the username and password from the form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const formData = new FormData(document.getElementById("user-form"));

    var body = {};
    formData.forEach(function(value, key){
        body[key] = value;
    });
    console.dir(body);

    //Make a request to the server to login
    const response = await axios.post("/auth/signup", body);
    
    console.log(response);
});