'use client';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { Avatar, IconButton, ListSubheader } from '@mui/material';
import { Students, Student } from '../../app/types/types';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import ScrollableAssignmetnsList from './ScrollableAssignmentsList';

import AboutIcon from '@mui/icons-material/AccountCircle';
import ThreeIcon from '@mui/icons-material/ThreeDRotationRounded';
import MapIcon from '@mui/icons-material/PublicRounded';
import BIMIcon from '@mui/icons-material/MapsHomeWorkRounded';
import FinalIcon from '@mui/icons-material/SportsScoreRounded';

interface Props {
  students: Students;
}

export default function StudentsList({ students }: Props) {
  const path = usePathname();

  return (
    <List
      sx={{
        width: '60%',
        minWidth: 800,
        bgcolor: 'background.paper',
        maxHeight: 500,
        overflowY: 'auto',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<ListSubheader component="div">Students List</ListSubheader>}
    >
      {students.map((student: Student, index) => (
        <div key={index} title={student.username}>
          <ListItemButton
            sx={{ borderBottom: 1, borderTop: 1, borderColor: '#ddd' }}
          >
            <ListItemIcon>
              <Link href={`${path}/${student.username}/final`}>
                <IconButton>
                  <Avatar
                    src={`${path}/${student.username}/avatar.jpg`}
                    sx={{ width: 30, height: 30 }}
                  />
                </IconButton>
              </Link>
            </ListItemIcon>
            <ListItemText
              primary={`${student.firstName} ${student.lastName}`}
            />
            <Link href={`${path}/${student.username}/about`}>
              <IconButton title="About">
                <AboutIcon />
              </IconButton>
            </Link>
            <Link href={`${path}/${student.username}/three`}>
              <IconButton title="Three">
                <ThreeIcon />
              </IconButton>
            </Link>
            <Link href={`${path}/${student.username}/map`}>
              <IconButton title="Map">
                <MapIcon />
              </IconButton>
            </Link>
            <Link href={`${path}/${student.username}/bim`}>
              <IconButton title="BIM">
                <BIMIcon />
              </IconButton>
            </Link>
          </ListItemButton>
        </div>
      ))}
    </List>
  );
}
