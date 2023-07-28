import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BlockIcon from "@mui/icons-material/Block";
import { AcceptAndReject, UpdatePasswordModalForm, Block } from "../modals";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ClipLoader } from "react-spinners";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {
  GET_ALL_USERS,
  SEARCH_USER_DJ,
  UPDATE_BLOCK,
  GET_DJ_OF_WEEK_LIST,
  UPDATE_DJ_OF_THE_WEEK,
} from "../../constant/constants";

const DjWeekTable = () => {
  const [tableData, setTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [blockStatus, setBlockStatus] = useState();
  const [blockReq, setBlockReq] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isApproveBtnClick, setIsApproveBtnClick] = useState(true);
  const [djId, setDjId] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchData = async (LINK) => {
    try {
      const data = await axios.get(LINK, {
        headers: { Authorization: `Bearer ${user.data.token}` },
      });
      return data.data;
    } catch (err) {
      console.log("Data : ", err);
    }
  };

  const approveDjs = async (_id) => {
    let config = {
      method: "post",
      url: UPDATE_DJ_OF_THE_WEEK,
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
      data: {
        id: _id,
        status: "Accept",
      },
    };
    try {
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log("Data : ", err);
    }
  };
  const rejectDjs = async () => {};

  useEffect(() => {
    fetchData(GET_DJ_OF_WEEK_LIST)
      .then((res) => {
        setLoading(false);
        if (res?.data?.djOfWeek) {
          setTableData(res.data.djOfWeek);
        }
      })
      .catch();
  }, [blockReq]);

  const filterFilter = async ({ date1, date2 }) => {
    const data = await axios.post(
      SEARCH_USER_DJ,
      {
        firstDate: date1,
        lastDate: date2,
        userType: "user",
      },
      { headers: { Authorization: `Bearer ${user.data.token}` } }
    );
    return data;
  };

  const filterData = (isCancel, type) => {
    setIsOpen(false);
    if (type == "accept") {
      approveDjs(djId);
    } else if (type == "reject") {
    }
  };

  const updateBlock = async ({ id, status }) => {
    const data = await axios.post(
      UPDATE_BLOCK,
      {
        userId: id,
        blockStatus: status,
      },
      { headers: { Authorization: `Bearer ${user.data.token}` } }
    );
    return data.data;
  };

  const blockUser = ({ id, blockStatus }) => {
    setBlockOpen(false);

    const status = blockStatus === "false";
    updateBlock({ id, status })
      .then((res) => {
        setLoading(true);
        setBlockReq(!blockReq);
      })
      .catch();
  };

  function createData(
    sno: number,
    name: string,
    email: string,
    zipCode: string,
    doj: string,
    block: string,
    id: string
  ) {
    return { sno, name, email, doj, zipCode, block, id };
  }
  let sno = 1;
  const rows = tableData.map((rowData, sno) => {
    return createData(
      `${sno + 1}`,
      `${rowData.djName || "-"}`,
      `${rowData.email}`,
      `${rowData.zipCode || "-"}`,
      `${rowData.createdAt.substring(0, 10)}`,
      `${rowData.blockStatus || "false"}`,
      `${rowData._id}`
    );
  });

  return (
    <div className="w-[90%] mx-auto max-2md:w-[85%]">
      <div className="w-full mt-[85px]">
        <div className="flex justify-between items-center">
          <h3 className="font-gill text-[30px] font-semibold">
            DJ of the weeks
          </h3>
          <figure
            onClick={() => setIsOpen(true)}
            className="border p-1 rounded-sm cursor-pointer select-none"
          >
            <FilterListIcon />
          </figure>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-[4em]">
          <ClipLoader />
        </div>
      ) : (
        <TableContainer component={Paper} className="mb-10 mt-4">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  <span className="font-bold text-[16px]">S. No.</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Add Duration</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Cost</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Location</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-[16px]">Reivew</span>
                </TableCell>
                <TableCell align="center">
                  <span className="font-bold text-[16px]">Action</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <span
                      className="hover:cursor-pointer"
                      onClick={() => navigate(`/user/${row.id}`)}
                    >
                      <img
                        style={{ width: "50px", borderRadius: "50px" }}
                        borderRadius={"15px"}
                        w={"30px"}
                        src={row.image}
                      />
                    </span>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.addDuration} days
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.location}
                  </TableCell>
                  <TableCell>{row.review}</TableCell>
                  <TableCell align="center">
                    <Button
                      style={{ marginRight: "10px" }}
                      className="bg-blue hover:bg-mid-blue rounded-lg py-2 px-8 text-white font-roboto "
                      onClick={() => {
                        setIsApproveBtnClick(true);
                        setIsOpen(true);
                        setDjId(row._id);
                      }}
                      variant="primary"
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-red hover:bg-mid-red rounded-lg py-2 px-8 text-white font-roboto "
                      variant="danger"
                      onClick={() => {
                        setIsApproveBtnClick(false);
                        setIsOpen(true);
                        setDjId(row._id);
                      }}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Block
        blockOpen={blockOpen}
        setBlockOpen={setBlockOpen}
        id={id}
        blockUser={blockUser}
        blockStatus={blockStatus}
        user="user"
      />
      <AcceptAndReject
        isOpen={isOpen}
        // isOpen={true}
        setIsOpen={setIsOpen}
        handleFilter={filterData}
        isApproveBtnClick={isApproveBtnClick}
      />
    </div>
  );
};
export default DjWeekTable;
