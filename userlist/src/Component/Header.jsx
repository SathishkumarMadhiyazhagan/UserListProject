const Header = ({ sortOrder, onHandleSort, onHandleSearch }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="Enter search value"
        onChange={(e) => onHandleSearch(e)}
      />
      <button onClick={onHandleSort}>
        Sort {sortOrder === "asc" ? "↓" : "↑"}
      </button>
    </div>
  );
};

export default Header;
