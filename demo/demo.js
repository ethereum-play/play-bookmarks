const bel = require('bel')

const playbookmarks = require('../')

const mount_url = localStorage.mount_url || ''
var id = 0

var LISTENER, CHANNEL
const element = playbookmarks(mount_url, data => {
  const { from: [key1, id1], path: [key2, id2], type, body } = data

  if (type === 'error') return log.appendChild(bel`<pre style="background-color: red;">${id+++':'} ${err}</pre>`)
  if (type === 'channel:connect') return setup(data)
  if (type === 'channel:disconnect') return log.appendChild(bel`<pre style="background-color: green;">${id+++':'} successfull unmount ${data}</pre>`)
  if (type === 'cmd:del') return log.appendChild(bel`<pre style="background-color: green;">${id+++':'} [del] ${data}</pre>`)
  if (type === 'cmd:set') return log.appendChild(bel`<pre style="background-color: green;">${id+++':'} [set] ${data.key} = ${data.val}</pre>`)
  returnlog.appendChild(bel`<pre style="background-color: red;">${id+++':'} command not supported: ${type}</pre>`)
})

function setup ([url, channel]) {
  localStorage.mount_url = url
  log.appendChild(bel`<pre style="background-color: green;">${id+++':'} iframe filesystem mounted</pre>`)
  if (LISTENER) window.removeEventListener('message', LISTENER)
  LISTENER = ({ source, data }) => {
    if (channel === source) {
      log.appendChild(bel`<pre style="background-color: green;">${id+++':'} ${JSON.stringify(data, null, 2)}</pre>`)
    }
  }
  window.addEventListener('message', LISTENER)
  CHANNEL = channel
}

const commands = bel`<textarea style="flex-grow: 1; height: 0;">
  // ... @TODO: ... write commands
</textarea>`
const log = bel`<div class="log"></div>`
const run = bel`<button style="flex-grow: 1;">run next</button>`
const all = bel`<button style="flex-grow: 1;">run all</button>`
const page = bel`<div>
  <h1>play bookmarks</h1>
  <div class="container">
    <style>
      .container { display: flex; }
      .log {
        border: 1px dashed white; flex-grow: 1;
        width: 400px; overflow-y: scroll; padding: 5px;
        background-color: #333; color: white;
        height: 0;
      }
    </style>
    <div style="display: flex; flex-direction: column;">
      ${log}
      ${commands}
      <span style="display: flex;">${run}${all}</span>
    </div>
    <div>${element}</div>
  </div>
</div>`
document.body.appendChild(page)

run.onclick = async event => {
  if (!CHANNEL) {
    log.appendChild(bel`<pre style="background-color: red;">${id+++':'} no filesystem mounted</pre>`)
  } else {
    log.appendChild(bel`<pre style="background-color: green;">${id+++':'} yay!</pre>`)
  }
  log.scrollTop = log.scrollHeight
}
all.onclick = async event => {
  Array(10).fill('all yay!').forEach(x => {
    log.appendChild(bel`<pre style="background-color: green;">${id+++':'} all yay!</pre>`)
  })
  log.scrollTop = log.scrollHeight
}
