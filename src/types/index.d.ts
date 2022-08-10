export {}

declare global {
  interface Window {
    requestAnimFrame
    webkitRequestAnimationFrame
    mozRequestAnimationFrame
  }
}