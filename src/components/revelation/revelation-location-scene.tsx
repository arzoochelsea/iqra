export function RevelationLocationScene({ location }: { location: "makkah" | "madinah" }) {
  return (
    <div className={`revelation-scene revelation-scene-${location}`} aria-hidden="true">
      <div className="revelation-sky"><i /><i /><i /><i /></div>
      {location === "makkah" ? (
        <><div className="desert-hill hill-far" /><div className="desert-city"><i /><i /><i /><i /><b /></div><div className="desert-hill hill-near" /></>
      ) : (
        <><div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="oasis-city"><i /><i /><i /><i /></div><div className="palm palm-one"><b /><span /></div><div className="palm palm-two"><b /><span /></div></>
      )}
    </div>
  );
}
