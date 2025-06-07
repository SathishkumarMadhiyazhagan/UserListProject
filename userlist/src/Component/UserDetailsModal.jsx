const UserDetailsModal = ({currentModalUser, onClose}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h1>User Details</h1>
                <label><strong>Name:</strong> {currentModalUser.username}</label>
                <label><strong>Email:</strong> {currentModalUser.email}</label>
                <label><strong>Company:</strong> {currentModalUser.company.name}</label>
                <label><strong>City:</strong> {currentModalUser.address.city}</label>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default UserDetailsModal;