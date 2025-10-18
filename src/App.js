import "./styles.css";
export default function ListingAd({icon, pic, title, address, description ,availabilities_label, subprice_label}) {
  return (
    <div className="App">
      <img className="mainPic" width="544" height="272" src={pic} />
      <div className="mainContent">

        <div className="topContent">
            <div className="leftContent">
              <div className="icon" width="40" height="40" src={icon}></div>
              <div className="title">
                <h1>{title}</h1>
              <div/>
                <p className="address">{address}</p>
                <p className="label">{availabilities_label}</p>
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
          <p className="description">{description}</p>
        </div>

      </div>
    </div>
  );
}
