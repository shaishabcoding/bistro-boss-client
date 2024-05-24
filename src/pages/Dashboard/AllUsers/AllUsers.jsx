import { useQuery } from "@tanstack/react-query";
import usePrivateClient from "../../../hooks/usePrivateClient";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AllUsers = () => {
  const privateClient = usePrivateClient();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await privateClient.get("/users");
      return res.data;
    },
  });
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
                <td>{user.role ?? "User"}</td>
                <td className="flex gap-3 justify-evenly">
                  <button className="btn btn-sm btn-error text-white">
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                  <button className="btn btn-sm btn-info text-white">
                    <FaEdit></FaEdit>
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
