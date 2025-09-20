let user=JSON.parse(localStorage.getItem('user')) ||[]
function signin(){
    event.preventDefault()
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let enter=new products(name,email,password)
    user.push(enter)
    localStorage.setItem("user",JSON.stringify(user))
    location.href="create.html"
}
function products(name,email,password){
    this.name=name;
    this.email=email;
    this.password=password;
    console.log(name,email,password)
}
