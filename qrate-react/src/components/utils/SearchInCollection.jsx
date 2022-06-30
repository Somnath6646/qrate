import "../../css/SearchInCollection.css";

export const SearchInCollection = ({ ...props }) => {
  return (
    <input
      class="search-in-collection"
      type="text"
      placeholder="Type here to search in your collections"
      onChange={(event) => {
        props.setFilterCol(event.target.value);
      }}
    />
  );
};
