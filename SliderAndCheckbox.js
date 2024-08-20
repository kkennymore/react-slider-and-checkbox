import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './src/SliderAndCheckbox.css';

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
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
      nextPage();
    }, 3000);
    setAutoScrollTimer(timer);
  };

  const clearTimers = () => {
    if (autoScrollTimer) clearInterval(autoScrollTimer);
  };

  const nextPage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  const prevPage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    pageRef.current.scrollTo({
      left: pageRef.current.scrollWidth * (index / images.length),
      behavior: 'smooth',
    });
  };

  return (
    <div className="slider-and-checkbox">
      <div className="slider-container">
        <div className="slider">
          <PageView
            images={images}
            currentIndex={currentIndex}
            pageRef={pageRef}
            imageBorderRadius={imageBorderRadius}
          />
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
};

const PageView = ({ images, currentIndex, pageRef, imageBorderRadius }) => (
  <div
    className="page-view"
    ref={pageRef}
    style={{
      display: 'flex',
      overflowX: 'hidden',
      scrollBehavior: 'smooth',
      whiteSpace: 'nowrap',
    }}
  >
    {images.map((image, index) => (
      <img
        key={index}
        src={image.imageUrl}
        alt={image.title}
        style={{
          flexShrink: 0,
          width: '100%',
          borderRadius: imageBorderRadius,
        }}
      />
    ))}
  </div>
);

export default SliderAndCheckbox;
