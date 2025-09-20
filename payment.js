let data = JSON.parse(localStorage.getItem("_data_"))

let promobtn = document.querySelector("#promoDiv>button")
promobtn.addEventListener("click", () => {
  let promoCode = document.querySelector("#promoDiv>input")
  if (promoCode.value == "masai30") {
    alert("You Will get 30% back on Account")
  } else {
    alert("Enter Valid Promo")
  }
})
let done = () => {
  let price = localStorage.getItem("price")
  let type = localStorage.getItem("_type")
  let _fine_print = localStorage.getItem("_fine_print");
  let check_in = localStorage.getItem("check_in")
  let check_out = localStorage.getItem("check_out")
  let money = document.querySelectorAll('._price_');
  let _room_type = document.querySelector('._room_type');
  let print = document.querySelector('#_fine_print');
  let _in = document.querySelector('#_in');
  let _out = document.querySelector('#_out');
  _in.innerText = check_in;
  _out.innerText = check_out;
  print.innerText = _fine_print;
  _room_type.innerText = type;
  for(let i = 0; i < money.length; i++){
    money[i].innerText ="$"+  price;
  }
}
