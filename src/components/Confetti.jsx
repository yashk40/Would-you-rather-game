"use client"

import { useEffect, useRef } from "react"

const Confetti = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"]

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height - canvas.height
        this.size = Math.random() * 8 + 2
        this.weight = Math.random() * 1 + 0.1
        this.directionX = Math.random() * 2 - 1
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.shape = Math.random() > 0.5 ? "circle" : "rect"
        this.opacity = 1
        this.fadeRate = 0.01
      }

      update() {
        this.y += this.weight
        this.x += this.directionX
        this.opacity -= this.fadeRate

        if (this.y > canvas.height) {
          this.y = 0 - this.size
          this.x = Math.random() * canvas.width
          this.weight = Math.random() * 1 + 0.1
        }
      }

      draw() {
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color

        if (this.shape === "circle") {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(this.x, this.y, this.size, this.size)
        }
        ctx.globalAlpha = 1
      }
    }

    function init() {
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        if (particles[i].opacity <= 0) {
          particles.splice(i, 1)
          i--
          if (Math.random() < 0.3 && particles.length < 100) {
            particles.push(new Particle())
          }
        }
      }

      requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="confetti-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  )
}

export default Confetti

