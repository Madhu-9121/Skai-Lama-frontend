import React, { useEffect } from "react";
import styles from "./table.module.css";
import axios from "axios";

const RenderDataTable = ({ pname, tasks ,setTasks}) => {
  useEffect(() => {
    console.log("in table:", tasks);
  }, [tasks]);
  const handleDelete = async (name) => {
    try {
      const email = localStorage.getItem("userEmail");
      console.log("email:",email,"name:",name,"pname:",pname)
      await axios.delete(`http://localhost:3000/v1/user/${email}/delete`, {
        data: {
          itemName: name,
          projectName: pname,
        },
      })
      // console.log(data)

      setTasks((prevTasks) => prevTasks.filter((task) => task.ItemName !== name))
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (itemId) => {
    
  };

  return (
    <>
      <div className={styles.tryout}>
        <p className={styles.para}>
          All files are processed! Your widget is ready to go!
        </p>
        <button className={styles.tryBtn}>Try it out!</button>
      </div>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Upload Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((row) => (
              <tr key={row._id}>
                <td>{row.ItemName || row.name}</td>
                <td>{new Date().toLocaleString()}</td>
                <td>Done</td>
                <td>
                  <div className={styles.btnhead}>
                    <button
                      className={styles.editbtn}
                      onClick={() => handleEdit(row.ItemName)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deletebtn}
                      onClick={() => handleDelete(row.ItemName)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RenderDataTable;
