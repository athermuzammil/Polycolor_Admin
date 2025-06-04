"use client";
import { useRef, useState, useEffect } from "react";
const useDraggableScroll = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);
  const scrollContainerRef = useRef(null);
  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setDragged(false);
  };
  const onMouseUp = () => {
    setIsDragging(false);
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 5) setDragged(true); // 5 is the threshold for dragging
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
  return {
    scrollContainerRef,
    onMouseDown,
    onMouseMove,
    dragged, // Indicates if it's a drag event
  };
};
export default useDraggableScroll;
