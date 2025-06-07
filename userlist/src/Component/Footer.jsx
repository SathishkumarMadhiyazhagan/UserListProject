const Footer = ({ totalPages, handlePageChange, currentPage }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      {totalPages !== 0 && Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          disabled={currentPage === i + 1}
          style={{
            margin: "2px",
            backgroundColor: currentPage === i + 1 ? "#ccc" : "#fff",
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Footer;
