# onInViewport

Know when a DOM element is inside the viewport. You can use this for lazily loading images, infinite scroll, user tracking, etc.

Sports an UMD definition.

# Usage

Call `onInViewport` with an element and a callback. The callback gets called (once and only once) when the element is in the viewport.

If the element is already in the viewport, onInViewport is called immediately.

```
    onInViewport(document.getElementById('myElement'), function () {
        // Infinite scroll, lazy load, whatever!
    })
```

To check if an element is in the viewport, use onInViewport.isIn.

```
    onInViewport.isIn(myElement);  // -> true if it's inside the viewport, false otherwise.
```

## Advanced stuff

### Faking a user scroll

You can force onInViewport to reconsider things. If you have something which may push new things onto the screen without the user actually scrolling (such as a slider), you may want to tell onInViewport that the scroll changed, so it can recalculate whether the elements are on the screen or not.

To fake a user-initiated scroll, call onInViewport.onScroll. This is throttled (because browsers send a lot of scroll and resize events), so don't worry about calling it lots of times.

### configure what is considered "in viewport"

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

