"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

getAllPeriods();
var counter = document.getElementById('counter');
var currentTab = 'B1700_table';
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
    D2000_2021_html = '';
var searched = false;

function goToSource(tab, source, eyedee) {
  document.getElementById(tab).checked = true;
  document.getElementById(source).scrollIntoView();
  document.getElementById(eyedee).style.color = "#523dc8";
}

searchBar.addEventListener('keyup', function (e) {
  if (e.target.value.length > 2) {
    var searchString = e.target.value.toLowerCase();
    var filteredPeriod = searchArray.filter(function (row) {
      return row.contributors.toLowerCase().replace(/(<([^>]+)>)/gi, "").includes(searchString) || row.date.toLowerCase().replace(/(<([^>]+)>)/gi, "").includes(searchString) || row.languages.toLowerCase().replace(/(<([^>]+)>)/gi, "").includes(searchString) || row.links.toLowerCase().replace(/(<([^>]+)>)/gi, "").includes(searchString) || row.location.toLowerCase().replace(/(<([^>]+)>)/gi, "").includes(searchString) || row.publisher.toLowerCase().replace(/(<([^>]+)>)/gi, "").includes(searchString) || row.summary.toLowerCase().replace(/(<([^>]+)>)/gi, "").includes(searchString) || row.title.toLowerCase().replace(/(<([^>]+)>)/gi, "").includes(searchString);
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
    searchBar.value = '';
    buildCards(searchArray, currentTab);
    searched = false;
  }
}

function getAllPeriods() {
  return _getAllPeriods.apply(this, arguments);
}

function _getAllPeriods() {
  _getAllPeriods = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var myPeriodAndHTML;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getPeriod('B1700_table', 'B1700').then();

          case 2:
            myPeriodAndHTML = _context.sent;
            B1700 = myPeriodAndHTML.myPeriod;
            searchArray = B1700;
            B1700_html, currentTabCards_html = myPeriodAndHTML.html;
            _context.next = 8;
            return getPeriod('D1700-1799_table', 'D1700-1799');

          case 8:
            myPeriodAndHTML = _context.sent;
            D1700_1799 = myPeriodAndHTML.myPeriod;
            D1700_1799_html = myPeriodAndHTML.html;
            _context.next = 13;
            return getPeriod('D1800-1899_table', 'D1800-1899');

          case 13:
            myPeriodAndHTML = _context.sent;
            D1800_1899 = myPeriodAndHTML.myPeriod;
            D1800_1899_html = myPeriodAndHTML.html;
            _context.next = 18;
            return getPeriod('D1900-1999_table', 'D1900-1999');

          case 18:
            myPeriodAndHTML = _context.sent;
            D1900_1999 = myPeriodAndHTML.myPeriod;
            D1900_1999_html = myPeriodAndHTML.html;
            _context.next = 23;
            return getPeriod('D2000-2021_table', 'D2000-2021');

          case 23:
            myPeriodAndHTML = _context.sent;
            D2000_2021 = myPeriodAndHTML.myPeriod;
            D2000_2021_html = myPeriodAndHTML.html;
            counter.innerHTML = B1700.length + D1700_1799.length + D1800_1899.length + D1900_1999.length + D2000_2021.length;

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getAllPeriods.apply(this, arguments);
}

function getPeriod(_x, _x2) {
  return _getPeriod.apply(this, arguments);
}

function _getPeriod() {
  _getPeriod = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, endpoint) {
    var myPeriod, html;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch("/api/v1/".concat(endpoint));

          case 2:
            myPeriod = _context2.sent;
            _context2.next = 5;
            return myPeriod.json();

          case 5:
            myPeriod = _context2.sent;
            html = buildCards(myPeriod, id);
            return _context2.abrupt("return", {
              myPeriod: myPeriod,
              html: html
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getPeriod.apply(this, arguments);
}

function buildCards(data, id) {
  var html = '';
  var card = document.getElementById(id);

  for (var i = 0; i < data.length; i++) {
    var row = "   <div class=\"entry\" >\n            <div class=\"entry-heading\" id=".concat(data[i].eyedee, ">\n            <p class=\"title\">").concat(data[i].title, "</p>\n            <p class=\"medium\">").concat(data[i].medium, "</p>\n            </div>\n            <u class=\"heading\">Contributor(s)</u>\n            <ul class=\"info\">").concat(data[i].contributors, "</ul>\n            <u class=\"heading\">Publication date</u>\n            <ul class=\"info\">").concat(data[i].date, "</ul>\n            <u class=\"heading\">Duration</u>\n            <ul class=\"info\">").concat(data[i].duration, "</ul>\n            <u class=\"heading\">Publisher</u>\n            <ul class=\"info\">").concat(data[i].publisher, "</ul>\n            <u class=\"heading\">Publication location</u>\n            <ul class=\"info\">").concat(data[i].location, "</ul>\n            <u class=\"heading\">Language(s)</u>\n            <ul class=\"info\">").concat(data[i].languages, "</ul>");

    if (data[i].container != undefined) {
      row += "<u class=\"heading\">Container</u>\n                    <ul class=\"info\">".concat(data[i].container, "</ul>");
    }

    if (data[i].iteration != undefined) {
      row += "<u class=\"heading\">Iteration</u>\n                    <ul class=\"info\">".concat(data[i].iteration, "</ul>");
    }

    row += "<u class=\"heading\">Summary and significance</u>\n                    <ul class=\"info\">".concat(data[i].summary, "</ul>\n                <u class=\"heading\">Link(s) to source</u>\n                    <ul class=\"info\">").concat(data[i].links, "</ul>");

    if (data[i].notes != undefined) {
      row += "<u class=\"heading\">Notes</u>\n                    <ul class=\"info\">".concat(data[i].notes, "</ul>");
    }

    if (data[i].references != undefined) {
      row += "<u class=\"heading\">References</u>\n            <ul class=\"info\">".concat(data[i].references, "</ul>");
    }

    row += "</div>";
    html += row;
  }

  card.innerHTML = html;
  return html;
}