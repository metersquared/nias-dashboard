import React, { useState } from "react";
import moment from "moment";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  IconButton,
  Modal,
  Box,
  Button,
  TextField,
  Grow,
  Avatar,
} from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { dashboardTheme } from "../../dashboardTheme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const TrainingSessions = () => {
  const isMobile = useMediaQuery("(max-width:1620px)");
  // Sample session data
  const sessionData = [
    {
      id: 1,
      start: "2025-02-06T10:00:00",
      end: "2025-02-06T11:00:00",
      bookingStart: "2025-02-04T12:00:00",
      slots: 20,
      location: "Halle Rathenowerstr.",
      title: "Training",
    },
    {
      id: 2,
      start: "2025-02-07T16:00:00",
      end: "2025-02-07T17:00:00",
      bookingStart: "2025-02-06T08:00:00",
      slots: 20,
      location: "Halle Rathenowerstr.",
      title: "Free Play",
    },
    {
      id: 3,
      start: "2025-02-09T12:00:00",
      end: "2025-02-09T13:00:00",
      bookingStart: "2025-02-08T18:00:00",
      slots: 20,
      location: "Halle Rathenowerstr.",
      title: "Training",
    },
  ];

  const initialAttendees = [
    { name: "John Doe", sessionId: 1, avatar: "https://i.pravatar.cc/300" },
    { name: "Jane Smith", sessionId: 1, avatar: "https://i.pravatar.cc/300" },
    {
      name: "Alice Johnson",
      sessionId: 2,
      avatar: "https://i.pravatar.cc/300",
    },
  ];

  const [selectedSession, setSelectedSession] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf("isoWeek")
  );
  const [attendees, setAttendees] = useState(initialAttendees);
  const [modalOpen, setModalOpen] = useState(false);
  const [newAttendeeName, setNewAttendeeName] = useState("");

  // Helper to get 7 days starting from the provided day
  const getNext7Days = (weekStart) => {
    return Array.from({ length: 7 }, (_, i) =>
      weekStart.clone().add(i, "days")
    );
  };

  // Update the current week (next or previous)
  const changeWeek = (direction) => {
    const newWeekStart = currentWeekStart.clone().add(direction, "weeks");
    setCurrentWeekStart(newWeekStart);
  };

  const next7Days = getNext7Days(currentWeekStart);

  const getSessionsForDay = (day) => {
    return sessionData.filter((session) =>
      moment(session.start).isSame(day, "day")
    );
  };

  const getAttendeesForSession = (sessionId) =>
    attendees.filter((attendee) => attendee.sessionId === sessionId);

  // Open modal if booking is open
  const handleSessionClick = (session) => {
    const isBookingOpen = moment().isAfter(session.bookingStart);
    if (isBookingOpen) {
      setSelectedSession(session);
      setModalOpen(true);
    }
  };

  // Handle sign-up form submission
  const handleSignUp = (e) => {
    e.preventDefault();
    if (newAttendeeName.trim() !== "" && selectedSession) {
      const newAttendee = {
        name: newAttendeeName,
        sessionId: selectedSession.id,
      };
      setAttendees([...attendees, newAttendee]);
      setNewAttendeeName("");
    }
  };

  // Modal style
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)!important",
    width: isMobile ? 300 : 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
  };

  return (
    <ThemeProvider theme={dashboardTheme}>
      <GridWrapper>
        <Grid container sx={{ justifyContent: isMobile ? "center" : null }}>
          <Typography
            typography="h2"
            color={dashboardTheme.palette.primary.main}
            marginBottom="10px"
          >
            Badminton
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {/* Week Navigation */}
          <Grid item xs={12}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
                borderRadius: "8px",
                mb: 2,
              }}
            >
              <IconButton
                aria-label="Previous Week"
                color="primary"
                onClick={() => changeWeek(-1)}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="primary"
                sx={{ alignSelf: "center", mx: 2 }}
              >
                {`${currentWeekStart.format("MM/DD")} - ${currentWeekStart
                  .clone()
                  .add(6, "days")
                  .format("MM/DD")}`}
              </Typography>
              <IconButton
                aria-label="Next Week"
                color="primary"
                onClick={() => changeWeek(1)}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={2}>
              {next7Days.map((day) => (
                <Grid
                  item
                  xs={isMobile ? 12 : 12 / 7}
                  key={day.format("YYYY-MM-DD")}
                >
                  <Typography
                    fontWeight="bold"
                    variant="h6"
                    align="center"
                    color="primary"
                    sx={{ mb: 2 }}
                  >
                    {day.format("ddd")}
                  </Typography>
                  {getSessionsForDay(day).length === 0 ? (
                    <Typography align="center" color="textSecondary">
                      No sessions
                    </Typography>
                  ) : (
                    getSessionsForDay(day).map((session) => {
                      const isBookingOpen = moment().isAfter(
                        session.bookingStart
                      );
                      return (
                        <Card
                          key={session.id}
                          sx={{
                            mb: 2,
                            cursor: isBookingOpen ? "pointer" : "not-allowed",
                            borderRadius: "10px",
                            backgroundColor: isBookingOpen
                              ? dashboardTheme.palette.primary.main
                              : dashboardTheme.palette.primary.light,
                          }}
                          onClick={() => handleSessionClick(session)}
                        >
                          <CardContent>
                            <Typography
                              fontWeight="bold"
                              color="white"
                              variant="body1"
                            >
                              {session.title}
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                            >
                              <LocationOnIcon
                                sx={{ color: "white", width: "20px" }}
                              />
                              <Typography
                                marginX="5px"
                                color="white"
                                variant="body2"
                              >
                                {session.location}
                              </Typography>
                            </Box>
                            {isBookingOpen ? (
                              <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                              >
                                <AccessTimeFilledIcon
                                  sx={{ color: "white", width: "20px" }}
                                />
                                <Typography
                                  marginX="5px"
                                  color="white"
                                  variant="body2"
                                >
                                  {moment(session.start).format("HH:mm")} -{" "}
                                  {moment(session.end).format("HH:mm")}
                                </Typography>
                                <PeopleIcon
                                  sx={{ color: "white", width: "20px" }}
                                />
                                <Typography
                                  marginX="5px"
                                  color="white"
                                  fontWeight="bold"
                                  variant="body2"
                                >
                                  {`${
                                    getAttendeesForSession(session.id).length
                                  }/${session.slots}`}
                                </Typography>
                              </Box>
                            ) : (
                              <Typography
                                color="white"
                                fontWeight="bold"
                                variant="body2"
                              >{`Bookable from ${moment(
                                session.bookingStart
                              ).format("DD/MM, HH:mm")}`}</Typography>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Modal with Grow Transition */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          closeAfterTransition
        >
          <Grow in={modalOpen} timeout={500}>
            <Box sx={modalStyle}>
              {selectedSession && (
                <>
                  <Typography
                    align="center"
                    variant="h5"
                    fontWeight="bold"
                    color="primary"
                    component="h2"
                  >
                    {selectedSession.title}{" "}
                    {moment(selectedSession.start).format("MMM D, YYYY")}
                  </Typography>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <LocationOnIcon
                      sx={{
                        color: dashboardTheme.palette.primary.main,
                        width: "20px",
                      }}
                    />
                    <Typography
                      marginLeft="5px"
                      marginRight="20px"
                      color="primary"
                      variant="body2"
                    >
                      {selectedSession.location}
                    </Typography>
                    <AccessTimeFilledIcon
                      sx={{
                        color: dashboardTheme.palette.primary.main,
                        width: "20px",
                      }}
                    />
                    <Typography marginX="5px" color="primary" variant="body2">
                      {moment(selectedSession.start).format("HH:mm")} -{" "}
                      {moment(selectedSession.end).format("HH:mm")}
                    </Typography>
                  </Box>
                  <Typography color="primary" sx={{ mt: 2, mb: 1 }}>
                    Attendees
                  </Typography>
                  {getAttendeesForSession(selectedSession.id).length > 0 ? (
                    <ul>
                      {getAttendeesForSession(selectedSession.id).map(
                        (attendee, index) => (
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            marginY="5px"
                          >
                            <Avatar src={attendee.avatar} />
                            <Typography marginLeft="5px">
                              {attendee.name}
                            </Typography>
                          </Box>
                        )
                      )}
                    </ul>
                  ) : (
                    <Typography>No attendees yet.</Typography>
                  )}
                  {/* Simple sign-up form */}
                  <Box component="form" onSubmit={handleSignUp} sx={{ mt: 2 }}>
                    <TextField
                      label="Your Name"
                      value={newAttendeeName}
                      onChange={(e) => setNewAttendeeName(e.target.value)}
                      fullWidth
                      required
                    />
                    <Grid xs={12} display={"flex"} justifyContent={"center"}>
                      <IconButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                          mt: 1,
                        }}
                      >
                        <EventAvailableIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => setModalOpen(false)}
                        variant="contained"
                        color="primary"
                        sx={{
                          mt: 1,
                        }}
                      >
                        <EventBusyIcon />
                      </IconButton>
                    </Grid>
                  </Box>
                </>
              )}
            </Box>
          </Grow>
        </Modal>
      </GridWrapper>
    </ThemeProvider>
  );
};

export default TrainingSessions;
