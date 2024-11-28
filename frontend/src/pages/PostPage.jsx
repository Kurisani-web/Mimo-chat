import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  useColorMode,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import Actions from "../components/Actions";
import { useEffect, useRef } from "react";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import postsAtom from "../atoms/postsAtom";
import { CgMoreO } from "react-icons/cg";
import { IoCopyOutline } from "react-icons/io5";
import { FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const currentPost = posts[0];

  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook for AlertDialog
  const cancelRef = useRef();

  useEffect(() => {
    const getPost = async () => {
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pid, setPosts]);

  const handleDeletePost = async () => {
    try {
      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Mimo deleted", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Success", "Link copied to clipboard", "success");
  };

  const sharePost = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: currentPost.text,
          url: window.location.href,
        });
        showToast("Success", "Post shared successfully", "success");
      } else {
        // Fallback if Web Share API isn't supported (e.g., copy the URL to clipboard)
        copyURL();
      }
    } catch (error) {
      showToast("Error", "Failed to share post", "error");
    }
  };

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!currentPost) return null;

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name="Mimo" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            {user?.email === "kurisanim2@gmail.com" && (
              <Image src="/verified.png" w={4} h={4} ml={1} my={1} />
            )}
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text
            fontSize={"xs"}
            width={36}
            textAlign={"right"}
            color={"gray.light"}
          >
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>

          {currentUser?._id === user._id && (
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList
                  bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                  width="150px"
                  maxHeight="200px"
                  overflowY="auto"
                >
                  <MenuItem
                    _hover={{
                      bg: colorMode === "dark" ? "gray.700" : "gray.500",
                    }}
                    bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                    onClick={copyURL}
                  >
                    <IoCopyOutline size={20} style={{ marginRight: "12px" }} />
                    Copy Link
                  </MenuItem>

                  <MenuItem
                    _hover={{
                      bg: colorMode === "dark" ? "gray.700" : "gray.500",
                    }}
                    bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                    onClick={sharePost} // Use sharePost here
                  >
                    <FaShare size={20} style={{ marginRight: "12px" }} />
                    Share Post
                  </MenuItem>

                  <MenuItem
                    _hover={{
                      bg: colorMode === "dark" ? "gray.700" : "gray.400",
                    }}
                    bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                    onClick={onOpen}
                    color={"red.500"}
                  >
                    <MdDelete color="red.500" size={20} style={{ marginRight: "12px" }} />
                    Delete Post
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          )}
        </Flex>
      </Flex>

      <Text my={3}>{currentPost.text}</Text>

      {currentPost.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"gray.light"}
        >
          <Image src={currentPost.img} w={"full"} />
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Having issues? Please reach out!</Text>
        </Flex>
        <Button as="a" href="mailto:org.mimo@gmail.com">
          Email
        </Button>
      </Flex>

      <Divider my={4} />
      {currentPost.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={
            reply._id ===
            currentPost.replies[currentPost.replies.length - 1]._id
          }
        />
      ))}

      {/* Alert Dialog for Delete Confirmation */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeletePost} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default PostPage;
