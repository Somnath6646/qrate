import "../../css/NoCollectionContent.css";

export const NoCollectionContent = ({ ...props }) => {
  return (
    <div className="no-collection-content">
      <div className="no-collection-title-text-container">
        <div className="no-collection-title-text">{props.title}</div>
      </div>
      <ul className="no-collection-description-text">{props.children}</ul>
    </div>
  );
};
