import * as $ from "jquery";
import "./style.scss";
import "./index.html";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

interface quote {
  quote: string;
  author: string;
}

let quotes: Array<quote>;
const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

const tumblrShareLink = "https://www.tumblr.com/widgets/share/tool?";

$(() => {
  getQuotes().done((data) => {
    quotes = data.quotes;
    changeQuote();
  });
});

function changeQuote(): void {
  // choose color`
  const color = colors[Math.floor(Math.random() * colors.length)];
  $(".change-bg").css({ "background-color": color });
  $(".change-text").css({ color: "white" });
  setTimeout(() => {
    const newQuote = quotes[Math.floor(Math.random() * 102)];
    $("#tweet-quote").attr("href", () => {
      return `https://twitter.com/intent/tweet?hashtags?&related=freecodecamp&text=${encodeURI(
        '"' + newQuote.quote + '"'
      )} — ${newQuote.author} @davidgbiggs`;
    });
    $("#post-quote").attr("href", () => {
      return `${tumblrShareLink}posttype=quote&tags=quotes,freecodecamp,davidbiggs&caption=${encodeURI(
        newQuote.author
      )}&content=${encodeURI(
        newQuote.quote
      )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
    });
    $("#inner-quote").text(newQuote.quote);
    $("#author").text(newQuote.author);
    $(".change-text").css({ color: color });
  }, 500);
}

function getQuotes(): JQuery.jqXHR {
  return $.getJSON(
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
  );
}

$("#new-quote").on("click", (): void => {
  changeQuote();
});

$("body").append(
  $(
    "<script src='https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js'></script>"
  )
);
