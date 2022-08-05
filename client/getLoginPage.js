
const getLoginPage = (page,DOMAIN) => {

    const regPage = `<!DOCTYPE HTML >
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="${DOMAIN}/ico">
    <title>KiberBank</title>
</head>
<script>
if(localStorage.getItem("id")){
    const a = document.createElement("a");
    a.setAttribute("href", '${DOMAIN}/?id=' + localStorage.getItem("id"));
    a.click();
}
</script>
<style>
    body{font-family:sans-serif;font-size:20px}p{margin-bottom:.3rem}#div_form{position:fixed;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center}#form{width:200px;display:flex;flex-direction:column;justify-content:center;align-items:center;border:.05rem solid dimgrey;background-color:#19cbea;padding:.4rem;border-radius:.7rem}.text_name{text-align:center;font-size:1rem;margin-top:.5rem;color:#fff;font-weight:700}.for_input{padding:10px;border-radius:10px;border:.05rem solid dimgrey;font-family:sans-serif}.button{background-color:#fff;color:#0fbbc2;padding:.6rem 1.2rem;border-radius:10px;border:.05rem solid dimgrey;font-weight:bolder;font-size:.8rem;cursor:pointer;margin-top:1rem}input:focus{border:.05rem solid gray}.button:hover{opacity:.9;border:.05rem solid #bababa}
</style>
<body>
<div id="div_form"> <a class="button" href="${DOMAIN}/?page=login" style="position: absolute; top: 5vh;right: 5vw" id="to_log">Авторизоваться</a><div id="form"><label for="name" class="text_name">Имя</label><input id ="name" class="for_input"><label for="login" class="text_name">Логин</label><input id ="login" class="for_input"><label  for="password" class="text_name">Пароль</label><input type="password" id ="password" class="for_input"><label for="repeatPassword" class="text_name">Повторите пароль</label><input type="password" id ="repeatPassword" class="for_input"><label for="group" class="text_name">Группа</label><input id ="group" class="for_input"><p id="hint" style="color: indianred;font-size:0.8rem;"></p><a class="button" id="button"> Зарегистрироваться</a></div></div>
</body>
<script>
const request = (name,group,login,password) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "json";

                    xhr.open("GET", \`${DOMAIN}/reg?name=\$\{name\}&group=\$\{group\}&login=\$\{login\}&password=\$\{password\}\`);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                    xhr.onload = () => {
                        if (xhr.status !== 200) {
                            return;
                        }
                        if(xhr.response.state === true){
                         const a = document.createElement("a");
                         a.setAttribute("href", '${DOMAIN}/?page=login');
                         a.click();
                        }else{
                            alert(xhr.response.message);
                        }

                    };

                    xhr.onerror = () => {
                        alert(\`Ошибка соединения\`);
                    };
                    xhr.send();
                };
document.getElementById("button").addEventListener("click",()=>{
    const value = (v) => document.getElementById(v).value;
    const message = (m) => document.getElementById("hint").textContent = m;
    const pas = value("password");
    const rPas = value("repeatPassword");
    
    if (pas !== rPas) {
        message("Пароли должны совпадать.");
        return;
    }
    if (pas.length < 8) {
        message("Пароль должен быть больше 8 символов.");
        return;
    }
    if (pas.toLowerCase() === pas) {
        message("Пароль должен содержать хотя бы одну заглавную букву и цифру.");
        return;
    }
    request(value("name"),value("group"),value("login"),pas);
})
</script>
</html>`

    const loginPage = `<!DOCTYPE HTML >
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="${DOMAIN}/ico">
    <title>KiberBank</title>
</head>
<script>
if(localStorage.getItem("id")){
    const a = document.createElement("a");
    a.setAttribute("href", '${DOMAIN}/?id=' + localStorage.getItem("id"));
    a.click();
}
</script>
<style>
    body{font-family:sans-serif;font-size:20px}p{margin-bottom:.3rem}#div_form{position:fixed;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center}#form{width:200px;display:flex;flex-direction:column;justify-content:center;align-items:center;border:.05rem solid dimgrey;background-color:#19cbea;padding:.4rem;border-radius:.7rem}.text_name{text-align:center;font-size:1rem;margin-top:.5rem;color:#fff;font-weight:700}.for_input{padding:10px;border-radius:10px;border:.05rem solid dimgrey;font-family:sans-serif}.button{background-color:#fff;color:#0fbbc2;padding:.6rem 1.2rem;border-radius:10px;border:.05rem solid dimgrey;font-weight:bolder;font-size:.8rem;cursor:pointer;margin-top:1rem}input:focus{border:.05rem solid gray}.button:hover{opacity:.9;border:.05rem solid #bababa}
</style>
<body>
<div id="div_form"> <a class="button" href="${DOMAIN}" style="position: absolute; top: 5vh;right: 5vw" id="to_log">Зарегистрироваться</a><div id="form"><label for="login" class="text_name">Логин</label><input id ="login" class="for_input"><label  for="password" class="text_name">Пароль</label><input type="password" id ="password" class="for_input"><a class="button" id="button"> Авторизоваться</a></div></div>
</body>
<script>
const request = (login,password) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = "json";

                    xhr.open("GET", \`${DOMAIN}/auto?login=\$\{login\}&password=\$\{password\}\`);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                    xhr.onload = () => {
                        if (xhr.status !== 200) {
                            return;
                        }
                        if(xhr.response.state === true){
                         const a = document.createElement("a");
                         a.setAttribute("href", '${DOMAIN}/?id=' + xhr.response.id);
                         localStorage.setItem("id", xhr.response.id);
                         a.click();
                        }else{
                            alert(xhr.response.message);
                        }

                    };

                    xhr.onerror = () => {
                        alert(\`Ошибка соединения\`);
                    };
                    xhr.send();
                };
document.getElementById("button").addEventListener("click",()=>{
    const value = (v) => document.getElementById(v).value;
    request(value("login"),value("password"));
})
</script>
</html>`

    if (page === "login") {
        return loginPage;
    } else {
        return regPage;
    }
}

export {getLoginPage};