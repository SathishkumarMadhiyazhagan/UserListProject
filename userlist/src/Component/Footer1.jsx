const Footer1 = ({ totalPages, currentPage, handlePrev, handleNext, handlePageChange }) => {
    return (
      <div style={{ marginTop: "10px" }}>
        {totalPages !== 0 && (<>
        <button onClick={handlePrev} disabled={currentPage === 1}
        style={{margin: '0px 2px'}}>Prev</button>
        {/* <span style={{margin: '0px 10px'}}>{currentPage}</span> */}
        {[...Array.from({length: totalPages}, (_, i) => (
          <button key={i+1}
          onClick={() => handlePageChange(i+1)}
          disabled={currentPage === i+1}
          style={{margin: '0px 2px'}}
          >
            {i+1}
          </button>
        ))]}
        <button onClick={handleNext} disabled={currentPage === totalPages}
        style={{margin: '0px 2px'}}>Next</button>
        </>)}
      </div>
    );
  };
  
  export default Footer1;
  