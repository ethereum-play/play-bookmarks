# play-bookmarks
play themed bookmarks component which reads/writes to a mounted filesystem iframe

https://ethereum-play.github.io/play-bookmarks


# protocol

## implement iframe filesystem (e.g. `filesystem.html`)
```html
<!doctype html>
<html>
  <head><meta charset="utf-8"></head>
  <body><script>
    // RECEIVE
    window.onmessage = ({ source, origin, data }) => {
      console.log(data) // see MESSAGE
    }
    //SEND
    window.parent.postMessage(MESSAGE, '*')
  </script></body>
</html>
```

## use iframe filesystem in (e.g. `index.html`)
```html
<!doctype html>
<html>
  <head><meta charset="utf-8"></head>
  <body><script>
    var message, channel

    // MOUNT
    const mount_url = 'https://localhost:8080/filesystem.html'
    const iframe = document.createElement('iframe')
    iframe.src = mount_url
    iframe.style = 'border: 0; width: 0px; height: 0px;'
    iframe.onload = send
    document.body.appendChild(iframe)

    // SEND
    function send (event) {
      channel = iframe.contentWindow
      channel.postMessage(message, mount_url)
    }

    // RECEIVE
    window.addEventListener('message', ({ source, data }) => {
      if (source == channel) {
        console.log(data)
      }
    })
  </script></body>
</html>
```

## message
Below is a list of possible MESSAGEs to send
```js
// @TODO: write the full list of MESSAGEs
```

## data
Below follows a list of possible DATA to receive
```js
// @TODO: write the full list of DATA
```
