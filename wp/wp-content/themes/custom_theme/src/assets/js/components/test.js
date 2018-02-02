import {TweenMax, Power2, TimelineLite} from "gsap";

const Hoge;
const Foo;

const tl = new TimelineLite({paused: true})
tl.to(Hoge.el, 1, {hoge})
tl.to(Foo.el, 1, {hoge})

tl.play()
