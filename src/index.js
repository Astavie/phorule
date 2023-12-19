import { optimize } from 'svgo/dist/svgo.browser.js';
import * as typst from '../pkg';

function requestData(path) {
  throw "requested: " + path
}

const compiler = new typst.SystemWorld("", requestData)

const textarea = document.getElementById("math")
const result = document.getElementById("result")
const error = document.getElementById("error")

textarea.addEventListener("input", (e) => change(e.target.value))
change(textarea.value)

function change(math) {
  try {
    const svg = compiler.compile_svg(`#set page(margin: 0pt, width: auto, height: auto)\n#set text(36pt)\n$ ${math} $`, "rule.typ");
    error.innerText = "";
    result.innerHTML = optimize(svg, {
      plugins: [{
        name: "removeAttrs",
        params: { attrs: "class" },
      }, "preset-default"]
    }).data
  } catch (e) {
    error.innerText = e
  }
}
