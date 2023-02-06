import React, { useState } from 'react';
import { Avatar, Divider, Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@mui/material';
import { ChevronDownIcon, Cog6ToothIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import { useStore } from '@/hooks/useStore';
import { StyledModal } from '../shared/StyledModal';
import { UpdateGameData } from './forms/UpdateGameData';

export const GameProfileBtn: React.FC = () => {
  const gameSessionStore = useStore((s) => s.gameSessionStore);

  const [openGameSettings, setOpenGameSettings] = useState(false);
  const [openVotingHistory, setOpenVotingHistory] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        endIcon={<ChevronDownIcon width="16" />}
        onClick={(e) => setAnchorEl(e.currentTarget)}>
        asdfas
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
        sx={{ borderRadius: '8px' }}>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setOpenGameSettings(true);
          }}>
          <ListItemIcon>
            <Cog6ToothIcon width="20" />
          </ListItemIcon>
          <ListItemText>Game Setings</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setOpenVotingHistory(true);
          }}>
          <ListItemIcon>
            <DocumentTextIcon width="20" />
          </ListItemIcon>
          <ListItemText>Voting History</ListItemText>
        </MenuItem>
      </Menu>

      <StyledModal
        title="Game settings"
        open={openGameSettings}
        hideModal={() => setOpenGameSettings(false)}>
        <UpdateGameData />
      </StyledModal>
    </>
  );
};
