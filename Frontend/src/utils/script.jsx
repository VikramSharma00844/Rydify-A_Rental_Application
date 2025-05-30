import axios from 'axios';
const server_url = "http://localhost:3001";
import {Link} from 'react-router-dom';
function getCookie(name)
{
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
//checkdealer
async function checkdealer()
{
    var url=`${server_url}/dealer/token`;
    // console.log(url);
    var res = await axios.get(url);
    res = res.data;
    // console.log(res.error);
    var html = ``;
    if (res.error) {
        html += ``;
    } else {
        html += `<a href="/dealer/dashboard" class="nav-link">My DealerShips</a>`;
    }
    // document.getElementById('checkdealer').innerHTML = html;
}

//checkuser
async function checkuser()
{
    var url=`${server_url}/user/token`;
    var res = await axios.get(url);
    res = res.data;
    // console.log(res.error);
    var html = ``;
    if (res.error) {
        html += ``;
    } else {
        html += `<a href="/user/dashboard" class="nav-link">My Account</a>`;
    }
    // document.getElementById('checkLogin').innerHTML = html;
}

//fetch categories
async function fetchCategoryFilter()
{
    var res=await axios.get(`${server_url}/fetchCategories`);
    res=res.data;
    var records=res.records;
    var html=`<li class="nav-item"><a class="nav-link" href="/vehicles/all">All</a></li>`;
    for(var x of records)
    {
        html+=`<li class="nav-item"><a class="nav-link" href="/vehicles/${x.id}">${x.name}</a></li>`;
    }
    document.getElementById("vehicles").innerHTML=html;
}

export { server_url, getCookie,checkdealer,checkuser,fetchCategoryFilter}; // named export
