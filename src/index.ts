import * as _ from "lodash";
import * as $ from "jquery";
import "./style.scss";

function component(): HTMLDivElement {
  const element = document.createElement("div");

  element.classList.add("hi");

  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());
$(".hi").css("color", "blue");
