// let quotes = [
//     { Date: "22 Sept", Opening: 1658, closing: 1510 },
//     { Date: "23 Sept", Opening: 1654, closing: 1699.99 },
//     { Date: "24 Sept", Opening: 1520, closing: 1520.5 },
//     { Date: "25 Sept", Opening: 1592, closing: 1501.01 },
//     { Date: "26 Set", Opening: 1738, closing: 1741.6 }
//   ];

let searchBtn = document.getElementById("btn1");

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  quoteAPI();
});

async function quoteAPI() {
  const companyName = document.querySelector("#companyName").value;
  console.log(companyName);

  const API_Key = "SF58QLX7JQWWACZL";

  await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${companyName}.BSE&apikey=${API_Key}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      renderQuote(data["Global Quote"]);
    })
    .catch();

  // console.log(response.url);
}

function renderQuote(quote) {
  let symbol = quote["01. symbol"];
  let price = quote["05. price"];
  let open = quote["02. open"];
  let previousClose = quote["08. previous close"];

  document.getElementById("nameOfCompany").innerText = symbol;
  document.getElementById("currPrice").innerText = price;
  document.getElementById("todayOpening").innerText = open;
  document.getElementById("prevClose").innerText = previousClose;
}

let daysBtn = document.getElementById("btn2");

daysBtn.addEventListener("click", (event) => {
  event.preventDefault();

  timeSeriesAPI();
});

async function timeSeriesAPI() {
  let companyName = document.querySelector("#companyName").value;
  // console.log(companyName);

  let days = document.querySelector("#days").value;
  // console.log(days);

  fetch(
    https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${companyName}.BSE&apikey=SF58QLX7JQWWACZL
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      renderTimeSeries(data["Time Series (Daily)"], days);
    });
}

// great article on handling the json data
// https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/

function renderTimeSeries(tsData, days) {
  //     // 2021-05-05:
  // 1. open: "1919.7"
  // 2. high: "1937.9"
  // 3. low: "1908.15"
  // 4. close: "1919.75"
  // 5. adjusted close: "1913.5933"
  // 6. volume: "287285"
  // 7. dividend amount: "0.0000"

  //creating an array and pushing object into that

  let dates = Object.keys(tsData);
  // console.log(dates);
  //console.log(tsData[dates[1]]["1. open"]);

  /// creating the array of objects like "quotes" array given in starting
  let tableData = [];

  for (let i = 0; i < days; i++) {
    let oneDay = {
      Date: dates[i],
      Opening: tsData[dates[i]]["1. open"],
      closing: tsData[dates[i]]["4. close"],
    };
    tableData.push(oneDay);
  }

  // console.log(tableData);

  ///Creating the table

  let table = document.querySelector("table");
  let data = Object.keys(tableData[0]);

  generateTable(table, tableData);
  // generateTableHead(table, data);
}

// generating rows/cols html

//// https://www.valentinog.com/blog/html-table/
// used this article to create table with js

function generateTable(table, data) {
  let tableBody = document.getElementById("tableBody");

  // cleaning the body before rendering the new data
  if (tableBody) {
    tableBody.innerHTML = "";
  }

  for (let element of data) {
    let row = tableBody.insertRow();

    for (let key in element) {
      let cell = row.insertCell();

      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

//generating thead HTMl
//   function generateTableHead(table, data) {

//     // if thead already exist then return otherwise create it
//     let th = document.getElementById("header");
//     if (th) {
//         return ;
//     } else {

//         let thead = table.createTHead();
//         thead.setAttribute("id", "header");
//         let row = thead.insertRow();
