import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

const useAvatarClick = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProfilePic, setSelectedProfilePic] = useState(null);

  const handleAvatarClick = (user) => {
    setSelectedProfilePic(user.profilePic || "https://bit.ly/broken-link");
    onOpen();
  };

  return { isOpen, onOpen, onClose, selectedProfilePic, handleAvatarClick };
};

export default useAvatarClick;
