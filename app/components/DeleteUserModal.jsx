"use client";

import { Modal, Button } from "@mantine/core";

const DeleteUserModal = ({ opened, onClose, onConfirm, user }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Delete User"
      size="sm"
      centered
      radius="lg"
      padding="xl"
    >
      <p className="text-gray-600 text-sm">
        Are you sure you want to delete{" "}
        <span className="font-semibold">{user?.name}</span>?
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="light" onClick={onClose}>
          Cancel
        </Button>

        <Button color="red" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;