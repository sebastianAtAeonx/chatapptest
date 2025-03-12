import React, { useState, useCallback, useContext, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { UserPreferencesContext } from "../context/userPreferencesContext";
import { Outlet } from "react-router-dom";

function FormTemplate() {
  const { preferences } = useContext(UserPreferencesContext);
  const [uiElements, setUiElements] = useState({
    bgColor: "",
    particlesColor: "",
  });

  useEffect(() => {
    if (preferences.theme === "dark") {
      setUiElements({
        bgColor: "bg-base-100",
        particlesColor: "#FFFFFF",
      });
    } else if (preferences.theme === "light") {
      setUiElements({
        bgColor: "bg-base-100",
        particlesColor: "#1B1B1B",
      });
    }
  }, [preferences.theme]);

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  // const navigate = useNavigate();
  const isMobileScreen = useMediaQuery("(max-width: 600px)");

  return (
    <div className="w-screen h-screen">
      {/* <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          autoPlay: true,
          background: {
            color: {
              value: uiElements.bgColor,
            },
            image: '',
            position: '',
            repeat: '',
            size: '',
            opacity: 1,
          },
          backgroundMask: {
            composite: 'destination-out',
            cover: {
              color: {
                value: '#fff',
              },
              opacity: 1,
            },
            enable: false,
          },
          clear: true,
          defaultThemes: {},
          delay: 0,
          fullScreen: {
            enable: true,
            zIndex: 0,
          },
          detectRetina: true,
          duration: 0,
          fpsLimit: 120,
          interactivity: {
            detectsOn: 'window',
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onDiv: {
                selectors: [],
                enable: false,
                mode: [],
                type: 'circle',
              },
              onHover: {
                enable: true,
                mode: 'slow',
                parallax: {
                  enable: false,
                  force: 60,
                  smooth: 10,
                },
              },
              resize: {
                delay: 0.5,
                enable: true,
              },
            },
            modes: {
              trail: {
                delay: 1,
                pauseOnStop: false,
                quantity: 1,
              },
              attract: {
                distance: 200,
                duration: 0.4,
                easing: 'ease-out-quad',
                factor: 1,
                maxSpeed: 50,
                speed: 1,
              },
              bounce: {
                distance: 200,
              },
              bubble: {
                distance: 400,
                duration: 2,
                mix: false,
                opacity: 0.8,
                size: 40,
                divs: {
                  distance: 200,
                  duration: 0.4,
                  mix: false,
                  selectors: [],
                },
              },
              connect: {
                distance: 80,
                links: {
                  opacity: 0.5,
                },
                radius: 60,
              },
              grab: {
                distance: 400,
                links: {
                  blink: false,
                  consent: false,
                  opacity: 1,
                },
              },
              push: {
                default: true,
                groups: [],
                quantity: 4,
              },
              remove: {
                quantity: 2,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
                factor: 100,
                speed: 1,
                maxSpeed: 50,
                easing: 'ease-out-quad',
                divs: {
                  distance: 200,
                  duration: 0.4,
                  factor: 100,
                  speed: 1,
                  maxSpeed: 50,
                  easing: 'ease-out-quad',
                  selectors: [],
                },
              },
              slow: {
                factor: 3,
                radius: 100,
              },
              light: {
                area: {
                  gradient: {
                    start: {
                      value: '#000',
                    },
                    stop: {
                      value: '#000000',
                    },
                  },
                  radius: 1000,
                },
                shadow: {
                  color: {
                    value: '#000000',
                  },
                  length: 2000,
                },
              },
            },
          },
          manualParticles: [],
          particles: {
            bounce: {
              horizontal: {
                value: 1,
              },
              vertical: {
                value: 1,
              },
            },
            collisions: {
              absorb: {
                speed: 2,
              },
              bounce: {
                horizontal: {
                  value: 1,
                },
                vertical: {
                  value: 1,
                },
              },
              enable: false,
              maxSpeed: 50,
              mode: 'bounce',
              overlap: {
                enable: true,
                retries: 0,
              },
            },
            color: {
              value: uiElements.particlesColor,
              animation: {
                h: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  decay: 0,
                  delay: 0,
                  sync: true,
                  offset: 0,
                },
                s: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  decay: 0,
                  delay: 0,
                  sync: true,
                  offset: 0,
                },
                l: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  decay: 0,
                  delay: 0,
                  sync: true,
                  offset: 0,
                },
              },
            },
            effect: {
              close: true,
              fill: true,
              options: {},
              type: [],
            },
            groups: {},
            move: {
              angle: {
                offset: 0,
                value: 90,
              },
              attract: {
                distance: 200,
                enable: false,
                rotate: {
                  x: 3000,
                  y: 3000,
                },
              },
              center: {
                x: 50,
                y: 50,
                mode: 'percent',
                radius: 0,
              },
              decay: 0,
              distance: {},
              direction: 'none',
              drift: 0,
              enable: true,
              gravity: {
                acceleration: 9.81,
                enable: false,
                inverse: false,
                maxSpeed: 50,
              },
              path: {
                clamp: true,
                delay: {
                  value: 0,
                },
                enable: false,
                options: {},
              },
              outModes: {
                default: 'out',
                bottom: 'out',
                left: 'out',
                right: 'out',
                top: 'out',
              },
              random: false,
              size: false,
              speed: 4,
              spin: {
                acceleration: 0,
                enable: false,
              },
              straight: false,
              trail: {
                enable: false,
                length: 10,
                fill: {},
              },
              vibrate: false,
              warp: false,
            },
            number: {
              density: {
                enable: true,
                width: 1920,
                height: 1080,
              },
              limit: {
                mode: 'delete',
                value: 0,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
              animation: {
                count: 0,
                enable: false,
                speed: 2,
                decay: 0,
                delay: 0,
                sync: false,
                mode: 'auto',
                startValue: 'random',
                destroy: 'none',
              },
            },
            reduceDuplicates: false,
            shadow: {
              blur: 0,
              color: {
                value: uiElements.bgColor,
              },
              enable: false,
              offset: {
                x: 0,
                y: 0,
              },
            },
            shape: {
              close: true,
              fill: true,
              options: {},
              type: 'circle',
            },
            size: {
              value: {
                min: 1,
                max: 5,
              },
              animation: {
                count: 0,
                enable: false,
                speed: 5,
                decay: 0,
                delay: 0,
                sync: false,
                mode: 'auto',
                startValue: 'random',
                destroy: 'none',
              },
            },
            stroke: {
              width: 0,
            },
            zIndex: {
              value: 0,
              opacityRate: 1,
              sizeRate: 1,
              velocityRate: 1,
            },
            destroy: {
              bounds: {},
              mode: 'none',
              split: {
                count: 1,
                factor: {
                  value: 3,
                },
                rate: {
                  value: {
                    min: 4,
                    max: 9,
                  },
                },
                sizeOffset: true,
                particles: {},
              },
            },
            roll: {
              darken: {
                enable: false,
                value: 0,
              },
              enable: false,
              enlighten: {
                enable: false,
                value: 0,
              },
              mode: 'vertical',
              speed: 25,
            },
            tilt: {
              value: 0,
              animation: {
                enable: false,
                speed: 0,
                decay: 0,
                sync: false,
              },
              direction: 'clockwise',
              enable: false,
            },
            twinkle: {
              lines: {
                enable: false,
                frequency: 0.05,
                opacity: 1,
              },
              particles: {
                enable: false,
                frequency: 0.05,
                opacity: 1,
              },
            },
            wobble: {
              distance: 5,
              enable: false,
              speed: {
                angle: 50,
                move: 10,
              },
            },
            life: {
              count: 0,
              delay: {
                value: 0,
                sync: false,
              },
              duration: {
                value: 0,
                sync: false,
              },
            },
            rotate: {
              value: 0,
              animation: {
                enable: false,
                speed: 0,
                decay: 0,
                sync: false,
              },
              direction: 'clockwise',
              path: false,
            },
            orbit: {
              animation: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: false,
              },
              enable: false,
              opacity: 1,
              rotation: {
                value: 45,
              },
              width: 1,
            },
            links: {
              blink: false,
              color: {
                value: uiElements.particlesColor,
              },
              consent: false,
              distance: 150,
              enable: true,
              frequency: 1,
              opacity: 0.4,
              shadow: {
                blur: 5,
                color: {
                  value: '#000',
                },
                enable: false,
              },
              triangles: {
                enable: false,
                frequency: 1,
              },
              width: 1,
              warp: false,
            },
            repulse: {
              value: 0,
              enabled: false,
              distance: 1,
              duration: 1,
              factor: 1,
              speed: 1,
            },
          },
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
          responsive: [],
          smooth: false,
          style: {},
          themes: [],
          zLayers: 100,
          name: 'Slow',
          motion: {
            disable: false,
            reduce: {
              factor: 4,
              value: true,
            },
          },
        }}
      /> */}
      <div className="w-screen h-screen flex justify-center items-start">
        <div className="relative modal-box top-[50%] translate-y-[-50%] bg-primary/80 backdrop-blur-sm overflow-hidden">
          <h3 className="login-heading text-5xl text-center mt-2 font-bold">
            AeonXIQ
          </h3>
          <Outlet />
        </div>
      </div>
      {!isMobileScreen ? (
        <div className="text-sm absolute bottom-10 left-[50%] translate-x-[-50%]">
          <p className="mb-1 flex mt-1 chatui-fontColor">
            © {new Date().getFullYear()} Designed By &nbsp;
            <a
              href="https://www.aeonx.digital/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700"
            >
              https://www.aeonx.digital
            </a>
          </p>
        </div>
      ) : (
        <div className="text-sm absolute text-center bottom-10 left-[50%] translate-x-[-50%]">
          <p className="chatui-fontColor">
            © {new Date().getFullYear()} Designed By &nbsp;
            <a
              href="https://www.aeonx.digital/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700"
            >
              https://www.aeonx.digital
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default FormTemplate;
