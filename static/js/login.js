import axios from "axios";
import { handleErr } from "../../controllers/utils.js";

//Add event listener to the login button
document.getElementById("user-form").addEventListener("submit", async function(e) {
    try{
        e.preventDefault();

        //Get the username and password from the form
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const formData = new FormData(document.getElementById("user-form"));

        var body = {};
        formData.forEach(function(value, key){
            body[key] = value;
        });

        //Make a request to the server to login
        const response = await axios.post("/auth/login", body).catch(err => {throw new Error("invalid username or password")});

        //If the request was successful, redirect to the home page
        window.location.href = "/";
    }catch(err){
        handleErr( false, err)
    }

});