// ==UserScript==
// @name         YouTube Classic (Pre-2025) Controls
// @namespace    https://github.com/Gameknight963
// @version      1.0.0
// @description  Restores the classic player layout and icons using the live DOM, without experiment flags.
// @match        https://www.youtube.com/*
// @match        https://www.youtube-nocookie.com/embed/*
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(() => {
  'use strict';
  const STYLE_ID = 'oldyt-dom-style';
  if (document.getElementById(STYLE_ID)) return;

  const ICONS = {
  "play": "<svg class=\"oldyt-classic-svg\" focusable=\"false\" viewBox=\"0 0 36 36\"><path d=\"M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z\"></path></svg>",
  "prev": "<svg class=\"oldyt-classic-svg\" focusable=\"false\" viewBox=\"0 0 36 36\"><path d=\"m 12,12 h 2 v 12 h -2 z m 3.5,6 8.5,6 V 12 z\"></path></svg>",
  "next": "<svg class=\"oldyt-classic-svg\" focusable=\"false\" viewBox=\"0 0 36 36\"><path d=\"M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z\"></path></svg>",
  "subtitles": "<svg class=\"oldyt-classic-svg\" focusable=\"false\" viewBox=\"0 0 36 36\"><path d=\"M11,11 C9.89,11 9,11.9 9,13 L9,23 C9,24.1 9.89,25 11,25 L25,25 C26.1,25 27,24.1 27,23 L27,13 C27,11.9 26.1,11 25,11 L11,11 Z M17,17 L15.5,17 L15.5,16.5 L13.5,16.5 L13.5,19.5 L15.5,19.5 L15.5,19 L17,19 L17,20 C17,20.55 16.55,21 16,21 L13,21 C12.45,21 12,20.55 12,20 L12,16 C12,15.45 12.45,15 13,15 L16,15 C16.55,15 17,15.45 17,16 L17,17 L17,17 Z M24,17 L22.5,17 L22.5,16.5 L20.5,16.5 L20.5,19.5 L22.5,19.5 L22.5,19 L24,19 L24,20 C24,20.55 23.55,21 23,21 L20,21 C19.45,21 19,20.55 19,20 L19,16 C19,15.45 19.45,15 20,15 L23,15 C23.55,15 24,15.45 24,16 L24,17 L24,17 Z\" fill=\"#fff\"></path></svg>",
  "settings": "<svg class=\"oldyt-classic-svg\" focusable=\"false\" viewBox=\"0 0 36 36\"><path d=\"m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z\" fill=\"#fff\"></path></svg>",
  "size": "<svg class=\"oldyt-classic-svg\" focusable=\"false\" viewBox=\"0 0 36 36\"><path d=\"m 26,13 0,10 -16,0 0,-10 z m -14,2 12,0 0,6 -12,0 0,-6 z\" fill=\"#fff\" fill-rule=\"evenodd\"></path></svg>",
  "pip": "<svg class=\"oldyt-classic-svg\" focusable=\"false\" viewBox=\"0 0 36 36\"><path d=\"M25,17 L17,17 L17,23 L25,23 L25,17 L25,17 Z M29,25 L29,10.98 C29,9.88 28.1,9 27,9 L9,9 C7.9,9 7,9.88 7,10.98 L7,25 C7,26.1 7.9,27 9,27 L27,27 C28.1,27 29,26.1 29,25 L29,25 Z M27,25.02 L9,25.02 L9,10.97 L27,10.97 L27,25.02 L27,25.02 Z\" fill=\"#fff\"></path></svg>",
  "remote": "<svg class=\"oldyt-classic-svg\" focusable=\"false\" viewBox=\"0 0 36 36\"><path d=\"M27,9 L9,9 C7.9,9 7,9.9 7,11 L7,14 L9,14 L9,11 L27,11 L27,25 L20,25 L20,27 L27,27 C28.1,27 29,26.1 29,25 L29,11 C29,9.9 28.1,9 27,9 L27,9 Z M7,24 L7,27 L10,27 C10,25.34 8.66,24 7,24 L7,24 Z M7,20 L7,22 C9.76,22 12,24.24 12,27 L14,27 C14,23.13 10.87,20 7,20 L7,20 Z M7,16 L7,18 C11.97,18 16,22.03 16,27 L18,27 C18,20.92 13.07,16 7,16 L7,16 Z\" fill=\"#fff\"></path></svg>",
  "fullscreen": "<svg class=\"oldyt-classic-svg\" focusable=\"false\" viewBox=\"0 0 36 36\"><g><path d=\"m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z\"></path></g><g><path d=\"m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z\"></path></g><g><path d=\"m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z\"></path></g><g><path d=\"M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z\"></path></g></svg>",
  "pause": "<svg class=\"oldyt-classic-svg\" viewBox=\"0 0 36 36\" focusable=\"false\"><path fill=\"#fff\" d=\"M12 10h4v16h-4z M20 10h4v16h-4z\"/></svg>",
  "volume": "<svg class=\"oldyt-classic-svg\" viewBox=\"0 0 36 36\" focusable=\"false\"><path fill=\"#fff\" d=\"M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z\"/></svg>",
  "muted": "<svg class=\"oldyt-classic-svg\" viewBox=\"0 0 36 36\" focusable=\"false\"><path fill=\"#fff\" d=\"M8 15h4l5-5v16l-5-5H8z M21 13l3 3 3-3 2 2-3 3 3 3-2 2-3-3-3 3-2-2 3-3-3-3z\"/></svg>",
  "replay": "<svg class=\"oldyt-classic-svg\" viewBox=\"0 0 36 36\" focusable=\"false\"><path fill=\"#fff\" d=\"M18 9V5l-6 6 6 6v-4a7 7 0 1 1-7 7H7a11 11 0 1 0 11-11z\"/></svg>",
  "exitFullscreen": "<svg class=\"oldyt-classic-svg\" viewBox=\"0 0 36 36\" focusable=\"false\"><path fill=\"#fff\" d=\"M14 8v6H8v3h9V8z M22 8v9h9v-3h-6V8z M8 22v3h6v6h3v-9z M22 22v9h3v-6h6v-3z\"/></svg>"
};
  const css = `
    .html5-video-player[data-oldyt-dom] { --oldyt-height:48px; --oldyt-button:48px; --oldyt-icon:44px; --oldyt-play:46px; --oldyt-mute-icon:36px; }
    .html5-video-player[data-oldyt-dom].ytp-big-mode { --oldyt-height:54px; --oldyt-button:54px; --oldyt-icon:50px; --oldyt-play:69px; --oldyt-mute-icon:42px; }
    .html5-video-player[data-oldyt-dom].ytp-small-mode,
    .html5-video-player[data-oldyt-dom].ytp-xsmall-width-mode { --oldyt-height:36px; --oldyt-button:36px; --oldyt-icon:32px; --oldyt-play:46px; --oldyt-mute-icon:24px; }
    .html5-video-player[data-oldyt-dom].ytp-embed { --oldyt-height:40px; --oldyt-button:40px; --oldyt-icon:40px; --oldyt-mute-icon:40px; }
    .html5-video-player[data-oldyt-dom] .ytp-chrome-bottom {
      height:var(--oldyt-height)!important; padding-top:3px!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-chrome-controls {
      height:var(--oldyt-height)!important; line-height:var(--oldyt-height)!important;
      display:flex; align-items:center;
    }
    .html5-video-player[data-oldyt-dom] .ytp-left-controls {
      display:flex!important; flex:1 1 auto!important; min-width:0!important;
      height:100%!important; align-items:center!important; overflow:hidden!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-right-controls {
      display:flex!important; flex:0 0 auto!important; align-items:center!important;
      height:100%!important; padding:0!important; margin:0!important;
    }
    /* Keep these native groups in place: delegated handlers may live on them. */
    .html5-video-player[data-oldyt-dom] .ytp-right-controls-left,
    .html5-video-player[data-oldyt-dom] .ytp-right-controls-right {
      display:flex!important; align-items:center!important; height:100%!important;
      width:auto!important; max-width:none!important; overflow:visible!important;
      opacity:1!important; visibility:visible!important; transform:none!important;
      padding:0!important; margin:0!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-expand-right-bottom-section-button { display:none!important; }
    .html5-video-player[data-oldyt-dom] .ytp-right-controls-left:after { display:none!important; }
    .html5-video-player[data-oldyt-dom] .ytp-chrome-controls .ytp-button,
    .html5-video-player[data-oldyt-dom] .ytp-volume-area,
    .html5-video-player[data-oldyt-dom] .ytp-mute-button,
    .html5-video-player[data-oldyt-dom] .ytp-time-wrapper,
    .html5-video-player[data-oldyt-dom] .ytp-right-controls {
      background:transparent!important; border-radius:0!important;
      backdrop-filter:none!important; -webkit-backdrop-filter:none!important;
      box-shadow:none!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-chrome-controls .ytp-button {
      position:relative!important; flex-shrink:0!important;
      width:var(--oldyt-button)!important; height:100%!important;
      min-width:0!important; margin:0!important; padding:0!important;
      opacity:.9!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-chrome-controls .ytp-button:not([disabled]):not([aria-disabled=true]):hover,
    .html5-video-player[data-oldyt-dom] .ytp-chrome-controls .ytp-button[aria-expanded=true],
    .html5-video-player[data-oldyt-dom] .ytp-chrome-controls .ytp-button[aria-pressed=true] {
      opacity:1!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-chrome-controls .ytp-play-button {
      width:var(--oldyt-play)!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-chrome-controls .ytp-button:before,
    .html5-video-player[data-oldyt-dom] .ytp-volume-area:after,
    .html5-video-player[data-oldyt-dom] .ytp-time-wrapper:after,
    .html5-video-player[data-oldyt-dom] .ytp-chapter-title:after,
    .html5-video-player[data-oldyt-dom] .ytp-play-button:after,
    .html5-video-player[data-oldyt-dom] .ytp-next-button:after,
    .html5-video-player[data-oldyt-dom] .ytp-prev-button:after { display:none!important; }
    .html5-video-player[data-oldyt-dom] .ytp-chrome-controls .ytp-button svg {
      padding:0!important; filter:none!important;
    }
    .html5-video-player[data-oldyt-dom] [data-oldyt-icon] svg:not(.oldyt-classic-svg) { opacity:0!important; }
    .html5-video-player[data-oldyt-dom] .oldyt-classic-icon {
      position:absolute!important; inset:0!important; display:flex!important;
      align-items:center!important; justify-content:center!important; pointer-events:none!important;
    }
    .html5-video-player[data-oldyt-dom] .oldyt-classic-icon .oldyt-classic-svg {
      width:var(--oldyt-icon)!important; height:var(--oldyt-height)!important; max-width:none!important;
      fill:#fff!important; opacity:1!important; padding:0!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-play-button .oldyt-classic-svg {
      width:calc(var(--oldyt-play) - 4px)!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-mute-button .oldyt-classic-svg {
      width:var(--oldyt-mute-icon)!important; height:var(--oldyt-mute-icon)!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-volume-area {
      display:flex!important; flex:0 0 auto!important; align-items:center!important;
      height:100%!important; margin:0!important; padding:0!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-mute-button { height:100%!important; padding:0!important; }
    .html5-video-player[data-oldyt-dom] .ytp-volume-area .ytp-volume-icon.ytp-button { width:var(--oldyt-button)!important; }
    .html5-video-player[data-oldyt-dom] .ytp-volume-panel {
      height:100%!important; width:0!important; margin:0!important;
      overflow:hidden!important; transition:width .2s!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-volume-area:hover .ytp-volume-panel,
    .html5-video-player[data-oldyt-dom] .ytp-volume-area:focus-within .ytp-volume-panel,
    .html5-video-player[data-oldyt-dom] .ytp-volume-slider-active .ytp-volume-panel {
      width:52px!important; margin-right:3px!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-time-display {
      position:relative!important; inset:auto!important; transform:none!important;
      display:flex!important; align-items:center!important; align-self:center!important;
      height:var(--oldyt-height)!important; box-sizing:border-box!important;
      padding:0 5px!important; margin:0!important; line-height:normal!important;
      font-size:13px!important; font-weight:400!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-time-wrapper {
      position:relative!important; inset:auto!important; transform:none!important;
      display:flex!important; align-items:center!important;
      height:var(--oldyt-height)!important; padding:0!important; margin:0!important;
      line-height:normal!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-time-contents {
      position:relative!important; inset:auto!important; transform:none!important;
      height:auto!important; padding:0!important; margin:0!important;
      line-height:normal!important; font-size:inherit!important; font-weight:inherit!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-time-contents > span {
      vertical-align:baseline!important; line-height:normal!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-chrome-controls .ytp-chapter-title {
      display:flex!important; align-items:center!important;
      width:fit-content!important; max-width:100%!important; padding:0 2px!important;
      line-height:normal!important; font-size:13px!important; font-weight:400!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-chapter-container {
      position:relative!important; inset:auto!important; transform:none!important;
      height:var(--oldyt-height)!important; box-sizing:border-box!important;
      min-width:0!important; padding:0!important; margin:0 5px 0 0!important;
      flex:0 1 100%!important; align-self:center!important;
      line-height:normal!important; font-size:13px!important; font-weight:400!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-chapter-title-content {
      position:relative!important; inset:auto!important; transform:none!important;
      padding:0!important; margin:0!important; line-height:normal!important;
      font-size:inherit!important; font-weight:400!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-chapter-title-prefix {
      display:inline!important; padding-right:5px!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-chapter-title-chevron {
      flex:0 0 20px!important; width:20px!important; height:20px!important;
      position:relative!important; bottom:1px!important; line-height:20px!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-chapter-title-chevron svg {
      width:100%!important; height:100%!important; vertical-align:middle!important;
    }
    .html5-video-player[data-oldyt-dom].ytp-xsmall-width-mode .ytp-chapter-container {
      display:none!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-progress-bar-container {
      bottom:calc(var(--oldyt-height) - 1px)!important; height:5px!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-play-progress,
    .html5-video-player[data-oldyt-dom] .ytp-scrubber-button {
      background:#f00!important; background-image:none!important;
    }
    .html5-video-player[data-oldyt-dom] .ytp-gradient-bottom {
      display:block!important; height:61px!important; padding:37px 0 0!important;
      background-color:transparent!important; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==)!important;
      background-repeat:repeat-x!important; background-position:bottom!important; background-size:auto!important;
    }
    .html5-video-player[data-oldyt-dom].ytp-big-mode .ytp-gradient-bottom {
      background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAEmCAYAAACjy/qzAAAAhklEQVQ4y52RUQ6AMAxCKd7/JJ7R6aeJAdr507TjQZqOAE4CWARwx7JE944rch/k6qOWS7bq5bh72zGF8+LTa6goJeRPgXDYNxWFfkS0QXCInLIN1GxTXA0dtS0otWJnuXJR1Y9WYP9GF1UCYRQYHRSlXMARbVO4th3sd7Y3OP5dY3Bn+SkPsGJ1+HGGVtcAAAAASUVORK5CYII=)!important;
    }
    .html5-video-player[data-oldyt-dom].ytp-autohide .ytp-gradient-bottom { opacity:0!important; }
    .html5-video-player[data-oldyt-dom].ytp-hide-controls .ytp-gradient-bottom { display:none!important; }
    .html5-video-player[data-oldyt-dom].ytp-fine-scrubbing-enable .ytp-chrome-controls { display:none!important; }
    .html5-video-player[data-oldyt-dom] .ytp-subtitles-button[aria-pressed=true]:after {
      display:block!important; background:#f00!important; width:50%!important; left:25%!important;
    }

.html5-video-player[data-oldyt-dom] .ytp-autonav-toggle-button-container{width:100%!important;height:100%!important;display:inline-block!important}
.html5-video-player[data-oldyt-dom] .ytp-autonav-toggle-button,.html5-video-player[data-oldyt-dom].ytp-small-mode .ytp-autonav-toggle-button{height:14.4px!important;width:36px!important;border-radius:14.4px!important;top:50%!important;position:relative!important;cursor:pointer!important;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIxMiIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjIuNyAxMWMyLjk1IDAgNS4zLTIuMjEgNS4zLTVzLTIuMzUtNS01LjMtNUg3LjNDNC4zNSAxIDIgMy4yMSAyIDZzMi4zNSA1IDUuMyA1eiIgY2xpcC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIuNSIvPjxwYXRoIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTcuMyAxQzQuMzUgMSAyIDMuMjEgMiA2czIuMzUgNSA1LjMgNWgxNS40QTUuMTYgNS4xNiAwIDAgMCAyOCA2bC0uMDMtLjU0QTUuMTYgNS4xNiAwIDAgMCAyMi43IDF6bTE1LjQgMTFjMy40NSAwIDYuMy0yLjYgNi4zLTZzLTIuODUtNi02LjMtNkg3LjNDMy44NSAwIDEgMi42IDEgNnMyLjg1IDYgNi4zIDZ6IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii41Ii8+PC9zdmc+)!important;-webkit-background-size:cover!important;background-size:cover!important;-webkit-transform:translateY(-50%)!important;-ms-transform:translateY(-50%)!important;transform:translateY(-50%)!important;-webkit-transition:all .08s cubic-bezier(.4,0,1,1)!important;transition:all .08s cubic-bezier(.4,0,1,1)!important}
.html5-video-player[data-oldyt-dom].ytp-small-mode .ytp-autonav-toggle-button,.html5-video-player[data-oldyt-dom].ytp-xsmall-width-mode .ytp-autonav-toggle-button{height:10.8px!important;width:27px!important;border-radius:10.8px!important}
.html5-video-player[data-oldyt-dom].ytp-big-mode .ytp-autonav-toggle-button{height:18px!important;width:45px!important;border-radius:18px!important}
.html5-video-player[data-oldyt-dom].ytp-embed .ytp-autonav-toggle-button{height:12px!important;width:30px!important;border-radius:12px!important}
.html5-video-player[data-oldyt-dom] .ytp-autonav-toggle-button[aria-checked=true]{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIxMiIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjIuNyAxMWMyLjk1IDAgNS4zLTIuMjEgNS4zLTVzLTIuMzUtNS01LjMtNUg3LjNDNC4zNSAxIDIgMy4yMSAyIDZzMi4zNSA1IDUuMyA1em0tMi43LS43NXYtOC41bDYuNyA0LjI2eiIgY2xpcC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIuNSIvPjxwYXRoIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTcuMyAxQzQuMzUgMSAyIDMuMjEgMiA2czIuMzUgNSA1LjMgNWgxNS40QTUuMTYgNS4xNiAwIDAgMCAyOCA2bC0uMDMtLjU0QTUuMTYgNS4xNiAwIDAgMCAyMi43IDF6bTE1LjQgMTFjMy40NSAwIDYuMy0yLjYgNi4zLTZzLTIuODUtNi02LjMtNkg3LjNDMy44NSAwIDEgMi42IDEgNnMyLjg1IDYgNi4zIDZ6IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii41Ii8+PC9zdmc+)!important;-webkit-background-size:cover!important;background-size:cover!important;background-color:transparent!important;-webkit-transition:all .08s cubic-bezier(.4,0,1,1)!important;transition:all .08s cubic-bezier(.4,0,1,1)!important}
.html5-video-player[data-oldyt-dom] .ytp-autonav-toggle-button:after{content:""!important;position:absolute!important;top:0!important;left:0!important;height:20.4px!important;width:20.4px!important;border-radius:20.4px!important;margin-top:-3px!important;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxNyAxNyI+PHBhdGggZmlsbD0iIzcxNzE3MSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNOC41IDE2YTcuNSA3LjUgMCAxIDAgMC0xNSA3LjUgNy41IDAgMCAwIDAgMTUiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjE1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNyA4LjVhOC41IDguNSAwIDEgMS0xNyAwIDguNSA4LjUgMCAwIDEgMTcgMG0tMSAwYTcuNSA3LjUgMCAxIDEtMTUgMCA3LjUgNy41IDAgMCAxIDE1IDAiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik01LjUgMTJoMlY1aC0yem00LTd2N2gyVjV6Ii8+PC9zdmc+)!important;-webkit-background-size:cover!important;background-size:cover!important;-webkit-transition:all .08s cubic-bezier(.4,0,1,1)!important;transition:all .08s cubic-bezier(.4,0,1,1)!important}
.html5-video-player[data-oldyt-dom].ytp-small-mode .ytp-autonav-toggle-button:after{left:-2px!important;height:15.3px!important;width:15.3px!important;border-radius:15.3px!important;margin-top:-2.25px!important}
.html5-video-player[data-oldyt-dom].ytp-big-mode .ytp-autonav-toggle-button:after{left:0!important;height:25.5px!important;width:25.5px!important;border-radius:25.5px!important;margin-top:-3.75px!important}
.html5-video-player[data-oldyt-dom].ytp-embed .ytp-autonav-toggle-button:after{left:0!important;height:17px!important;width:17px!important;border-radius:17px!important;margin-top:-2.5px!important}
.html5-video-player[data-oldyt-dom] .ytp-autonav-toggle-button[aria-checked=true]:after{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxNyAxNyI+PHBhdGggZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMTUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE3IDguNWE4LjUgOC41IDAgMSAxLTE3IDAgOC41IDguNSAwIDAgMSAxNyAwbS01IDBMNi41IDV2N3ptLTEuODYgMEw3LjUgNi44MnYzLjM2ek04LjUgMTZhNy41IDcuNSAwIDEgMCAwLTE1IDcuNSA3LjUgMCAwIDAgMCAxNSIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTYgOC41YTcuNSA3LjUgMCAxIDEtMTUgMCA3LjUgNy41IDAgMCAxIDE1IDBtLTQgMEw2LjUgMTJWNXoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==)!important;left:1px!important;-webkit-background-size:cover!important;background-size:cover!important;background-color:transparent!important;-webkit-transform:translateX(15.6px)!important;-ms-transform:translateX(15.6px)!important;transform:translateX(15.6px)!important}
.html5-video-player[data-oldyt-dom].ytp-small-mode .ytp-autonav-toggle-button[aria-checked=true]:after{-webkit-transform:translateX(11.7px)!important;-ms-transform:translateX(11.7px)!important;transform:translateX(11.7px)!important}
.html5-video-player[data-oldyt-dom].ytp-big-mode .ytp-autonav-toggle-button[aria-checked=true]:after{-webkit-transform:translateX(19.5px)!important;-ms-transform:translateX(19.5px)!important;transform:translateX(19.5px)!important}
.html5-video-player[data-oldyt-dom].ytp-embed .ytp-autonav-toggle-button[aria-checked=true]:after{-webkit-transform:translateX(13px)!important;-ms-transform:translateX(13px)!important;transform:translateX(13px)!important}

    /* Classic switch artwork and geometry, independent of modern icon classes. */
    .html5-video-player[data-oldyt-dom] .ytp-autonav-toggle-button-container {display:flex!important;align-items:center!important;justify-content:center!important;vertical-align:middle!important;line-height:normal!important;}
    .html5-video-player[data-oldyt-dom] .ytp-autonav-toggle-button {top:auto!important;margin:0!important;transform:none!important;transition:none!important;}
    .html5-video-player[data-oldyt-dom] .ytp-autonav-toggle-button:after {margin-left:0!important;margin-right:0!important;background-color:transparent!important;background-position:0 0!important;background-repeat:no-repeat!important;}
  `;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = css;
  (document.head || document.documentElement).append(style);

  const players = new Map();
  function setIcon(button, key) {
    if (!button || !ICONS[key]) return;
    let icon = button.querySelector(':scope > .oldyt-classic-icon');
    if (!icon) {
      icon = document.createElement('span');
      icon.className = 'oldyt-classic-icon';
      icon.setAttribute('aria-hidden', 'true');
      button.append(icon);
    }
    if (icon.dataset.icon !== key) {
      icon.innerHTML = ICONS[key]; // Only bundled, local SVG strings.
      icon.dataset.icon = key;
    }
    if (button.dataset.oldytIcon !== key) button.dataset.oldytIcon = key;
  }

  function restore(player) {
    const bottom = player.querySelector('.ytp-chrome-bottom');
    if (!bottom) return;
    if (!player.hasAttribute('data-oldyt-dom')) player.setAttribute('data-oldyt-dom', '');
    const left = bottom.querySelector('.ytp-left-controls');
    const prev = left?.querySelector('.ytp-prev-button');
    const play = left?.querySelector('.ytp-play-button');
    if (prev && play && prev.nextElementSibling !== play) left.insertBefore(prev, play);

    const video = player.querySelector('video');
    const playing = video ? !video.paused && !video.ended : player.classList.contains('playing-mode');
    setIcon(play, player.classList.contains('ended-mode') ? 'replay' : playing ? 'pause' : 'play');
    const muted = video ? video.muted || video.volume === 0 :
      bottom.querySelector('.ytp-volume-panel')?.getAttribute('aria-valuenow') === '0';
    // New DOM: the clickable button is INSIDE .ytp-mute-button.
    setIcon(bottom.querySelector('button.ytp-mute-button, .ytp-mute-button button'), muted ? 'muted' : 'volume');
    for (const key of ['prev', 'next', 'subtitles', 'settings', 'size', 'pip', 'remote', 'miniplayer']) {
      setIcon(bottom.querySelector(`.ytp-${key}-button`), key);
    }
    setIcon(bottom.querySelector('.ytp-fullscreen-button'),
      player.classList.contains('ytp-fullscreen') || document.fullscreenElement === player ? 'exitFullscreen' : 'fullscreen');
  }

  function attach(player) {
    if (players.has(player)) return;
    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        if (player.isConnected) restore(player);
      });
    };
    const observer = new MutationObserver(records => {
      // Ignore progress/time updates; react to controls being rebuilt or state changing.
      if (records.some(r => r.type === 'attributes' ||
        [...r.addedNodes, ...r.removedNodes].some(n => n.nodeType === 1))) schedule();
    });
    observer.observe(player, { childList:true, subtree:true, attributes:true,
      attributeFilter:['class', 'aria-valuenow', 'aria-pressed'] });
    const events = ['play', 'pause', 'ended', 'volumechange', 'loadedmetadata', 'emptied'];
    events.forEach(name => player.addEventListener(name, schedule, true));
    players.set(player, { observer, schedule, events });
    restore(player);
  }
  function scan() {
    document.querySelectorAll('.html5-video-player').forEach(attach);
    for (const [player, state] of players) {
      if (player.isConnected) continue;
      state.observer.disconnect();
      state.events.forEach(name => player.removeEventListener(name, state.schedule, true));
      players.delete(player);
    }
  }
  let scanQueued = false;
  new MutationObserver(records => {
    if (scanQueued || !records.some(r => [...r.addedNodes, ...r.removedNodes].some(n =>
      n.nodeType === 1 && (n.matches?.('.html5-video-player') || n.querySelector?.('.html5-video-player'))))) return;
    scanQueued = true;
    requestAnimationFrame(() => { scanQueued = false; scan(); });
  }).observe(document.documentElement, { childList:true, subtree:true });
  document.addEventListener('yt-navigate-finish', scan);
  document.addEventListener('fullscreenchange', () => players.forEach(state => state.schedule()));
  scan();
})();
