import axios from "axios";

const getUrl = (path) => {
    const base = window.location.origin 
        ? window.location.origin + '/' + path
        : window.location.protocol + '/' + window.location.host + '/';
    return base;
}

const setName = async () => {
    console.dir(await axios.get(getUrl('get-name')));
    document.getElementById('name').innerHTML = (await axios.get(getUrl('get-name'))).data
};

setName();