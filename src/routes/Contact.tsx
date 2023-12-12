import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";

const MyContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const MyForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  backgroundColor: "white", 
  padding: theme.spacing(3),
  borderRadius: "8px", 
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
}));

const MyButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Isomer",
          from_email: form.email,
          to_email: "isomer008@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <MyContainer>
      <Typography variant="h4" component="h1" align="center">
        Contact Us
      </Typography>
      <MyForm onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Your Name"
          variant="outlined"
          fullWidth
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Your Email"
          variant="outlined"
          fullWidth
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          name="message"
          label="Your Message"
          variant="outlined"
          fullWidth
          multiline
          rows={7}
          value={form.message}
          onChange={handleChange}
        />
        <MyButton
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </MyButton>
      </MyForm>
      <br />
      <Typography variant="body1" align="center">
        You can also reach us by phone, email, or at the address provided.
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        <Grid item>
          <Typography variant="body1">Phone: 111-222-4444</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">Email: xyzcryptohub@cryptohub.com</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">Address: 123 New ST</Typography>
        </Grid>
      </Grid>
    </MyContainer>
  );
}

export default Contact;
