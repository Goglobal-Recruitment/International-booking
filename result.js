let search = () => {
  let value = document.querySelector("#search").value
  console.log(value)
  getData(value)
  document.querySelector("#search").value = null
  document.querySelector("#ridate").value = null
  document.querySelector("#rodate").value = null
}

let getData = async (value) => {
  const options = {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': 'a62358b907msh3229afbfb51474fp1f1edfjsn498ec30f471f',
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  }
  let res = await fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=${value}`,
    options
  )
  let data = await res.json()
  //   console.log(data)
  find(data)
}
let place = localStorage.getItem("place")
getData(place)

let find = async (data) => {
  const options = {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': 'a62358b907msh3229afbfb51474fp1f1edfjsn498ec30f471f',
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  }

  let res = await fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=popularity&adults_number=2&units=metric&room_number=1&checkout_date=2022-10-01&filter_by_currency=AED&locale=en-gb&checkin_date=2022-09-30&latitude=${data[0].latitude}&longitude=${data[0].longitude}&children_number=2&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true`,
    options
  )

  let date = await res.json()
  console.log(date)
  console.log(date.result)
  append(date.result)
  // filter sort button

  let c1 = document.querySelector("#c1").value
  let c2 = document.querySelector("#c2").value
  let c3 = document.querySelector("#c3").value
  let c4 = document.querySelector("#c4").value
  let c5 = document.querySelector("#c5").value
  let c6 = document.querySelector("#c6").value
  let c7 = document.querySelector("#c7").value
  let c8 = document.querySelector("#c8").value
  let c9 = document.querySelector("#c9").value
  let c10 = document.querySelector("#c10").value
  let c11 = document.querySelector("#c11").value
  let c12 = document.querySelector("#c12").value
  let c13 = document.querySelector("#c13").value
  let c14 = document.querySelector("#c14").value
  let c15 = document.querySelector("#c15").value
  let c16 = document.querySelector("#c16").value
  let c17 = document.querySelector("#c17").value
  let c18 = document.querySelector("#c18").value
  let c19 = document.querySelector("#c19").value
  let c20 = document.querySelector("#c20").value
  let c21 = document.querySelector("#c21").value
  let c22 = document.querySelector("#c22").value
  let c23 = document.querySelector("#c23").value
  let c24 = document.querySelector("#c24").value
  let c25 = document.querySelector("#c25").value
  let c26 = document.querySelector("#c26").value
  let c27 = document.querySelector("#c27").value
  let c28 = document.querySelector("#c28").value
  let c29 = document.querySelector("#c29").value
  let c30 = document.querySelector("#c30").value
  let c31 = document.querySelector("#c31").value
  let c32 = document.querySelector("#c32").value
  let c33 = document.querySelector("#c33").value
  let c34 = document.querySelector("#c34").value
  let c35 = document.querySelector("#c35").value
  let c36 = document.querySelector("#c36").value
  let c37 = document.querySelector("#c37").value
  let c38 = document.querySelector("#c38").value
  let c39 = document.querySelector("#c39").value
  let c40 = document.querySelector("#c40").value
  let c41 = document.querySelector("#c41").value
  let c42 = document.querySelector("#c42").value
  let c43 = document.querySelector("#c43").value
  let b1 = document.querySelector("#b1").value
  let b2 = document.querySelector("#b2").value
  let b3 = document.querySelector("#b3").value
  let b4 = document.querySelector("#b4").value
  let b5 = document.querySelector("#b5").value
  // console.log(c1)

  if (
    c1 == "c1" ||
    c6 == "c6" ||
    c11 == "c11" ||
    c16 == "c16" ||
    c21 == "c21" ||
    c26 == "c26" ||
    c31 == "c31" ||
    c36 == "c36" ||
    c41 == "c41" ||
    b1 == "b1"
  ) {
    document.querySelector("#c1").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun1(date.result)
      console.log("I am c1")
    })
    document.querySelector("#c6").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun1(date.result)
    })
    document.querySelector("#c11").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun1(date.result)
    })
    document.querySelector("#c16").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun1(date.result)
    })
    document.querySelector("#c21").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun1(date.result)
    })
    document.querySelector("#c26").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun1(date.result)
    })
    document.querySelector("#c31").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun1(date.result)
    })
    document.querySelector("#c36").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun1(date.result)
    })
    document.querySelector("#c41").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun1(date.result)
    })
    document.querySelector("#b1").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun1(date.result)
    })
  }

  if (
    c2 == "c2" ||
    c12 == "c12" ||
    c22 == "c22" ||
    c32 == "c32" ||
    c7 == "c7" ||
    c17 == "c17" ||
    c27 == "c27" ||
    c37 == "c37" ||
    c42 == "c42" ||
    b2 == "b2"
  ) {
    document.querySelector("#c2").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun2(date.result)
    })
    document.querySelector("#c12").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun2(date.result)
    })
    document.querySelector("#c22").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun2(date.result)
    })
    document.querySelector("#c32").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun2(date.result)
    })
    document.querySelector("#c7").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun2(date.result)
    })
    document.querySelector("#c17").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun2(date.result)
    })
    document.querySelector("#c27").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun2(date.result)
    })
    document.querySelector("#c37").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun2(date.result)
    })
    document.querySelector("#c42").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun2(date.result)
    })
    document.querySelector("#b2").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun2(date.result)
    })
  }

  if (
    c3 == "c3" ||
    c13 == "c13" ||
    c23 == "c23" ||
    c33 == "c33" ||
    c43 == "c43" ||
    c8 == "c8" ||
    c18 == "c18" ||
    c28 == "c28" ||
    c38 == "c38" ||
    b3 == "b3"
  ) {
    document.querySelector("#c3").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun3(date.result)
    })
    document.querySelector("#c13").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun3(date.result)
    })
    document.querySelector("#c23").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun3(date.result)
    })
    document.querySelector("#c33").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun3(date.result)
    })
    document.querySelector("#c43").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun3(date.result)
    })
    document.querySelector("#c8").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun3(date.result)
    })
    document.querySelector("#c18").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun3(date.result)
    })
    document.querySelector("#c28").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun3(date.result)
    })
    document.querySelector("#c38").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun3(date.result)
    })
    document.querySelector("#b3").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun3(date.result)
    })
  }

  if (
    c4 == "c4" ||
    c14 == "c14" ||
    c24 == "c24" ||
    c34 == "c34" ||
    c9 == "c9" ||
    c19 == "c19" ||
    c29 == "c29" ||
    c39 == "c39" ||
    b4 == "b4"
  ) {
    document.querySelector("#c4").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun4(date.result)
    })
    document.querySelector("#c14").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun4(date.result)
    })
    document.querySelector("#c24").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun4(date.result)
    })
    document.querySelector("#c34").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun4(date.result)
    })
    document.querySelector("#c9").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun4(date.result)
    })
    document.querySelector("#c19").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun4(date.result)
    })
    document.querySelector("#c29").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun4(date.result)
    })
    document.querySelector("#c39").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun4(date.result)
    })
    document.querySelector("#b4").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun4(date.result)
    })
  }

  if (
    c5 == "c5" ||
    c15 == "c15" ||
    c25 == "c25" ||
    c35 == "c35" ||
    c10 == "c10" ||
    c20 == "c20" ||
    c30 == "c30" ||
    c40 == "c40" ||
    b5 == "b5"
  ) {
    document.querySelector("#c5").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun5(date.result)
    })
    document.querySelector("#c15").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun5(date.result)
    })
    document.querySelector("#c25").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun5(date.result)
    })
    document.querySelector("#c35").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun5(date.result)
    })
    document.querySelector("#c10").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun5(date.result)
    })
    document.querySelector("#c20").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun5(date.result)
    })
    document.querySelector("#c30").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun5(date.result)
    })
    document.querySelector("#c40").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun5(date.result)
    })
    document.querySelector("#b5").addEventListener("click", function () {
      document.querySelector("#resultData").innerHTML = null
      myFun5(date.result)
    })
  }
}

