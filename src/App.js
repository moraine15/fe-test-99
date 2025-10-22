import { useState, useEffect } from 'react';
import './styles.css';

// SG phone: 8 digits starting with 3/6/8/9; space/dash between blocks is optional.
const PHONE_REGEX = /\b([3689]\d{3})[ -]?(\d{4})\b/g;

function PhoneNumber({ number }) {
  // Mask phone until clicked.
  const [revealed, setRevealed] = useState(false);
  const digits = String(number || '').replace(/\D/g, '');
  const formatted =
    digits.length === 8 ? digits.replace(/(\d{4})(\d{4})/, '$1 $2') : String(number || '');
  const masked = digits.length >= 4 ? `${digits.slice(0, 4)} XXXX` : formatted;

  return (
    <span
      className="phone-number"
      onClick={() => setRevealed(true)}
      style={{
        cursor: revealed ? 'default' : 'pointer',
        textDecoration: 'none',
        color: revealed ? 'inherit' : '#2563EB'
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
  PHONE_REGEX.lastIndex = 0;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = PHONE_REGEX.exec(input)) !== null) {
    if (match.index > lastIndex) parts.push(input.slice(lastIndex, match.index));
    parts.push(<PhoneNumber key={match.index} number={match[0]} />);
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
            {normalizeDescription(description).map((p, i) => (
              <p key={i} className="descriptionText">
                {parseDescription(p)}
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