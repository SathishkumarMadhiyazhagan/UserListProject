const TableList = ({ error, currentUsers, onHandleModal }) => {
  return (
    <>
      <h2>User Table</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {currentUsers.length !== 0 && (
        <table
          border="1"
          cellPadding="8"
          cellSpacing="0"
          style={{
            margin: "0px 10px",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>City</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.company?.name}</td>
                <td>{user.address?.city}</td>
                <td>
                  {/* <button onClick={() => onHandleModal(user)}> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                      width="20"
                      fill="#000000"
                      onClick={() => onHandleModal(user)}
                    >
                      <path d="M12 4.5C7.305 4.5 3.135 7.36 1 12c2.135 4.64 6.305 7.5 11 7.5s8.865-2.86 11-7.5C20.865 7.36 16.695 4.5 12 4.5zm0 12c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm0-7.5a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                  {/* </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TableList;
