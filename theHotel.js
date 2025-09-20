

let onload = async () => {
  let id = JSON.parse(localStorage.getItem("hotelId"));
    // let child = document.querySelector('#child').value;
    let child=3
    // let adults = document.querySelector('#adults').value;
    let adults = 2
  let url1 = `https://booking-com.p.rapidapi.com/v1/hotels/data?hotel_id=${id}&locale=en-gb`
  let url = `https://booking-com.p.rapidapi.com/v1/hotels/photos?locale=en-gb&hotel_id=${id}`
  let res = await fetch(url1, {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': 'a62358b907msh3229afbfb51474fp1f1edfjsn498ec30f471f',
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  })
  res = await res.json()
  appendTable(res,child,adults)
  let photos = await fetch(url, {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': 'a62358b907msh3229afbfb51474fp1f1edfjsn498ec30f471f',
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  })
  photos = await photos.json()
  let _main_image = document.querySelector("#_main_image")
  // _main_image.addEventListener("click",()=>{
  //   _append(photos)
  // })
  let _image_1_1 = document.querySelector("#_image_1>img:nth-child(1)")
  let _image_1_2 = document.querySelector("#_image_1>img:nth-child(2)")
  let _name_here = document.querySelector("#_name_here")
  let _more_img = document.querySelector("#_more_img")
  let img1 = document.createElement("img")
  img1.src = photos[3].url_1440
  let img2 = document.createElement("img")
  img2.src = photos[4].url_1440
  let img3 = document.createElement("img")
  img3.src = photos[5].url_1440
  let img4 = document.createElement("img")
  img4.src = photos[6].url_1440
  let img5 = document.createElement("img")
  let _details_explain = document.querySelector('#_details_explain');
  let _fine_print = document.querySelector('#_fine_print');
  img5.src = photos[7].url_1440
  _name_here.innerText = res.name
  _main_image.src = photos[0].url_1440
  _image_1_1.src = photos[1].url_1440
  _image_1_2.src = photos[2].url_1440
  _more_img.append(img1, img2, img3, img4, img5)
  _details_explain.innerText = res.description_translations[0].description;
  _fine_print.innerText =  res.description_translations[0].description;
  localStorage.setItem("_fine_print",res.description_translations[0].description)
}
onload()

async function appendTable(find,child,adults){
    let id = find.hotel_id;
    let url = `https://booking-com.p.rapidapi.com/v1/hotels/room-list?checkin_date=2022-09-30&units=metric&checkout_date=2022-10-01&currency=AED&locale=en-gb&adults_number_by_rooms=${adults}&hotel_id=${id}&children_number_by_rooms=${child}`
        let res = await fetch(url, {
          method: "GET",
          headers: {
            'X-RapidAPI-Key': 'a62358b907msh3229afbfb51474fp1f1edfjsn498ec30f471f',
            "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
          },
        })
        res = await res.json()
        
      appendTable2(res)

}

function appendTable2(data){
    data = data[0].block;
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = null;
    data.forEach(el => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let h3 = document.createElement("h3");
        h3.innerText= el.name_without_policy;
        let td2 = document.createElement("td");
        td2.innerHTML = `<h3>$ ${el.min_price.price}</h3>`
        let td3 = document.createElement("td");
        td3.innerText = `Brackfast Included: ${el.breakfast_included?"Yes":"No"}`
       
        let td5 = document.createElement("td");
        let btn = document.createElement("button");
        btn.addEventListener("click",()=>{
          localStorage.setItem("price",el.min_price.price)
          localStorage.setItem("_type",el.name_without_policy);
          location.href = "payment.html"
        })
        btn.className ="_button_"
        btn.innerText="I'LL Reserve"
        td1.append(h3)
        td5.append(btn)
        tr.append(td1,td2,td3,td5)
        tbody.append(tr)
    });
}