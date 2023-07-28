import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';


const AdminNav = (props) => {
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div
                className={`bg-blue-darkest top-0 v-screen text-white  
     w-[100%] h-[8em] z-30`}
            >
                <div className="container">
                    <div className="px-[42px] pt-[29px] select-none flex justify-between items-center">
                        <div onClick={() => navigate('/admin-dashboard')}
                            className="w-[71px] h-[71px] bg-blue-light rounded-full 
                    flex flex-col justify-center items-center text-[1.5rem] leading-5 text-white"
                        >
                            <div className="space-x-1">
                                <span>S</span>
                                <span>P</span>
                            </div>
                            <div className="space-x-1">
                                <span>O</span>
                                <span>T</span>
                            </div>
                        </div>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <img
                                    className="rounded-full cursor-pointer w-[3.5rem] h-[3.5rem]"
                                    src="/assets/profile/profile.png"
                                    alt="current user profile"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    width:250,
                                    height: 150,
                                    '& .MuiAvatar-root': {
                                        width: 60,
                                        height: 60,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={()=>{
                                const load= props.showDashboard ? '/admin-dashboard' : '/profile'
                                navigate(load)
                                }}
                                
                                >
                                <Avatar />{ props.showDashboard ?<>Dashboard</>  : <>Profile</>}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={logOut}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
    )
}

export default AdminNav;
