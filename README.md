# onInViewport

Know when a DOM element is inside the viewport. Only called once.

Sports an UMD definition.

```
    onInViewport(document.getElementById('myElement'), function () {
        // Infinite scroll, lazy load, whatever!
    })
```

## Advanced: configure what is considered "in viewport"

onInViewport.isIn = function(elm) { return Boolean }

The default implementation is as follows:

```
onInViewport.isIn = function isIn(elm) {
    elm = elm.getBoundingClientRect()
    return elm.right > 0
        && elm.bottom > 0
        && elm.top < document.documentElement.clientHeight
        && elm.left < document.documentElement.clientWidth
}
```

Copy and paste this to your code and add some conditions so that onInViewport knows how to deal with your sliders, modals, maps and whatever.

