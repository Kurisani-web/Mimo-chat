import {
  Box,
  Flex,
  Spinner,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPosts]);

  return (
    <Flex gap="10" alignItems={"flex-start"}>
      <Box flex={70}>
        {!loading && Array.isArray(posts) && posts.length === 0 && (
          <h1>Follow some users to see the Mimo</h1>
        )}

        {loading && (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        )}

        {!loading &&
          Array.isArray(posts) &&
          posts.map((post) => (
            <Post key={post._id} post={post} postedBy={post.postedBy} />
          ))}
      </Box>

      {/* Sidebar button for small screens */}
      <Button
        display={{ base: "block", md: "none" }}
        onClick={onOpen}
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex={10}
        bg="blue.500" // Background color
        color="white" // Text color
        _hover={{ bg: "blue.600" }} // Background color on hover
        _active={{ bg: "blue.700" }} // Background color on click
      >
        Suggested Users
      </Button>

      {/* Sidebar (Drawer) for small screens */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay>
          <DrawerContent
            sx={{
              bg: "linear-gradient(to right, #3b0764, #000000)",
              color: "white",
              maxWidth: "260px",
            }}
          >
            <DrawerCloseButton />
            <DrawerHeader>Mimo</DrawerHeader>
            <DrawerBody>
              <SuggestedUsers />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      {/* Suggested Users section for medium screens and above */}
      <Box
        flex={30}
        display={{
          base: "none",
          md: "block",
        }}
      >
        <SuggestedUsers />
      </Box>
    </Flex>
  );
};

export default HomePage;
