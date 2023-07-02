import { MapContainer, TileLayer, Popup } from "react-leaflet";


function Map({ latitude, longitude, temperature, precipitation }) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {precipitation && (
        <Popup position={[latitude, longitude]}>
          <h3>Temperature: {temperature}&deg;C</h3>
          <div style={{display:"flex", alignItems:"center"}}>{precipitation}</div>
        </Popup>
      )}
    </MapContainer>
  );
}

export default Map;
