import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function PhoneNumber({ number }) {
  // Mask phone until clicked.
  const [revealed, setRevealed] = useState(false);
  const digits = String(number || '').replace(/\D/g, '');
  const formatted =
    digits.length === 8 ? digits.replace(/(\d{4})(\d{4})/, '$1 $2') : String(number || '');
  const masked = digits.length >= 4 ? `${digits.slice(0, 4)} XXXX` : formatted;

  return (
    <span
      className={`phone-number ${revealed ? 'revealed' : 'masked'}`}
      role="button"
      tabIndex={revealed ? -1 : 0}
      onClick={() => setRevealed(true)}
      onKeyDown={(e) => {
        if (!revealed && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          setRevealed(true);
        }
      }}
    >
      {revealed ? formatted : masked}
    </span>
  );
}

// Merge broken lines into clean paragraphs.
function normalizeDescription(text) {
  const normalized = String(text || '').replace(/\r\n?/g, '\n');
  return normalized
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean);
}

// Convert detected phones into clickable components.
function parseDescription(text) {
  const input = String(text || '');
  // Create a fresh regex per call to avoid shared lastIndex state
  const regex = /\b([3689]\d{3})[ -]?(\d{4})\b/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) parts.push(input.slice(lastIndex, match.index));
    // Use a prefixed string key to avoid raw numeric keys
    parts.push(<PhoneNumber key={`phone-${match.index}`} number={match[0]} />);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < input.length) parts.push(input.slice(lastIndex));
  return parts;
}

export default function ListingAd({
  flag,
  arrow_left,
  arrow_right,
  price,
  icon,
  pic,
  title,
  address,
  description,
  availabilities_label,
  subprice_label,
  project_type,
  year,
  ownership_type
}) {
  // SEO: show description on first paint, then let user expand.
  const [showDescription, setShowDescription] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDescriptionVisible = !mounted || showDescription;

  // Memoize normalization and parsing to avoid rework every render
  const paragraphs = useMemo(() => normalizeDescription(description), [description]);
  const parsedParagraphs = useMemo(
    () => paragraphs.map((p) => parseDescription(p)),
    [paragraphs]
  );

  return (
    <div className="App">
      <div className="imageContainer">
        {flag && <img className="flag" src={flag} alt="Flag" />}
        <img className="mainPic" src={pic} alt={title} />

        <button className="arrowBtn arrowLeft">
          <img src={arrow_left} alt="Previous" />
        </button>
        <button className="arrowBtn arrowRight">
          <img src={arrow_right} alt="Next" />
        </button>
      </div>

      <div className="mainContent">
        <div className="topContent">
          <div className="leftContent">
            <div className="leftTopContent">
              <img className="icon" width="40" height="40" src={icon} alt="" />
              <div className="textLeftTopContent">
                <h1 className="title">{title}</h1>
                <p className="address">{address}</p>
              </div>
            </div>
            <div className="leftBotContent">
              <p className="labelTop">
                {project_type} · {year} · {ownership_type}
              </p>
              <p className="labelBot">{availabilities_label}</p>
            </div>
          </div>

          <div className="rightContent">
            <div className="price">
              <h1>{price}</h1>
            </div>
            <p className="priceFrom">{subprice_label}</p>
          </div>
        </div>

        <div className={`descriptionSection ${isDescriptionVisible ? 'visible' : ''}`}>
          <div className="description">
            {parsedParagraphs.map((content, i) => (
              <p key={`p-${i}`} className="descriptionText">
                {content}
              </p>
            ))}
          </div>
        </div>

        <div className="bottomContent">
          <button onClick={() => setShowDescription(v => !v)}>
            {showDescription ? 'Hide description' : 'See description'}
          </button>
        </div>
      </div>
    </div>
  );
}

PhoneNumber.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ListingAd.propTypes = {
  flag: PropTypes.string,
  arrow_left: PropTypes.string,
  arrow_right: PropTypes.string,
  price: PropTypes.string,
  icon: PropTypes.string,
  pic: PropTypes.string,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  description: PropTypes.string,
  availabilities_label: PropTypes.string,
  subprice_label: PropTypes.string,
  project_type: PropTypes.string,
  year: PropTypes.number,
  ownership_type: PropTypes.string
};