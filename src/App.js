import "./styles.css";
export default function ListingAd({flag, arrow_left, arrow_right, price,icon, pic, title, address, description ,availabilities_label, subprice_label,project_type,year,ownership_type }) {
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
                <img className="icon" width="40" height="40" src={icon}/>
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

        <div className="bottomContent">
          <button>See description</button>
          {/* <p className="description">{description}</p> */}
        </div>

      </div>
    </div>
  );
}
