import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  List,
  ListItem,
  Avatar,
  Text,
  Spinner,
  Flex,
  Divider,
  useColorMode,
} from "@chakra-ui/react";
import ProfilePicture from "./ProfilePicture";
import useAvatarClick from "../hooks/useAvatarClick"; // Import the custom hook

const Followers = ({ user }) => {
  const { userId } = useParams(); // Get the user ID from the URL
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const {
    isOpen,
    onOpen,
    onClose,
    selectedProfilePic,
    selectedBio,
    handleAvatarClick,
  } = useAvatarClick(); // Using the custom hook

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        // Fetch the followers of the user whose userId is in the URL
        const response = await fetch(`/api/users/profile/followers/${userId}`);
        const data = await response.json();

        if (data.error) {
          setError(data.error);
          console.error("Error:", data.error);
          return;
        }

        if (Array.isArray(data.followers)) {
          setFollowers(data.followers); // Access the followers array
        } else {
          setError("Expected 'followers' to be an array.");
          console.error(
            "Expected 'followers' to be an array, but got:",
            data.followers
          );
        }
      } catch (error) {
        setError("Error fetching followers: " + error.message);
        console.error("Error fetching followers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [userId]); // Depend on userId from URL

  return (
    <Container maxW="container.md" py={1}>
      <Box textAlign="center">
        <Heading as="h2" size="lg" mb={6}>
          Followers
        </Heading>
        <Divider my={2} />
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Spinner size="xl" color="teal.500" />
          </Box>
        ) : error ? (
          <Text color="red.500" fontSize="lg">
            {error}
          </Text>
        ) : (
          <List spacing={4}>
            {followers.length > 0 ? (
              followers.map((follower) => (
                <ListItem
                  key={follower._id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={4}
                  borderRadius="md"
                  boxShadow="sm"
                  _hover={{
                    boxShadow: "md",
                    bg: colorMode === "dark" ? "gray.900" : "gray.300",
                  }}
                >
                  <Flex alignItems="center" gap={4}>
                    <Avatar
                      name={follower.name}
                      src={follower.profilePic}
                      size="md"
                      cursor="pointer"
                      onClick={() => handleAvatarClick(follower)} // Trigger avatar click
                    />
                    <Box
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/${follower.username}`);
                      }}
                      cursor={"pointer"}
                    >
                      <Flex direction="column" align="flex-start">
                        <Text fontWeight="bold" fontSize="md">
                          {follower.name}
                        </Text>
                        <Text color="gray.600" fontSize="sm" mt={1}>
                          @{follower.username}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </ListItem>
              ))
            ) : (
              <Text>No followers yet.</Text>
            )}
          </List>
        )}
      </Box>

      {/* Profile Picture Modal */}
      <ProfilePicture
        isOpen={isOpen}
        onClose={onClose}
        user={{ profilePic: selectedProfilePic, bio: selectedBio }} // Pass bio to the modal
      />
    </Container>
  );
};

export default Followers;
