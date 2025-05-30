async function checkdealer()
{
    // console.log("dealer");
    var res = await fetch('/dealer/token');
    res = await res.json();
    // console.log(res.error);
    var html = ``;
    if (res.error) {
        html += `<a class="nav-link" href="">Dealer</a>
                                <ul>
                                    <li class="nav-item"><a class="nav-link" href="/dealer/login">Login</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/dealer/signup">SignUp</a></li>
                                 </ul>`;
    } else {
        html += `<a href="/dealer/dashboard" class="nav-link">My DealerShips</a>`;
    }
    document.getElementById('checkdealer').innerHTML = html;
}