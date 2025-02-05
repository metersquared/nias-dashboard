import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import { EditCalendar } from "@mui/icons-material";

export const navbarItems = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: "Home",
    route: "home",
  },
  {
    id: 1,
    icon: <EditCalendar />,
    label: "Training Sessions",
    route: "training-sessions",
  },
  {
    id: 2,
    icon: <PeopleIcon />,
    label: "Authentication",
    route: "authentication",
  },
];
