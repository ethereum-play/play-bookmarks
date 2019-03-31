const bel = require('bel')
const csjs = require('csjs-inject')

const bookmarkbar = require('bookmarkbar')

module.exports = playbookmarks

function playbookmarks (mount_url = '', done) {
  const theme = { color: 'black' }
  const bookmarks = bookmarkbar(mount_url, theme, log)
  const element = bel`<div class=${css.playbookmarks}>
    <div class=${css.bookmarks}>${bookmarks}</div>
  </div>`
  return element
  function log (data) { done(data) }
}
const css = csjs`
.playbookmarks {
  height: 500px;
  width: 500px;
  display: flex;
  justify-content: center;
  border: 1px solid black;
  padding: 5px;
}
.bookmarks {
  width: 300px;
}`
