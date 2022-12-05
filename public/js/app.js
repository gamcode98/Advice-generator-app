const $main = document.getElementById("main")
let $section = document.createElement("section")
let $h2 = document.createElement("h2")
let $blockquote = document.createElement("blockquote")
let $div = document.createElement("div")
$div.classList.add("pattern-divider")
let $btn = document.createElement("button")
$btn.setAttribute("id", "generate-advice")
let $img = document.createElement("img")
$img.setAttribute("src", "./assets/images/icon-dice.svg")
let $imgLoader = document.createElement("img")
$imgLoader.classList.add("loader")
$imgLoader.setAttribute("src", "./assets/images/bars.svg")

$section.appendChild($h2)
$section.appendChild($blockquote)
$section.appendChild($div)
$btn.appendChild($img)
$section.appendChild($btn)

const getData = async () => {
  try {
    $h2.textContent = "Advice loading..."
    $btn.replaceChild($imgLoader, $img)
    let response = await fetch("https://api.adviceslip.com/advice")
    let json = await response.json()
    if (!response.ok) throw { status: response.status, message: response.statusText }
    $btn.replaceChild($img, $imgLoader)
    $main?.appendChild($section)
    $h2.textContent = `Advice #${json.slip.id}`
    $blockquote.textContent = `${json.slip.advice}`
  } catch (error) {
    let message = error.message || "Something went wrong"
    $blockquote.textContent = `Error: ${error.status}: ${message}`

  }
}

$btn.addEventListener("click", (e) => {
  e.preventDefault()
  getData()
})

document.addEventListener("DOMContentLoaded", getData)
