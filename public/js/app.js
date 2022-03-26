const d = document;
const $main = d.getElementById("advice-slip-api");
const $fragment = d.createDocumentFragment();
let $section = d.createElement("section");
let $h2 = d.createElement("h2");
let $blockquote = d.createElement("blockquote");
let $div = d.createElement("div");
$div.classList.add("pattern-divider");
let $btn = d.createElement("button");
$btn.setAttribute("id", "generate-advice");
let $img = d.createElement("img");
$img.setAttribute("src", "./assets/images/icon-dice.svg");
let $imgLoader = d.createElement("img");
$imgLoader.classList.add("loader");
$imgLoader.setAttribute("src", "./assets/images/bars.svg");

$section.appendChild($h2);
$section.appendChild($blockquote);
$section.appendChild($div);
$btn.appendChild($img);
$section.appendChild($btn);

async function getData() {
  try {
    $h2.textContent = "Advice loading ...";
    $blockquote.textContent = "";
    $main.appendChild($imgLoader);
    let res = await fetch("https://api.adviceslip.com/advice");
    let json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    $h2.textContent = `Advice #${json.slip.id}`;
    $blockquote.textContent = `${json.slip.advice}`;
  } catch (err) {
    let message = err.statusText || "Somenthing was wrong";
    $blockquote.textContent = `Error:  ${err.status}: ${message}`;
  }
  $main.removeChild($imgLoader);
  $main.appendChild($section);
}
getData();

$btn.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
});
