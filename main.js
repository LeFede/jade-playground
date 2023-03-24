import './style.css'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// import JsWorker from 'monaco-editor/esm/vs/language/'

window.MonacoEnvironment = {
  getWorker: function (_, label) {
    if (label === 'html') return new HtmlWorker()
    if (label === 'css') return new CssWorker()
    if (label === 'javascript') return new JsWorker()
  }
}



const $ = sel => document.querySelector(sel)
const $html = $("[data-field=html]")
const $css = $("[data-field=css]")
const $js = $("[data-field=js]")
const $iframe = $("[data-field=iframe]")

const COMMON_EDITOR_OPTIONS = {
  theme: 'vs-dark',
  fontSize: 24,
  automaticLayout: true,
  fixedOverflowWidgets: true,
  scrollBeyondLastLine: false,
  roundedSelection: false,
  minimap: {
    enabled: false
  }
}

const htmlEditor = monaco.editor.create($html, {
  value: '',
  language: 'html',
  ...COMMON_EDITOR_OPTIONS,
})

const cssEditor = monaco.editor.create($css, {
  value: '',
  theme: 'vs-dark',
  fontSize: 24,
  language: 'css',
  ...COMMON_EDITOR_OPTIONS,
})

const jsEditor = monaco.editor.create($js, {
  value: '',
  theme: 'vs-dark',
  fontSize: 24,
  language: 'javascript',
  ...COMMON_EDITOR_OPTIONS,
})

const fields = {
  html: "",
  css: "",
  js: "",
}

const createHtml = ({html, css, js}) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${css}</style>
    <script>${js}</script defer>
  </head>
  <body>
    ${html}
  </body>
  </html>
  `
}

// htmlEditor.onDidChangeModelContent(e => {
//   const htmlEditorContent = htmlEditor.getValue()
//   fields['html'] = htmlEditorContent
//   const html = createHtml(fields)
//   $iframe.setAttribute("srcdoc", html)
// })


const updateHtml = (e) => {
  const htmlEditorContent = htmlEditor.getValue()
  fields['html'] = htmlEditorContent
  const html = createHtml(fields)
  $iframe.setAttribute("srcdoc", html)
}

const updateCss = (e) => {
  const cssEditorContent = cssEditor.getValue()
  fields['css'] = cssEditorContent
  const css = createHtml(fields)
  $iframe.setAttribute("srcdoc", css)
}

const updateJs = (e) => {
  const jsEditorContent = jsEditor.getValue()
  fields['js'] = jsEditorContent
  const js = createHtml(fields)
  $iframe.setAttribute("srcdoc", js)
}

htmlEditor.onDidChangeModelContent(updateHtml)
cssEditor.onDidChangeModelContent(updateCss)
jsEditor.onDidChangeModelContent(updateJs)

// $html.oninput = update
// $css.oninput = update
// $js.oninput = update




