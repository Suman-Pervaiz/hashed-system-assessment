"use client";

import { Modal, Button, TextInput } from "@mantine/core";
import { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
};

const EditUserModal = ({ opened, onClose, onSubmit, user }) => {
  const [form, setForm] = useState(emptyForm);
  const [prevUserId, setPrevUserId] = useState(null);

  //id must be available when modal open
  if (opened && user && user.id !== prevUserId) {
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });

    setPrevUserId(user.id);
  }


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  // close
  const handleClose = () => {
    setForm(emptyForm);
    setPrevUserId(null);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Edit User"
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
          placeholder="Enter name"
        />

       

        <TextInput
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
        />

        <TextInput
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter phone"
        />

        <Button fullWidth mt="md" onClick={handleSubmit}>
          Update User
        </Button>
      </div>
    </Modal>
  );
};

export default EditUserModal;