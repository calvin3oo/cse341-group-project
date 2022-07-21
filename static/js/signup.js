import axios from "axios";
import { handleErr } from "../../controllers/utils.js";

//Add event listener to the login button
document.getElementById("user-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    //Get the username and password from the form
    const formData = new FormData(document.getElementById("user-form"));

    var body = {};
    formData.forEach(function(value, key){
        body[key] = value;
    });

    //Make a request to the server to login
    await axios.post("/auth/signup", body).catch(err=> handleErr(false, err));
    
    window.location.href = "/";
});