// react-slider-and-checkbox/src/SliderAndCheckbox.js

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './SliderAndCheckbox.css'; // Import a CSS file for styling

const SliderAndCheckbox = ({
  images,
  autoScroll = false,
  showControls = true,
  showOverlayText = true,
  overlayTextColor = '#ffffff',
  overlayTextSize = '16px',
  overlayTextWeight = 'normal',
  showThumbnails = true,
  imageBorderRadius = '0px',
  controlsSize = '30px',
  controlsPadding = '8px',
  controlsColor = '#ffffff',
  thumbnailSize = '60px',
  thumbnailBorderRadius = '0px',
  thumbnailPadding = '4px',
  animationDuration = 300,
  isOverlaySlider = false,
  subTitleAnimationType,
  titleAnimationType,
  imageAnimationType,
  thumbnailAnimationType,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [autoScrollTimer, setAutoScrollTimer] = useState(null);
  const [interactionTimer, setInteractionTimer] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    if (autoScroll) {
      startAutoScroll();
    }
    return () => {
      clearTimers();
    };
  }, [autoScroll]);

  const startAutoScroll = () => {
    const timer = setInterval(() => {
      if (isOverlaySlider) {
        setNextIndex((prevIndex) => (prevIndex + 1) % images.length);
        animateToPage(nextIndex);
      } else {
        nextPage();
      }
    }, 3000);
    setAutoScrollTimer(timer);
  };

  const resetAutoScroll = () => {
    clearTimers();
    const timer = setTimeout(() => {
      if (autoScroll) {
        startAutoScroll();
      }
    }, 6000);
    setInteractionTimer(timer);
  };

  const clearTimers = () => {
    if (autoScrollTimer) clearInterval(autoScrollTimer);
    if (interactionTimer) clearTimeout(interactionTimer);
  };

  const animateToPage = (index) => {
    setNextIndex(index);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
    }, animationDuration);
  };

  const nextPage = () => {
    resetAutoScroll();
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  const prevPage = () => {
    resetAutoScroll();
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const handleThumbnailClick = (index) => {
    resetAutoScroll();
    if (isOverlaySlider) {
      animateToPage(index);
    } else {
      setCurrentIndex(index);
      pageRef.current.scrollTo({
        left: pageRef.current.scrollWidth * (index / images.length),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="slider-and-checkbox">
      <div className="slider-container">
        <div className="slider">
          {isOverlaySlider ? (
            <OverlaySlider
              images={images}
              currentIndex={currentIndex}
              nextIndex={nextIndex}
              animateToPage={animateToPage}
            />
          ) : (
            <PageView
              images={images}
              currentIndex={currentIndex}
              pageRef={pageRef}
            />
          )}
        </div>
        {showControls && (
          <>
            <button
              className="control prev"
              style={{ fontSize: controlsSize, color: controlsColor, padding: controlsPadding }}
              onClick={prevPage}
            >
              &#9664;
            </button>
            <button
              className="control next"
              style={{ fontSize: controlsSize, color: controlsColor, padding: controlsPadding }}
              onClick={nextPage}
            >
              &#9654;
            </button>
          </>
        )}
      </div>
      {showThumbnails && (
        <div className="thumbnails">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.imageUrl}
              alt={image.title}
              style={{
                width: thumbnailSize,
                height: thumbnailSize,
                borderRadius: thumbnailBorderRadius,
                margin: thumbnailPadding,
              }}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

SliderAndCheckbox.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string,
      subtitle: PropTypes.string,
    })
  ).isRequired,
  autoScroll: PropTypes.bool,
  showControls: PropTypes.bool,
  showOverlayText: PropTypes.bool,
  overlayTextColor: PropTypes.string,
  overlayTextSize: PropTypes.string,
  overlayTextWeight: PropTypes.string,
  showThumbnails: PropTypes.bool,
  imageBorderRadius: PropTypes.string,
  controlsSize: PropTypes.string,
  controlsPadding: PropTypes.string,
  controlsColor: PropTypes.string,
  thumbnailSize: PropTypes.string,
  thumbnailBorderRadius: PropTypes.string,
  thumbnailPadding: PropTypes.string,
  animationDuration: PropTypes.number,
  isOverlaySlider: PropTypes.bool,
  subTitleAnimationType: PropTypes.string,
  titleAnimationType: PropTypes.string,
  imageAnimationType: PropTypes.string,
  thumbnailAnimationType: PropTypes.string,
};

const PageView = ({ images, currentIndex, pageRef }) => (
  <div
    className="page-view"
    ref={pageRef}
    style={{ display: 'flex', overflowX: 'scroll', scrollBehavior: 'smooth' }}
  >
    {images.map((image, index) => (
      <img
        key={index}
        src={image.imageUrl}
        alt={image.title}
        style={{ flexShrink: 0, width: '100%', borderRadius: '0px' }}
      />
    ))}
  </div>
);

const OverlaySlider = ({ images, currentIndex, nextIndex, animateToPage }) => (
  <div className="overlay-slider">
    <img
      src={images[currentIndex].imageUrl}
      alt={images[currentIndex].title}
      style={{ width: '100%', height: '100%' }}
    />
    {currentIndex !== nextIndex && (
      <img
        src={images[nextIndex].imageUrl}
        alt={images[nextIndex].title}
        style={{ width: '100%', height: '100%' }}
      />
    )}
  </div>
);

export default SliderAndCheckbox;
