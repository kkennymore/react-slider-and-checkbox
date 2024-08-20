import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './SliderAndCheckbox.css'; // Import the CSS file for styling

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
  subTitleAnimationType = 'fadeInUp', // Added default animation types
  titleAnimationType = 'fadeInDown',
  imageAnimationType = 'fadeIn',
  thumbnailAnimationType = 'fadeIn',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScrollTimer, setAutoScrollTimer] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    if (autoScroll) {
      startAutoScroll();
    }
    return () => {
      clearInterval(autoScrollTimer);
    };
  }, [autoScroll, currentIndex]);

  const startAutoScroll = () => {
    const timer = setInterval(() => {
      nextPage();
    }, 3000);
    setAutoScrollTimer(timer);
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
  };

  return (
    <div className="slider-and-checkbox">
      <div className="slider-container">
        <div className="slider">
          {images.map((image, index) => (
            <div
              key={index}
              className={`slider-image ${index === currentIndex ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${image.imageUrl})`,
                borderRadius: imageBorderRadius,
                transition: `opacity ${animationDuration}ms ease-in-out`,
                opacity: index === currentIndex ? 1 : 0,
              }}
            >
              {showOverlayText && (
                <div className="overlay-text">
                  <h2
                    className={`overlay-title animated ${titleAnimationType}`}
                    style={{
                      color: overlayTextColor,
                      fontSize: overlayTextSize,
                      fontWeight: overlayTextWeight,
                      animationDuration: `${animationDuration}ms`,
                    }}
                  >
                    {image.title}
                  </h2>
                  <p
                    className={`overlay-subtitle animated ${subTitleAnimationType}`}
                    style={{
                      color: overlayTextColor,
                      fontSize: overlayTextSize,
                      fontWeight: overlayTextWeight,
                      animationDuration: `${animationDuration}ms`,
                    }}
                  >
                    {image.subtitle}
                  </p>
                </div>
              )}
            </div>
          ))}
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
              className={`thumbnail animated ${thumbnailAnimationType}`}
              style={{
                width: thumbnailSize,
                height: thumbnailSize,
                borderRadius: thumbnailBorderRadius,
                margin: thumbnailPadding,
                opacity: index === currentIndex ? 1 : 0.5,
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

export default SliderAndCheckbox;
