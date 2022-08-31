import React from "react";
import { useApp } from "../../context/AppContext";
import useFireStore from "../../hooks/useFireStore";
import UserItem from "../UserItem/UserItem";

// function UserList() {
//   const data = useFireStore("users");
//   console.log(data);
// const {selectedUserId, setSelectedUserId} = useApp();

//   return (
//     <div
//       className="user-list"
//       style={{
//         padding: "0 4px",
//         maxHeight: "calc(100vh - 80px)",
//         overflowY: "auto",
//       }}
//     >
//       {data.map((user) => (
//         <UserItem
//           iconSize={"large"}
//           text="asdsdds da sdadad sda"
//           colLeft={3}
//           colRight={20}
//           user={user}
//           onClick={() => setSelectedUserId()}
//         />
//       ))}
//     </div>
//   );
// }

// export default UserList;
