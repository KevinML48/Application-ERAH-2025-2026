import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";

const Hero = () => {
  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero">
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3">
              Votre Plateforme
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              ERAH Esport
            </h1>
            <p className="max-w-440 mb-14 body-1 max-md:mb-10">
              Découvrez la plateforme afin de tenter votre chance pour intégrer notre club
            </p>
            <LinkScroll to="features" offset={-100} spy smooth>
              <Button icon="/build/assets/images-welcome/zap.svg">Je me lance !</Button>
            </LinkScroll>
          </div>

          <div className="absolute -top-1 left-[calc(50%-240px)] w-[800px] pointer-events-none hero-img_res">
  <img
    src="/build/assets/images-welcome/hero.png"
    className="w-full h-auto"
    alt="hero"
  />
</div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
