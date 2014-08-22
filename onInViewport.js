(function (factory) {
    if (typeof define == 'function' && define.amd) {
        define(factory)
    } else if (typeof module == 'object' && module.exports) {
        module.exports = factory()
    } else {
        window.onInViewport = factory()
    }
}(function () {
    'use strict'
    var html = document.documentElement

    var onEvent = window.addEventListener ||
        function (ev, func) { this.attachEvent('on' + ev, func) }

    var offEvent = window.removeEventListener ||
        function (ev, func) { this.detachEvent('on' + ev, func) }

    var listeners = []

    var lastCall = 0
    var timeout

    function onScroll() {
        var timeSince = +new Date - lastCall
        if (timeSince < 500 && !timeout)
            return timeout = setTimeout(onScroll, 500 - timeSince)

        timeout = 0
        lastCall = +new Date

        for (var i = 0; i < listeners.length; i++)
            if (onInViewport.isIn(listeners[i].elm)) {
                listeners[i].cb()
                listeners.splice(i, 1)
            }

        if (!listeners.length) {
            offEvent.call(window, 'scroll', onScroll)
            offEvent.call(window, 'resize', onScroll)
        }
    }

    function isIn(elm) {
        elm = elm.getBoundingClientRect()

        return elm.right  > 0
            && elm.bottom > 0
            && elm.top    < html.clientHeight
            && elm.left   < html.clientWidth
    }

    function onInViewport(elm, cb) {
        if (onInViewport.isIn(elm))
            return cb()

        listeners.push({ elm: elm, cb: cb })

        if (listeners.length === 1) {
            onEvent.call(window, 'scroll', onScroll)
            onEvent.call(window, 'resize', onScroll)
        }
    }

    onInViewport.onScroll = onScroll;
    onInViewport.isIn = isIn;
    return onInViewport
}))

