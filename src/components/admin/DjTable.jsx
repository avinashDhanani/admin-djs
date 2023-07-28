import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import BlockIcon from '@mui/icons-material/Block';
import { FilterAdminModal, Block } from "../modals";
import Table from '@mui/material/Table';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ClipLoader } from "react-spinners";
import Paper from '@mui/material/Paper';
import axios from "axios";
import { GET_ALL_DJS, SEARCH_USER_DJ, UPDATE_BLOCK } from "../../constant/constants";

const DjTable = () => {
    const [tableData, setTableData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState('')
    const [blockStatus, setBlockStatus]= useState()
    const [blockOpen, setBlockOpen] = useState(false);
    const [blockReq, setBlockReq]= useState(false);
    const [loading, setLoading] = useState(true)
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
    const fetchData = async (LINK) => {
        try {
            const data = await axios.get(LINK, { headers: { Authorization: `Bearer ${user.data.token}` }, });
            return data.data;
        } catch (err) {
        }
    }

    useEffect(() => {
        fetchData(GET_ALL_DJS)
            .then(res => { setLoading(false)
                setTableData(res.data.dj)})
            .catch()
    }, [blockReq]);

    const filterFilter = async ({ date1, date2, sps, pricing, ratings}) => {
        const data = await axios.post(SEARCH_USER_DJ, {
            firstDate: date1, lastDate: date2, userType: 'dj', pricing, ...sps, ...ratings
        } ,{ headers: { Authorization: `Bearer ${user.data.token}` }});
        return data;
    }

    const filterData= ( {pricing, sps, firstDate, secondDate, ratings}) => {
        try{setIsOpen(false)
        setLoading(true)
        let MM = Number(firstDate.$M) +1
        const date1= firstDate.$y + '-' + MM  + '-' + firstDate.$D || ''
        MM= Number(secondDate.$M) +1
        const date2= secondDate.$y + '-' + MM + '-' + secondDate.$D || ''
        
        filterFilter({date1, date2, pricing, sps, ratings})
            .then(res =>{    setLoading(false);
                setTableData(res.data.data.dj)})
            .catch(err => setLoading(false))}
            catch(err){}
    }

    const updateBlock= async({id, status}) => {
        const data=await axios.post(UPDATE_BLOCK, {
            userId: id, blockStatus: status},{ headers: { Authorization: `Bearer ${user.data.token}` }
    })
        return data.data
    }

    const blockUser= ({id, blockStatus}) => {
        setBlockOpen(false)

        const status= blockStatus==='false'
        updateBlock({id, status})
        .then(res => { setLoading(true); setBlockReq(!blockReq)})
        .catch()
    }

    function createData(
        sno: number,
        name: string,
        email: string,
        doj: string,
        block: Boolean,
        id: string
    ) {
        return { sno, name, email, doj, block, id };
    }

    let sno = 1
    const rows =
        tableData.map((rowData, sno) => {
            return createData(`${sno + 1}`, `${rowData.djName || '-'}`, `${rowData.email}`, `${rowData.createdAt.substring(0, 10)}`, `${rowData.blockStatus || 'false'}`, `${rowData._id}`)
        })


    return (
        <div className="w-[90%] mx-auto max-2md:w-[85%]">
            <div className="w-full mt-[85px]">

                <div className="flex justify-between items-center">
                    <h3 className="font-gill text-[30px] font-semibold">
                        DJ Details
                    </h3>
                    <figure
                        onClick={() => setIsOpen(true)}
                        className="border p-1 rounded-sm cursor-pointer select-none"
                    >
                        <FilterListIcon/>
                    </figure>
                </div>
            </div>

            {loading ? (<div className="text-center mt-[4em]"><ClipLoader /></div>) : (
                <TableContainer component={Paper} className='mb-10 mt-4'>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell > <span className="font-bold text-[16px]">S. No.</span></TableCell>
                            <TableCell ><span className="font-bold text-[16px]">Name</span></TableCell>
                            <TableCell ><span className="font-bold text-[16px]">Email</span></TableCell>
                            <TableCell ><span className="font-bold text-[16px]">Date Of Joining</span></TableCell>
                            <TableCell align="right"><span className="font-bold text-[16px]">Block</span></TableCell>
                        </TableRow>
                    </TableHead>

                        <TableBody>
                            {   rows.map((row) => (
                                <TableRow
                                    key={row.sno}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.sno}
                                    </TableCell>
                                    <TableCell component="th" onClick={()=> navigate(`/dj/${row.id}`)} scope="row"><span className='hover:cursor-pointer'>{row.name}</span></TableCell>
                                    <TableCell component="th" scope="row">{row.email}</TableCell>
                                    <TableCell >{row.doj}</TableCell>
                                    <TableCell align="right" onClick={() => {setId(row.id); setBlockOpen(true); setBlockStatus(row.block)}}><div className="hover:cursor-pointer"> { row.block==='true'? (<HowToRegIcon />) : (<BlockIcon />)}</div></TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>

                    </Table>
                </TableContainer>)
            }
            <Block blockOpen={blockOpen} setBlockOpen={setBlockOpen} id={id} blockUser={blockUser} blockStatus={blockStatus} user='dj'/>
            <FilterAdminModal isOpen={isOpen} setIsOpen={setIsOpen} handleFilter={filterData}/>
        </div>
    )
}
export default DjTable;