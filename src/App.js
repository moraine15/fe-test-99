import { useState, useEffect } from 'react';
import './styles.css';

// Izinkan spasi atau dash di antara 4-4 digit (format SG: mulai 3/6/8/9)
const phoneRegex = /\b([3689]\d{3})[ -]?(\d{4})\b/g;

// Helper function to anonymize phone numbers
function anonymizePhone(text) {
  // Singapore phone format: 8 digits, starts with 3, 6, 8, or 9
  // const phoneRegex = /\b([3689]\d{3})(\d{4})\b/g;
  return text.replace(phoneRegex, '$1 XXXX');
}

// Helper function to create clickable phone numbers
function PhoneNumber({ number }) {
  const [revealed, setRevealed] = useState(false);
  const digits = (number || '').replace(/\D/g, '');
  const anonymized = digits.slice(0, 4) + ' XXXX';
  const formatted = digits.length === 8
    ? digits.replace(/(\d{4})(\d{4})/, '$1 $2')
    : number;

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
      {revealed ? formatted : anonymized}
    </span>
  );
}

// Gabungkan baris terputus menjadi paragraf rapi (UI/UX friendly)
function normalizeDescription(text) {
  const lines = String(text || '').replace(/\r\n?/g, '\n').split('\n');
  const paragraphs = [];
  let buffer = '';

  const flush = () => {
    const cleaned = buffer
      .replace(/\s+/g, ' ')           // rapikan spasi
      .replace(/\s([.,!?;:])/g, '$1') // hilangkan spasi sebelum tanda baca
      .trim();
    if (cleaned) paragraphs.push(cleaned);
    buffer = '';
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {        // baris kosong = pemisah paragraf
      flush();
      continue;
    }
    buffer += (buffer ? ' ' : '') + line; // gabungkan baris menjadi satu paragraf
  }
  flush();
  return paragraphs;
}

// Parse description and replace phone numbers with clickable components
function parseDescription(text) {
  phoneRegex.lastIndex = 0; // penting: reset regex global sebelum parse
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = phoneRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<PhoneNumber key={match.index} number={match[0]} />);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

export default function ListingAd({
  flag, arrow_left, arrow_right, price, icon, pic, title, address, 
  description, availabilities_label, subprice_label, project_type, 
  year, ownership_type 
}) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [shouldHideInitially, setShouldHideInitially] = useState(false);
  
  // For SEO: show description initially, then hide after page load
  useEffect(() => {
    setShouldHideInitially(true);
  }, []);
  
  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };
  
  const displayDescription = !shouldHideInitially || isDescriptionVisible;
  
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
              <p className="labelTop">{project_type} · {year} · {ownership_type}</p>
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

        <div className={`descriptionSection ${displayDescription ? 'visible' : ''}`}>
          <div className="description">
            {String(description || '')
              .replace(/\r\n?/g, '\n')
              .split('\n')
              .map((line, index) => (
                line.trim() ? (
                  <p key={index} className="descriptionText">
                    {parseDescription(line)}
                  </p>
                ) : null
              ))
            }
          </div>
        </div>

        <div className="bottomContent">
          <button onClick={toggleDescription}>
            {isDescriptionVisible ? 'Hide description' : 'See description'}
          </button>
        </div>
      </div>
    </div>
  );
}