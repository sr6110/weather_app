import "./CurrentConditions.css";
import Card from "./Card";

function CurrentConditions({ data }) {
  return (
    <div className="current-conditions">
      <h2>Current Conditions</h2>
      <p>
        Location: <span id="location">{data && data.name}</span>
      </p>
      <div data-testid="card-component">{data && data.id && <Card data={data} />}</div>
    </div>
  );
}

export default CurrentConditions;
