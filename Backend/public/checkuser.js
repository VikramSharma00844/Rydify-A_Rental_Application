async function checkuser() {

    var res = await fetch('/user/token');
    res = await res.json();
    // console.log(res.error);
    var html = ``;
    if (res.error) {
        html += `<a class="nav-link" href="">User</a>
                                <ul>
                                    <li class="nav-item"><a class="nav-link" href="/user/login">Login</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/user/signup">SignUp</a></li>
                                 </ul>`;
    } else {
        html += `<a href="/user/dashboard" class="nav-link">My Account</a>`;
    }
    document.getElementById('checkLogin').innerHTML = html;
}