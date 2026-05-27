import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import {
  createComplaintRequest,
  getUserComplaintRequests,
} from "../services/complaintService";
import { formatDate } from "../utils/format";

const categories = ["Complaint", "Special Request", "General Inquiry"];

function Requests() {
  const { user } = useAuth();
  const userId = user?.id;
  const userFullName = user?.fullName;
  const userEmail = user?.email;
  const [formData, setFormData] = useState({
    fullName: userFullName || "",
    email: userEmail || "",
    category: "General Inquiry",
    subject: "",
    message: "",
  });
  const [requests, setRequests] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadRequests = useCallback(async () => {
    if (!userId) {
      return;
    }

    try {
      setRequests(await getUserComplaintRequests(userId));
    } catch (err) {
      setError(err.message);
    }
  }, [userId]);

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      fullName: userFullName || current.fullName,
      email: userEmail || current.email,
    }));
    loadRequests();
  }, [loadRequests, userEmail, userFullName]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSubmitting(true);
      await createComplaintRequest({
        ...formData,
        userId: userId || null,
      });
      setSuccess("Your message was submitted.");
      setFormData({
        fullName: userFullName || "",
        email: userEmail || "",
        category: "General Inquiry",
        subject: "",
        message: "",
      });
      await loadRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 6 }, mb: 8 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="start"
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Complaints and Requests
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Send a message to the hotel desk for service issues, special
            arrangements, or general questions.
          </Typography>

          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: { xs: 2.5, md: 3 }, border: 1, borderColor: "divider" }}
            elevation={0}
          >
            <Stack spacing={2.5}>
              {success && <Alert severity="success">{success}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                minRows={5}
                required
              />
              <Button type="submit" variant="contained" size="large" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </Stack>
          </Paper>
        </Box>

        <Box sx={{ width: { xs: "100%", md: 380 } }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            My Messages
          </Typography>
          {!user ? (
            <Alert severity="info">Log in to track submitted messages.</Alert>
          ) : requests.length === 0 ? (
            <Alert severity="info">No messages submitted yet.</Alert>
          ) : (
            <Stack spacing={2}>
              {requests.map((request) => (
                <Paper
                  key={request.id}
                  sx={{ p: 2.5, border: 1, borderColor: "divider" }}
                  elevation={0}
                >
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip size="small" label={request.category} />
                    <Chip size="small" color="primary" label={request.status} />
                  </Stack>
                  <Typography variant="subtitle1">{request.subject}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(request.createdAt)}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default Requests;
