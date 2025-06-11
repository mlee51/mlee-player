import { useEffect, useState } from "react";

/**
 * AnimatedText rotates characters from left to right in a loop.
 * 
 * @param {string} content - The string to animate
 * @param {number} speed - Speed in milliseconds between frames
 * @param {string} className - Tailwind/utility class overrides
 */
export default function AnimatedText({
  content = "radio.mlee.live.x.x.x.",
  speed = 150,
  className = "self-end font-mono tracking-wide",
}) {
  const [text, setText] = useState(content);

  useEffect(() => {
    setText(content); // reset when content changes
    const interval = setInterval(() => {
      setText((prev) => prev.slice(1) + prev[0]);
    }, speed);

    return () => clearInterval(interval);
  }, [content, speed]);

  return <div className={className}>{text}</div>;
}
