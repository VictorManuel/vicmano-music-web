import { useCallback, useEffect, useState, FC } from "react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"

const ParticleBackground: FC = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  // const particlesLoaded = useCallback(async (container: Container) => {
  //   // console.log(container)
  // }, [])

  if (!mounted) return null

  return (
    <Particles
      className="absolute inset-0 z-[-5]"
      id="tsparticles"
      init={particlesInit}
      // loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: ["#9c27b0", "#e91e63", "#7928ca", "#00bcd4"],
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 100,
          },
          opacity: {
            value: {
              min: 0.3,
              max: 0.8,
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
            },
          },
          shape: {
            type: ["circle", "triangle", "star"],
          },
          size: {
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
            },
          },
        },
        detectRetina: true,
      }}
    />
  )
}

export default ParticleBackground 