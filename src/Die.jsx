export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  // return (
  //   <div className="die-face" style={styles} onClick={props.holdDie}>
  //     <p className="die-text">{props.value}</p>
  //   </div>
  // );
  const Pip = () => <span className="pip" />;
  const Face = ({ children }) => (
    <div className="face" style={styles} onClick={props.holdDie}>
      {children}
    </div>
  );

  let pips = Number.isInteger(props.value)
    ? Array(props.value)
        .fill(0)
        .map((_, i) => <Pip key={i} />)
    : null;

  return <Face>{pips}</Face>;
}
