import { Avatar } from "@chakra-ui/avatar";
import { Box, Divider, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import {
  Button,
  textDecoration,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";
import useAvatarClick from "../hooks/useAvatarClick"; // Import the custom hook
import ProfilePicture from "./ProfilePicture";
import { FaShare, FaSignOutAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

const UserHeader = ({ user }) => {
  const { isOpen, onOpen, onClose, selectedProfilePic, handleAvatarClick } =
    useAvatarClick();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom); // logged-in user
  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);
  const navigate = useNavigate();
  const showToast = useShowToast();
  const logout = useLogout();

  const handleClick = () => {
    if (user && user._id === currentUser?._id) {
      navigate(`/followers/${user._id}`); // Navigate to the followers page for the logged-in user
    } else {
      // Play notification sound
      {/*const audio = new Audio("/sounds/software.wav"); // Path to your sound file
      audio.volume = 0.1;
      audio.play().catch((error) => {
        console.error("Failed to play sound:", error);
      });*/}

      // Show the toast
      toast({
        title: "Restricted Access",
        status: "warning",
        description: "You can only view your own followers.",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Link Copied.",
        status: "success",
        description: "Profile link copied.",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const copyAppURL = () => {
    navigator.clipboard
      .writeText("https://mimo-fffz.onrender.com")
      .then(() => {
        toast({
          title: "Link copied.",
          description: "App link has been copied to your clipboard.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Failed to copy the URL.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const shareProfile = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Check out ${user.username}'s profile`, // Descriptive title for the user's profile
          url: `${window.location.origin}/${user.username}`, // Share the user's profile URL
        });
        showToast("Success", "Profile link shared successfully", "success");
      } else {
        // Fallback if Web Share API isn't supported (e.g., copy the URL to clipboard)
        copyURL();
      }
    } catch (error) {
      showToast("Error", "Failed to share profile link", "error");
    }
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>@{user.username}</Text>
            <Text
              as="span" // Use span instead of anchor tag to handle click events
              onClick={copyAppURL} // Trigger the copy function on click
              fontSize={"xs"}
              bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
              color={colorMode === "light" ? "gray.dark" : "gray.light"}
              p={1}
              borderRadius={"full"}
              _hover={{
                textDecoration: "underline",
                bg: colorMode === "dark" ? "gray.700" : "gray.400",
              }} // Adds hover effect
              cursor="pointer" // Change cursor to pointer for better UX
            >
              mimo.com
            </Text>
          </Flex>
        </Box>

        {/* Avatar */}
        <Box
          onClick={() => handleAvatarClick(user)}
          cursor="pointer"
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.2s ease-in-out"
        >
          <Avatar
            name={user.name}
            src={user.profilePic || "https://bit.ly/broken-link"}
            size={{ base: "md", md: "xl" }}
          />
        </Box>

        {/* Profile Picture Modal */}
        <ProfilePicture isOpen={isOpen} onClose={onClose} user={user} />
      </Flex>

      <Text>{user.bio}</Text>

      {currentUser?._id === user._id && (
        <Link as={RouterLink} to="/update">
          <Button
            size={"sm"}
            //border={colorMode === "light" ? "1px solid #ccc" : ""}
            borderRadius="4px"
            px={2}
            py={1}
            bgColor={colorMode === "light" ? "gray.200" : ""}
          >
            Update Profile
          </Button>
        </Link>
      )}

      {currentUser?._id !== user._id && (
        <Button
          size={"sm"}
          onClick={handleFollowUnfollow}
          isLoading={updating}
          border={colorMode === "light" ? "1px solid #ccc" : ""}
          borderRadius="4px"
          px={2}
          py={1}
        >
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color="gray.light">
            <Button
              variant="unstyled"
              color={colorMode === "dark" ? "#00FFFF" : "teal.400"}
              _active={{ color: "gray.700" }}
              //border={colorMode === "light" ? "1px solid #ccc" : ""}
              borderRadius="4px"
              bgColor={colorMode === "light" ? "gray.200" : ""}
              px={2}
              py={1}
              onClick={handleClick} // Only trigger when condition is true
              disabled={user?._id !== currentUser?._id} // Disable if not viewing own followers
            >
              {user?.followers.length} followers
            </Button>
          </Text>

          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"} />
          <Button
            variant="unstyled"
            color={colorMode === "dark" ? "#00FFFF" : "teal.400"}
            _active={{ color: "gray.700" }}
            //border={colorMode === "light" ? "1px solid #ccc" : ""}
            borderRadius="4px"
            bgColor={colorMode === "light" ? "gray.200" : ""}
            px={2}
            py={1}
          >
            {user.following.length} following
          </Button>
        </Flex>

        <Flex>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={colorMode === "dark" ? "gray.dark" : "gray.300"}>
                  <MenuItem
                    _hover={{
                      bg: colorMode === "dark" ? "gray.700" : "gray.500",
                    }}
                    bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                    onClick={copyURL}
                  >
                    <IoCopyOutline size={20} style={{ marginRight: "12px" }} />
                    Copy link
                  </MenuItem>
                  <MenuItem
                    _hover={{
                      bg: colorMode === "dark" ? "gray.700" : "gray.500",
                    }}
                    bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                    onClick={shareProfile} // Use sharePost here
                  >
                    <FaShare size={20} style={{ marginRight: "12px" }} />
                    Share Profile
                  </MenuItem>
                  <Link as={RouterLink} to="/update">
                    <MenuItem
                      _hover={{
                        bg: colorMode === "dark" ? "gray.700" : "gray.500",
                      }}
                      bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                      //onClick={onEditProfile}
                    >
                      <FiEdit size={20} style={{ marginRight: "12px" }} />
                      Edit Profile
                    </MenuItem>
                  </Link>
                  
                  <Divider my={2} />
                  <MenuItem
                    _hover={{
                      bg: colorMode === "dark" ? "gray.700" : "gray.500",
                      color: "red.500",
                    }}
                    bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                    onClick={logout}
                  >
                    <FaSignOutAlt size={20} style={{ marginRight: "12px" }} />
                    Logout
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}> Mimo</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
