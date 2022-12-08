import React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import SignInButton from './SignInButton';
import RegisterButton from './RegisterButton';

export default function GuestButton(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="guest-button"
                variant="contained"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Guest
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'guest-button',
                }}
                style={{
                    zIndex: 1401
                }}
            >
                <SignInButton/>
                <RegisterButton/>
            </Menu>
        </div>
    );
}
