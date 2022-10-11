import { useState } from "react";
import { useRecoilState } from "recoil";
import { nanoid } from "nanoid";
import { studentsState } from "../../state.js";
import gitStyle from "../../../styles/GitHub.module.css";
import Image from "next/image";

const GitHubModal = ({ showGitHubModal, setShowGitHubModal, onClose }) => {
  const [students, setStudents] = useRecoilState(studentsState);
  const [gitHubAccount, setGitHubAccount] = useRecoilState(studentsState);
  const [showForm, SetShowForm] = useState(false)
  const [addFormData, setAddFormData] = useState({
    name_first:'',
    name_last: '',
    github: ''
  })
  // console.log(gitHubAccount[0].github);

  // not complete
  const addGitHubAccount = () => {
    axios({
      method: "post",
      url: `/api/students`,
      data: {
        github: "",
      },
    });
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value;

    const newFormData = {...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const addStudent = {
      id:nanoid(),
      name_first: addFormData.name_first,
      name_last: addFormData.name_last,
      github: addFormData.github,
    }

    const addStudents = [...students, addStudent]
    setStudents(addStudents);

  }

  return (
    <>
      {showGitHubModal ? (
        <div>
          <div className={gitStyle.background} onClick={onClose}></div>
          <div className={gitStyle.gitContainer}>
            <div className={gitStyle.top_bar}></div>
            <div>
              <div className={gitStyle.listHeader}>
                <div>
                  <div className={gitStyle.headerInfo}>
                    <div className={gitStyle.info}>
                      <svg className={gitStyle.personIcon}>
                        <path
                          fillRule="evenodd"
                          d="M10.5 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm.061 3.073a4 4 0 10-5.123 0 6.004 6.004 0 00-3.431 5.142.75.75 0 001.498.07 4.5 4.5 0 018.99 0 .75.75 0 101.498-.07 6.005 6.005 0 00-3.432-5.142z"
                        ></path>
                      </svg>{" "}
                      {` ${students.length} Members`}
                    </div>
                  </div>
                  <div onClick={onClose} className={gitStyle.close}></div>
                </div>
              </div>
              <ul className={gitStyle.tableList}>
              {students.map((student) => (
                <li className={gitStyle.tableListItem}>
                  <div className={gitStyle.tableListCell}>
                    <span className={gitStyle.frameLeft}>
                      <a className={gitStyle.frameInline} href="#">
                        <Image
                          src="/pic1.jpg"
                          height="44"
                          width="44"
                          className={gitStyle.avatar}
                        />
                      </a>
                    </span>
                  </div>
                  <div className={gitStyle.tableListName}>
                    <a className={gitStyle.frameInclineName}>
                      {" "}
                      {student.name_first + " " + student.name_last}{" "}
                    </a>
                    <span className={gitStyle.codeName}>
                      {" "}
                      {student.github}{" "}
                    </span>
                  </div>
                </li>
                ))}
              </ul>
              <h2 className={gitStyle.addAccount}>+Add Account</h2>
              <form onSubmit={handleAddFormSubmit}>
                <input className= {gitStyle.field} type="text" name= "name_first" required="required" placeholder="Enter First Name" onChange= {handleAddFormChange}></input>
                <input className= {gitStyle.field} type="text" name= "name_last" required="required" placeholder="Enter Last Name" onChange= {handleAddFormChange}></input>
                <input className= {gitStyle.field} type="text" name= "github" required="required" placeholder= "Enter Profile Name" onChange= {handleAddFormChange}></input>
                <button type="submit">Add</button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GitHubModal;
