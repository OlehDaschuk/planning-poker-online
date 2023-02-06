import React, { useState } from 'react';
import {
  Avatar,
  Divider,
  Menu,
  MenuItem,
  Button,
  ListItemIcon,
  ListItemText,
  Box,
  Switch,
} from '@mui/material';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { ChevronDownIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

import { auth } from '@/firebase';
import { useStore } from '@/hooks/useStore';

export const UserProfileBtn: React.FC = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const modalsHandlerStore = useStore((s) => s.modalsHandlerStore);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        startIcon={
          <Avatar sx={{ width: 32, height: 32 }} src={user?.photoURL!} alt="user photo">
            {user?.displayName!.charAt(0)}
          </Avatar>
        }
        endIcon={<ChevronDownIcon width="16" />}
        onClick={(e) => setAnchorEl(e.currentTarget)}>
        {user!.displayName}
      </Button>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        onClose={() => setAnchorEl(null)}
        sx={{ borderRadius: '8px' }}
        MenuListProps={{ sx: { width: '300px' } }}>
        <div className="pl-6 h-[120px] flex items-center">
          <Avatar sx={{ width: 64, height: 64 }} src={user?.photoURL!} alt="user photo">
            {user?.displayName!.charAt(0)}
          </Avatar>

          <div className="pl-4">{user!.displayName}</div>
        </div>

        <Box sx={{ px: '1rem', mb: '1rem' }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => {
              setAnchorEl(null);
              modalsHandlerStore.setOpenPricingModal(true);
            }}>
            Start free trial
          </Button>
        </Box>

        <Divider />
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            modalsHandlerStore.setOpenPricingModal(true);
          }}>
          <ListItemIcon>
            <img src="/user-profile/my-games.svg" alt="" />
          </ListItemIcon>
          <ListItemText>My games</ListItemText>

          <span>PRO</span>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <img src="/user-profile/spectator-mode.svg" alt="" />
          </ListItemIcon>
          <ListItemText>Spectator mode</ListItemText>

          <Switch />
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            signOut();
          }}>
          <ListItemIcon>
            <ArrowRightOnRectangleIcon />
          </ListItemIcon>
          <ListItemText>Sign out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
