import "regenerator-runtime/runtime";

getAllPeriods();
var counter = document.getElementById("counter");
var currentTab = "B1700_table";
var searchArray = [];
var B1700,
  D1700_1799,
  D1800_1899,
  D1900_1999,
  D2000_2021 = [];
var currentTabCards_html,
  B1700_html,
  D1700_1799_html,
  D1800_1899_html,
  D1900_1999_html,
  D2000_2021_html = "";
var searched = false;

document.getElementById("B1700").addEventListener("click", (e) => {
  clearSearchBar();
  searchArray = B1700;
  currentTab = "B1700_table";
  currentTabCards_html = B1700_html;
});
document.getElementById("D1700-1799").addEventListener("click", (e) => {
    clearSearchBar();
    searchArray = D1700_1799;
    currentTab = "D1700-1799_table";
    currentTabCards_html = D1700_1799_html;
  });
document.getElementById("D1800-1899").addEventListener("click", (e) => {
    clearSearchBar();
    searchArray = D1800_1899;
    currentTab = "D1800-1899_table";
    currentTabCards_html = D1800_1899_html;
  });
document.getElementById("D1900-1999").addEventListener("click", (e) => {
    clearSearchBar();
    searchArray = D1900_1999;
    currentTab = "D1900-1999_table";
    currentTabCards_html = D1900_1999_html;
  });
document.getElementById("D2000-2021").addEventListener("click", (e) => {
    clearSearchBar();
    searchArray = D2000_2021;
    currentTab = "D2000-2021_table";
    currentTabCards_html = D2000_2021_html;
  });

window.goToSource = function (tab, source, eyedee) {
  document.getElementById(tab).checked = true;
  document.getElementById(source).scrollIntoView();
  document.getElementById(eyedee).style.color = "#523dc8";
}

searchBar.addEventListener("keyup", (e) => {
  if (e.target.value.length > 2) {
    const searchString = e.target.value.toLowerCase();

    const filteredPeriod = searchArray.filter((row) => {
      return (
        row.contributors
          .toLowerCase()
          .replace(/(<([^>]+)>)/gi, "")
          .includes(searchString) ||
        row.date
          .toLowerCase()
          .replace(/(<([^>]+)>)/gi, "")
          .includes(searchString) ||
        row.languages
          .toLowerCase()
          .replace(/(<([^>]+)>)/gi, "")
          .includes(searchString) ||
        row.links
          .toLowerCase()
          .replace(/(<([^>]+)>)/gi, "")
          .includes(searchString) ||
        row.location
          .toLowerCase()
          .replace(/(<([^>]+)>)/gi, "")
          .includes(searchString) ||
        row.publisher
          .toLowerCase()
          .replace(/(<([^>]+)>)/gi, "")
          .includes(searchString) ||
        row.summary
          .toLowerCase()
          .replace(/(<([^>]+)>)/gi, "")
          .includes(searchString) ||
        row.title
          .toLowerCase()
          .replace(/(<([^>]+)>)/gi, "")
          .includes(searchString)
      );
    });
    buildCards(filteredPeriod, currentTab);
    searched = true;
  }
  if (e.target.value.length == 0) {
    searched = false;
    document.getElementById(currentTab).innerHTML = currentTabCards_html;
  }
});

function clearSearchBar() {
  if (searched) {
    searchBar.value = "";
    buildCards(searchArray, currentTab);
    searched = false;
  }
}

async function getAllPeriods() {
  var myPeriodAndHTML = await getPeriod("B1700_table", "B1700").then();
  B1700 = myPeriodAndHTML.myPeriod;
  searchArray = B1700;
  B1700_html, (currentTabCards_html = myPeriodAndHTML.html);

  myPeriodAndHTML = await getPeriod("D1700-1799_table", "D1700-1799");
  D1700_1799 = myPeriodAndHTML.myPeriod;
  D1700_1799_html = myPeriodAndHTML.html;

  myPeriodAndHTML = await getPeriod("D1800-1899_table", "D1800-1899");
  D1800_1899 = myPeriodAndHTML.myPeriod;
  D1800_1899_html = myPeriodAndHTML.html;

  myPeriodAndHTML = await getPeriod("D1900-1999_table", "D1900-1999");
  D1900_1999 = myPeriodAndHTML.myPeriod;
  D1900_1999_html = myPeriodAndHTML.html;

  myPeriodAndHTML = await getPeriod("D2000-2021_table", "D2000-2021");
  D2000_2021 = myPeriodAndHTML.myPeriod;
  D2000_2021_html = myPeriodAndHTML.html;

  counter.innerHTML =
    B1700.length +
    D1700_1799.length +
    D1800_1899.length +
    D1900_1999.length +
    D2000_2021.length;
}

async function getPeriod(id, endpoint) {
  var myPeriod = await fetch(`/api/v1/${endpoint}`);
  myPeriod = await myPeriod.json();
  var html = buildCards(myPeriod, id);
  return { myPeriod, html };
}

function buildCards(data, id) {
  var html = "";
  var card = document.getElementById(id);
  for (var i = 0; i < data.length; i++) {
    var row = `   <div class="entry" >
            <div class="entry-heading" id=${data[i].eyedee}>
            <p class="title">${data[i].title}</p>
            <p class="medium">${data[i].medium}</p>
            </div>
            <u class="heading">Contributor(s)</u>
            <ul class="info">${data[i].contributors}</ul>
            <u class="heading">Publication date</u>
            <ul class="info">${data[i].date}</ul>
            <u class="heading">Duration</u>
            <ul class="info">${data[i].duration}</ul>
            <u class="heading">Publisher</u>
            <ul class="info">${data[i].publisher}</ul>
            <u class="heading">Publication location</u>
            <ul class="info">${data[i].location}</ul>
            <u class="heading">Language(s)</u>
            <ul class="info">${data[i].languages}</ul>`;

    if (data[i].container != undefined) {
      row += `<u class="heading">Container</u>
                    <ul class="info">${data[i].container}</ul>`;
    }

    if (data[i].iteration != undefined) {
      row += `<u class="heading">Iteration</u>
                    <ul class="info">${data[i].iteration}</ul>`;
    }

    row += `<u class="heading">Summary and significance</u>
                    <ul class="info">${data[i].summary}</ul>
                <u class="heading">Link(s) to source</u>
                    <ul class="info">${data[i].links}</ul>`;

    if (data[i].notes != undefined) {
      row += `<u class="heading">Notes</u>
                    <ul class="info">${data[i].notes}</ul>`;
    }

    if (data[i].references != undefined) {
      row += `<u class="heading">References</u>
            <ul class="info">${data[i].references}</ul>`;
    }
    row += `</div>`;

    html += row;
  }
  card.innerHTML = html;
  return html;
}
