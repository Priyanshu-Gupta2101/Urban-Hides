//Page that shows all users

const Users = () => {
  return (
    <div className="md:p-20">
      <p className="mb-10 text-4xl font-bold">Users</p>

      <div className="grid overflow-x-scroll max-w-full py-12">
        <table className="border-2 border-black text-center">
          <tbody>
            <tr className="border-2 border-black">
              <th className="border-2 border-black py-6">Sr No.</th>
              <th className="border-2 border-black py-6">Phone</th>
              <th className="border-2 border-black">Email</th>
              <th className="border-2 border-black  ">Purchases</th>
              <th className="border-2 border-black  ">Purchases worth</th>
            </tr>
            <tr>
              <td className="border-2 border-black py-6">1</td>
              <td className="border-2 border-black py-6">9876543212</td>
              <td className="border-2 border-black">anshu@gmail.com</td>
              <td className="border-2 border-black">10</td>
              <td className="border-2 border-black">Rs. 10000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
