"use client";

import Modal from "@/components/ui/modal/Modal";
import { useEffect, useState } from "react";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal
        title="Test Modal"
        description="Description"
        isOpen
        onChange={() => {}}
      >
        onChange
      </Modal>
    </>
  );
}
