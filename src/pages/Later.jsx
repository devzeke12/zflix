import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

const CURSOR_SIZE = 80;
const START_INDEX = 1;
const DRAG_THRESHOLD = 150;
const FALLBACK_WIDTH = 509;

const articles = [
  {
    title: "Building a fully customisable Popular slider with swipe gestures and navigation using Framer Motion",
    url: "https://medium.com/@jeyprox/building-a-fully-customisable-input-component-with-nextjs-reacthookfrom-tailwindcss-and-ts-58874a2e3450",
  },
  {
    title: "Building a fully customisable Popular slider with swipe gestures and navigation using Framer Motion",
    url: "https://medium.com/@jeyprox/building-a-fully-customisable-input-component-with-nextjs-reacthookfrom-tailwindcss-and-ts-58874a2e3450",
  },
  {
    title: "Building a fully customisable Popular slider with swipe gestures and navigation using Framer Motion",
    url: "https://medium.com/@jeyprox/building-a-fully-customisable-input-component-with-nextjs-reacthookfrom-tailwindcss-and-ts-58874a2e3450",
  },
  {
    title: "Building a fully customisable Popular slider with swipe gestures and navigation using Framer Motion",
    url: "https://medium.com/@jeyprox/building-a-fully-customisable-input-component-with-nextjs-reacthookfrom-tailwindcss-and-ts-58874a2e3450",
  },
  {
    title: "Building a fully customisable Popular slider with swipe gestures and navigation using Framer Motion",
    url: "https://medium.com/@jeyprox/building-a-fully-customisable-input-component-with-nextjs-reacthookfrom-tailwindcss-and-ts-58874a2e3450",
  },
  {
    title: "Building a fully customisable Popular slider with swipe gestures and navigation using Framer Motion",
    url: "https://medium.com/@jeyprox/building-a-fully-customisable-input-component-with-nextjs-reacthookfrom-tailwindcss-and-ts-58874a2e3450",
  },
  {
    title: "Building a fully customisable Popular slider with swipe gestures and navigation using Framer Motion",
    url: "https://medium.com/@jeyprox/building-a-fully-customisable-input-component-with-nextjs-reacthookfrom-tailwindcss-and-ts-58874a2e3450",
  },
  {
    title: "Building a fully customisable Popular slider with swipe gestures and navigation using Framer Motion",
    url: "https://medium.com/@jeyprox/building-a-fully-customisable-input-component-with-nextjs-reacthookfrom-tailwindcss-and-ts-58874a2e3450",
  },
  {
    title: "Building a fully customisable Popular slider with swipe gestures and navigation using Framer Motion",
    url: "https://medium.com/@jeyprox/building-a-fully-customisable-input-component-with-nextjs-reacthookfrom-tailwindcss-and-ts-58874a2e3450",
  },
  // Add other articles as needed
];

