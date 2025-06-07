import { useEffect, useState } from "react";
import TableList from "./TableList";
import Header from "./Header";
import Footer from "./Footer";
import Footer1 from "./Footer1";
import UserDetailsModal from "./UserDetailsModal";

let timeout = 0;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModalUser, setCurrentModalUser] = useState({});
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const sortedData = data.users.sort((a, b) =>
          a.username.localeCompare(b.username)
        );
        setUsers(sortedData);
        setFilterUsers(sortedData);
      })
      .catch((err) => setError(err.message));
  }, []);

  const onHandleSearch = (e) => {
    const value = e.target.value;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().includes(value.toLowerCase()) ||
          user.address.city.toLowerCase().includes(value.toLowerCase())
      );
      setFilterUsers(filtered);
      setCurrentPage(1);
    }, 1000);
  };

  const onHandleSort = () => {
    const sorted = [...filterUsers];
    if (sortOrder === "asc") {
      sorted.sort((a, b) => b.username.localeCompare(a.username));
      setSortOrder("desc");
    } else {
      sorted.sort((a, b) => a.username.localeCompare(b.username));
      setSortOrder("asc");
    }
    setFilterUsers(sorted);
  };

  const totalPages = Math.ceil(filterUsers.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filterUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onHandleModal = (user) => {
    setCurrentModalUser(user, setModalOpen(true));
  };

  const onClose = () => {
    setModalOpen(false);
  }

  return (
    <>
      <Header
        sortOrder={sortOrder}
        onHandleSearch={onHandleSearch}
        onHandleSort={onHandleSort}
      />
      <TableList
        error={error}
        currentUsers={currentUsers}
        onHandleModal={onHandleModal}
      />
      <Footer
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
      <Footer1
        totalPages={totalPages}
        currentPage={currentPage}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handlePageChange={handlePageChange}
      />
      {modalOpen && <UserDetailsModal currentModalUser={currentModalUser} onClose={onClose} />}
    </>
  );
};

export default UserList;
