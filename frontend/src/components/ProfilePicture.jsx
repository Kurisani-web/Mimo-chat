import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  Box,
} from "@chakra-ui/react";

const ProfilePicture = ({ isOpen, onClose, user }) => {
  if (!user) return null; // Handle case where no user data is passed

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" alignItems="center" p={4}>
            {/* Username */}
            <Box fontWeight="bold" fontSize="lg" textAlign="center" mb={4} display="inline-flex" alignItems="center">
                {user.username}
                {user?.email === 'kurisanim2@gmail.com' && (
                    <Image src='/verified.png' w={4} h={4} ml={1} my={1} alt="Verified badge" />
                )}
            </Box>


          {/* Profile Picture */}
          <Image
            src={user.profilePic || "https://www.freepik.com/premium-vector/free-vector-user-icon-simple-line_51203397.htm"}
            alt={`${user.name}'s profile picture`}
            borderRadius="md"
            maxW="80%" // Restrict width to 80% of the modal width
            maxH="50vh"
            boxShadow="lg"
            mb={4}
          />

          {/* Email and Bio */}
          <Box textAlign="center">
            <Box fontSize="md" color="gray.500">
              {user.email}
            </Box>
            <Box mt={3} fontSize="sm" color="gray.600">
              {user.bio || "This user hasn't added a bio yet."}
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfilePicture;