const Popular = () => {
  const [activeSlide, setActiveSlide] = useState(START_INDEX);
  const canScrollPrev = activeSlide > 0;
  const canScrollNext = activeSlide < articles.length - 1;
  const offsetX = useMotionValue(0);
  const animatedX = useSpring(offsetX, {
    damping: 20,
    stiffness: 150,
  });

  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragSnap = (_, { offset: { x: dragOffset } }) => {
    setIsDragging(false);
    containerRef.current?.removeAttribute("data-dragging");
    animatedX.stop();

    const currentOffset = offsetX.get();

    if (
      Math.abs(dragOffset) < DRAG_THRESHOLD ||
      (!canScrollPrev && dragOffset > 0) ||
      (!canScrollNext && dragOffset < 0)
    ) {
      animatedX.set(currentOffset);
      return;
    }

    let offsetWidth = 0;

    for (
      let i = activeSlide;
      dragOffset > 0 ? i >= 0 : i < itemsRef.current.length;
      dragOffset > 0 ? i-- : i++
    ) {
      const item = itemsRef.current[i];

      if (item === null) continue;

      const itemOffset = item.offsetWidth;
      const prevItemWidth = itemsRef.current[i - 1]?.offsetWidth ?? FALLBACK_WIDTH;
      const nextItemWidth = itemsRef.current[i + 1]?.offsetWidth ?? FALLBACK_WIDTH;

      if (
        (dragOffset > 0 &&
          dragOffset > offsetWidth + itemOffset &&
          i > 1) ||
        (dragOffset < 0 &&
          dragOffset < offsetWidth - itemOffset &&
          i < itemsRef.current.length - 2)
      ) {
        dragOffset > 0
          ? (offsetWidth += prevItemWidth)
          : (offsetWidth -= nextItemWidth);
        continue;
      }

      if (dragOffset > 0) {
        offsetX.set(currentOffset + offsetWidth + prevItemWidth);
        setActiveSlide(i - 1);
      } else {
        offsetX.set(currentOffset + offsetWidth - nextItemWidth);
        setActiveSlide(i + 1);
      }
      break;
    }
  };

  const scrollPrev = () => {
    if (!canScrollPrev) return;

    const nextWidth = itemsRef.current[activeSlide - 1]?.getBoundingClientRect().width;

    if (nextWidth === undefined) return;

    offsetX.set(offsetX.get() + nextWidth);
    setActiveSlide((prev) => prev - 1);
  };

  const scrollNext = () => {
    if (!canScrollNext) return;

    const nextWidth = itemsRef.current[activeSlide + 1]?.getBoundingClientRect().width;

    if (nextWidth === undefined) return;

    offsetX.set(offsetX.get() - nextWidth);
    setActiveSlide((prev) => prev + 1);
  };

  return (
    <div className="relative overflow-hidden">
      <motion.ul
        ref={containerRef}
        className="flex cursor-none items-start"
        style={{ x: animatedX }}
        drag="x"
        dragConstraints={{
          left: -(FALLBACK_WIDTH * (articles.length - 1)),
          right: FALLBACK_WIDTH,
        }}
        onDragStart={() => {
          containerRef.current?.setAttribute("data-dragging", "true");
          setIsDragging(true);
        }}
        onDragEnd={handleDragSnap}
      >
        {articles.map((article, index) => {
          const active = index === activeSlide;
          return (
            <motion.li
              layout
              key={article.title}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`group relative shrink-0 select-none px-3 transition-opacity duration-300 ${!active && "opacity-30"}`}
              transition={{
                ease: "easeInOut",
                duration: 0.4,
              }}
              style={{
                flexBasis: active ? "40%" : "30%",
              }}
            >
              <Link
                href={article.url}
                className="block"
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                <div
                  className={`grid place-content-center overflow-hidden rounded-lg bg-gray-900 ${active ? "aspect-[5/3]" : "aspect-[4/3]"}`}
                >
                  <span className={`text-xl font-bold ${active && "text-lime-300"}`}>{index}</span>
                </div>
              </Link>
              <div className={`mt-4 flex justify-center ${!active && "hidden"}`}>
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-none text-xl font-bold leading-tight transition-colors group-hover:text-lime-300"
                  draggable={false}
                  onClick={(e) => {
                    if (isDragging) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                >
                  {article.title}
                </Link>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
      <button
        type="button"
        className="group absolute left-[24%] top-1/3 z-20 grid aspect-square place-content-center rounded-full transition-colors"
        style={{ width: CURSOR_SIZE, height: CURSOR_SIZE }}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      >
        <span className="sr-only">Previous Guide</span>
        {/* Add your MoveLeft component here */}
      </button>
      <button
        type="button"
        className="group absolute right-[24%] top-1/3 z-20 grid aspect-square place-content-center rounded-full transition-colors"
        style={{ width: CURSOR_SIZE, height: CURSOR_SIZE }}
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        <span className="sr-only">Next Guide</span>
        {/* Add your MoveRight component here */}
      </button>
    </div>
  );
};

export default Popular;
