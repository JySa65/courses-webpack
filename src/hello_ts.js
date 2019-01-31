import style from './style.css'
import sass from './scss/main.scss'
import logo from './img/typescript-logo.svg'
import data from './data.json'
import { HelloWorld } from './components/App.ts'


const d = document,
  app = d.getElementById('app'),
  h1 = d.createElement('h1'),
  img = d.createElement('img'),
  p = d.createElement('p'),
  nav = d.createElement('nav'),
  hello = new HelloWorld('TypeScript')

let menu = ''

data.links.forEach(link => menu += `<a href="${link[1]}">${link[0]}</a>`)

h1.textContent = 'Webpack + TypeScript'
p.textContent = hello.greet()
img.src = logo
nav.classList.add('Menu')
nav.innerHTML = menu

app.appendChild(h1)
app.appendChild(p)
app.appendChild(nav)
app.appendChild(img)
