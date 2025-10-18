import "./styles.css";
export default function ListingAd({icon, pic, title, address, description ,availabilities_label, subprice_label,project_type,year,ownership_type }) {
  return (
    <div className="App">
      <img className="mainPic" width="544" height="272" src={pic} />
      <div className="mainContent">

        <div className="topContent">
            <div className="leftContent">
              <div className="leftTopContent">
                <img className="icon" width="40" height="40" src={icon}/>
                  <div className="textLeftTopContent">
                    <p className="title">{title}</p>
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
                <h1>$2,609 - $3,043 psf</h1>
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
