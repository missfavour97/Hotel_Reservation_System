import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Paper,
  Stack,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUsers } from "../services/authService";
import {
  createRoom,
  deleteRoom,
  getRooms,
  updateRoom,
  uploadRoomImage,
} from "../services/roomService";
import {
  getBookings,
  updateBookingStatus,
} from "../services/bookingService";
import {
  getComplaintRequests,
  updateComplaintStatus,
} from "../services/complaintService";
import { formatCurrency, formatDate } from "../utils/format";
import { getRoomVisuals } from "../data/roomAssets";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const bookingStatuses = ["Pending", "Confirmed", "Cancelled"];
const requestStatuses = ["Open", "In Review", "Resolved"];

const defaultRoom = {
  title: "",
  description: "",
  price: 250,
  imageUrl: "",
  capacity: 2,
  bedType: "Queen Bed",
  size: "28 m2",
  amenities: "Fast Wi-Fi,Smart TV,Work desk,Air conditioning,Private bathroom",
  isFeatured: false,
};

function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [tab, setTab] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomDraft, setRoomDraft] = useState(defaultRoom);
  const [roomImagePreview, setRoomImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const loadDashboard = useCallback(async () => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [roomsData, bookingsData, requestsData, usersData] = await Promise.all([
        getRooms(),
        getBookings(),
        getComplaintRequests(),
        getUsers(),
      ]);

      setRooms(roomsData);
      setBookings(bookingsData);
      setRequests(requestsData);
      setUsers(usersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const stats = useMemo(
    () => [
      { label: "Rooms", value: rooms.length },
      { label: "Bookings", value: bookings.length },
      { label: "Members", value: users.length },
      { label: "Open Requests", value: requests.filter((item) => item.status !== "Resolved").length },
    ],
    [rooms.length, bookings.length, users.length, requests]
  );

  function openRoomDialog(room = null) {
    setEditingRoom(room);
    setRoomDraft(room || defaultRoom);
    setRoomImagePreview(room ? getRoomVisuals(room).image : "");
    setRoomDialogOpen(true);
  }

  function closeRoomDialog() {
    setRoomDialogOpen(false);
    setEditingRoom(null);
    setRoomDraft(defaultRoom);
    setRoomImagePreview("");
    setUploadingImage(false);
  }

  function handleRoomChange(event) {
    const { name, value, checked, type } = event.target;
    setRoomDraft({
      ...roomDraft,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleRoomImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploadingImage(true);
      const previewUrl = URL.createObjectURL(file);
      setRoomImagePreview(previewUrl);

      const uploadedImage = await uploadRoomImage(file);
      setRoomDraft((currentDraft) => ({
        ...currentDraft,
        imageUrl: uploadedImage.imageUrl,
      }));
    } catch (err) {
      setError(err.message);
      setRoomImagePreview("");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  }

  async function handleRoomSubmit(event) {
    event.preventDefault();
    const payload = {
      ...roomDraft,
      price: Number(roomDraft.price),
      capacity: Number(roomDraft.capacity),
    };

    try {
      if (editingRoom) {
        await updateRoom(editingRoom.id, { ...payload, id: editingRoom.id });
      } else {
        await createRoom(payload);
      }

      closeRoomDialog();
      await loadDashboard();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteRoom(id) {
    if (!window.confirm("Delete this room?")) {
      return;
    }

    try {
      await deleteRoom(id);
      await loadDashboard();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleBookingStatus(id, status) {
    try {
      await updateBookingStatus(id, status);
      await loadDashboard();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleRequestStatus(id, status) {
    try {
      await updateComplaintStatus(id, status);
      await loadDashboard();
    } catch (err) {
      setError(err.message);
    }
  }

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert
          severity="info"
          action={
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          }
        >
          Please log in with the admin account.
        </Alert>
      </Container>
    );
  }

  if (!isAdmin) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="warning">This page is available to admins only.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: { xs: 4, md: 6 }, mb: 8 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h3">Admin Dashboard</Typography>
          <Typography color="text.secondary">
            Manage bookings, rooms, members, and guest messages.
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => openRoomDialog()}>
          Add Room
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
              mb: 3,
            }}
          >
            {stats.map((stat) => (
              <Paper
                key={stat.label}
                sx={{ p: 2.5, border: 1, borderColor: "divider" }}
                elevation={0}
              >
                <Typography color="text.secondary" variant="body2">
                  {stat.label}
                </Typography>
                <Typography variant="h4">{stat.value}</Typography>
              </Paper>
            ))}
          </Box>

          <Paper sx={{ border: 1, borderColor: "divider" }} elevation={0}>
            <Tabs
              value={tab}
              onChange={(_, value) => setTab(value)}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Bookings" />
              <Tab label="Rooms" />
              <Tab label="Requests" />
              <Tab label="Users" />
            </Tabs>

            <Box sx={{ p: { xs: 1.5, md: 2.5 } }}>
              {tab === 0 && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Guest</TableCell>
                        <TableCell>Room</TableCell>
                        <TableCell>Dates</TableCell>
                        <TableCell>Guests</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <Typography fontWeight={700}>{booking.fullName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {booking.email}
                            </Typography>
                          </TableCell>
                          <TableCell>{booking.roomTitle}</TableCell>
                          <TableCell>
                            {formatDate(booking.checkInDate)} to {formatDate(booking.checkOutDate)}
                          </TableCell>
                          <TableCell>{booking.guests}</TableCell>
                          <TableCell>
                            <TextField
                              select
                              size="small"
                              value={booking.status}
                              onChange={(event) =>
                                handleBookingStatus(booking.id, event.target.value)
                              }
                            >
                              {bookingStatuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </TextField>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {tab === 1 && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Room</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Capacity</TableCell>
                        <TableCell>Featured</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rooms.map((room) => (
                        <TableRow key={room.id}>
                          <TableCell>
                            <Typography fontWeight={700}>{room.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {room.bedType} - {room.size}
                            </Typography>
                          </TableCell>
                          <TableCell>{formatCurrency(room.price)}</TableCell>
                          <TableCell>{room.capacity}</TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={room.isFeatured ? "Yes" : "No"}
                              color={room.isFeatured ? "primary" : "default"}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                              <Button size="small" onClick={() => openRoomDialog(room)}>
                                Edit
                              </Button>
                              <Button
                                size="small"
                                color="error"
                                onClick={() => handleDeleteRoom(room.id)}
                              >
                                Delete
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {tab === 2 && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Guest</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {requests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <Typography fontWeight={700}>{request.fullName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {request.email}
                            </Typography>
                          </TableCell>
                          <TableCell>{request.category}</TableCell>
                          <TableCell>
                            <Typography>{request.subject}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {request.message}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <TextField
                              select
                              size="small"
                              value={request.status}
                              onChange={(event) =>
                                handleRequestStatus(request.id, event.target.value)
                              }
                            >
                              {requestStatuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </TextField>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {tab === 3 && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Joined</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>{member.fullName}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              color={member.role === "Admin" ? "secondary" : "default"}
                              label={member.role}
                            />
                          </TableCell>
                          <TableCell>{formatDate(member.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Paper>
        </>
      )}

      <Dialog open={roomDialogOpen} onClose={closeRoomDialog} maxWidth="md" fullWidth>
        <Box component="form" onSubmit={handleRoomSubmit}>
          <DialogTitle>{editingRoom ? "Edit Room" : "Add Room"}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Title"
                name="title"
                value={roomDraft.title}
                onChange={handleRoomChange}
                required
              />
              <TextField
                label="Description"
                name="description"
                value={roomDraft.description}
                onChange={handleRoomChange}
                multiline
                minRows={3}
                required
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={roomDraft.price}
                  onChange={handleRoomChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Capacity"
                  name="capacity"
                  type="number"
                  value={roomDraft.capacity}
                  onChange={handleRoomChange}
                  fullWidth
                  required
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Bed Type"
                  name="bedType"
                  value={roomDraft.bedType}
                  onChange={handleRoomChange}
                  fullWidth
                />
                <TextField
                  label="Size"
                  name="size"
                  value={roomDraft.size}
                  onChange={handleRoomChange}
                  fullWidth
                />
              </Stack>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "220px 1fr" },
                  gap: 2,
                  alignItems: "center",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    borderRadius: 1,
                    overflow: "hidden",
                    bgcolor: "background.default",
                    border: 1,
                    borderColor: "divider",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {roomImagePreview ? (
                    <Box
                      component="img"
                      src={roomImagePreview}
                      alt="Room preview"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Typography color="text.secondary" variant="body2">
                      No image selected
                    </Typography>
                  )}
                </Box>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Room Image
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upload a JPG, PNG, or WebP image. This will be shown on the
                    room listing and details page.
                  </Typography>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    disabled={uploadingImage}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    {uploadingImage ? "Uploading..." : "Upload Image"}
                    <input
                      hidden
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleRoomImageChange}
                    />
                  </Button>
                  {roomDraft.imageUrl && (
                    <Typography variant="caption" color="text.secondary">
                      Image ready for this room.
                    </Typography>
                  )}
                </Stack>
              </Box>
              <TextField
                label="Amenities"
                name="amenities"
                value={roomDraft.amenities}
                onChange={handleRoomChange}
                helperText="Separate amenities with commas"
                multiline
                minRows={2}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(roomDraft.isFeatured)}
                    onChange={handleRoomChange}
                    name="isFeatured"
                  />
                }
                label="Featured room"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeRoomDialog}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={uploadingImage}>
              {uploadingImage ? "Uploading..." : "Save"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
}

export default AdminDashboard;