// find()

// myFun() function filter sort

function myFun1(data) {
  data.sort(function (a, b) {
    return a.review_score - b.review_score
  })
  console.log(data)
  append(data)
  console.log("sort1")
}

let myFun2 = (data) => {
  data.sort(function (a, b) {
    return b.review_score - a.review_score
  })
  console.log(data)
  append(data)
  console.log("sort2")
}

let myFun3 = (data) => {
  data.sort(function (a, b) {
    return a.min_total_price - b.min_total_price
  })
  console.log(data)
  append(data)
  console.log("sort3")
}

let myFun4 = (data) => {
  data.sort(function (a, b) {
    return b.min_total_price - a.min_total_price
  })
  console.log(data)
  append(data)
  console.log("sort4")
}

let myFun5 = (data) => {
  data.sort(function (a, b) {
    return a.review_nr - b.review_nr
  })
  console.log(data)
  append(data)
  console.log("sort5")
}

// end myFun() filter sort

function append(data) {
  document.querySelector("#resultData").innerHTML = null
  data.forEach((el) => {
    let div1 = document.createElement("div")
    let div2 = document.createElement("div")
    let div3 = document.createElement("div")
    let img = document.createElement("img")
    let h3 = document.createElement("h2")
    let p1 = document.createElement("p")
    let p2 = document.createElement("p")
    let p6 = document.createElement("p")
    p6.setAttribute("class", "p6")
    p2.setAttribute("class", "p2")
    p1.setAttribute("class", "p2")

    let div4 = document.createElement("div")
    let p3 = document.createElement("h3")
    let p4 = document.createElement("p")
    let p5 = document.createElement("p")
    let btn = document.createElement("button")
    btn.setAttribute("class", "blueBtn")

    div1.setAttribute("class", "oneDiv")
    div2.setAttribute("class", "twoDiv")
    div3.setAttribute("class", "threeDiv")
    div4.setAttribute("class", "fourDiv")

    img.src = el.main_photo_url
    h3.innerText = el.hotel_name
    p1.innerText = el.address
    p2.innerText = el.city
    p6.innerText =
      "Located in the famous shopping area of Pondy Bazaar, Grand Chennai by GRT is located .the  famous shopping area of Pondy Bazaar, Grand Chennai by GRT is located"

    p3.innerText = el.review_score_word
    p4.innerText = "Review Score: " + el.review_score
    p5.innerText = "Review NO:  " + el.review_nr
    btn.innerText = "Show Price"
    btn.addEventListener("click", () => {
        localStorage.setItem("hotelId",el.hotel_id)
      console.log(el)
      location.href = "theHotel.html"
    })
    div4.append(p3, p4, p5, btn)

    div2.append(img)
    div3.append(h3, p1, p2, p6)
    div1.append(div2, div3, div4)

    document.querySelector("#resultData").append(div1)
    document.querySelector("#h1").innerHTML = data[0].city
  })
}
