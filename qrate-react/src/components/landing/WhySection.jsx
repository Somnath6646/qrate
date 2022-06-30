export const WhySection = ({ ...props }) => {
  const style = window.innerWidth < 640 ? { width: props.width } : {};
  return (
    <div className="whysection">
      <div className="why-text">{props.children}</div>
      <img src={props.image} style={style} className="dm-image"></img>
    </div>
  );
};
