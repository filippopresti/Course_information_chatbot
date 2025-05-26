import React from "react";
import "../styles/styles.css";

export interface HeroProps {
  title: string;
  subtitle: React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage: string;
}

export function Hero({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
}: HeroProps) {
  const style = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div className="landing__hero" style={style}>
      <section>
        <h1> {title}</h1>
        <p>{subtitle}</p>
        {buttonText && buttonLink && (
          <a href={buttonLink} className="hero__btn">
            {buttonText}
          </a>
        )}
      </section>
    </div>
  );
}

export default Hero;
