import gsap from "gsap"

export default {
  data: function () {
    return {
      timeline: null
    }
  },
  mounted: function () {
    this.timeline = gsap.timeline()
    this.player1 = {
      x: 400, y: 200
    }
  }
}