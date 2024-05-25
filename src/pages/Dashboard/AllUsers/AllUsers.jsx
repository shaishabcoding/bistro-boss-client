import { useQuery } from "@tanstack/react-query";
import usePrivateClient from "../../../hooks/usePrivateClient";
import { FaTrashAlt, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const privateClient = usePrivateClient();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await privateClient.get("/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    }).then((result) => {
      if (result.isConfirmed) {
        privateClient.patch(`/users/admin/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: "User update successfully to admin.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        privateClient.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users : {users.length}</h2>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role == "admin" ? (
                    "admin"
                  ) : (
                    <button
                      title="update"
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm btn-info text-white"
                    >
                      <FaUserCircle></FaUserCircle>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    title="delete"
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
