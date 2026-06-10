"use client";

import { Modal, Button, TextInput } from "@mantine/core";
import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
};

const AddUserModal = ({ opened, onClose, onSubmit }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  // validation for all fields while adding user
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^(\d{11}|\d{13})$/;
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Phone must be 11 or 13 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    
    if (name === "phone") {
      newValue = value.replace(/\D/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // submit
  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit(form);

    //reset after submitt
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  // close
  const handleClose = () => {
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Add New User"
      size="md"
      centered
      radius="lg"
      padding="xl"
    >
      <div className="space-y-4">

        <TextInput
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="What should we call you?"
        />

        
        <TextInput
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="How we'll contact you (email address)"
        />

        <TextInput
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="We’d love to know your number (e.g. 03001234567)"
        />

        <Button fullWidth mt="md" onClick={handleSubmit}>
          Create User
        </Button>
      </div>
    </Modal>
  );
};

export default AddUserModal;