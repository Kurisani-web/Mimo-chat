import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { 
	Button, 
	useColorMode, 
	useDisclosure, 
	useToast 
} from "@chakra-ui/react";
/*import { BsInstagram } from "react-icons/bs";*/
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";
import { useState } from "react";
import ProfilePicture from "./ProfilePicture";

const UserHeader = ({ user }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	const toast = useToast();
	const currentUser = useRecoilValue(userAtom); // logged in user
	const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);
	const navigate = useNavigate();
	const [selectedProfilePic, setSelectedProfilePic] = useState(null);

	/*const handleClick = () => {
		// Ensure user and user.id are defined
		if (user && user.id) {
		  navigate(`/followers/${user.id}`); // Navigate with user ID
		} else {
		  navigate('/followers'); // Fallback to a static path if user ID is not defined
		}
	};*/		
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

	const handleAvatarClick = (user) => {
		setSelectedProfilePic(user.profilePic || "https://bit.ly/broken-link");
		onOpen();
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
						<Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
							mimo.com
						</Text>
					</Flex>
				</Box>
				<Box
					onClick={() => handleAvatarClick(user)}
					cursor="pointer"
					_hover={{ transform: "scale(1.05)" }}
					transition="transform 0.2s ease-in-out"
				>
					{user.profilePic && (
						<Avatar
							name={user.name}
							src={user.profilePic}
							size={{
								base: "md",
								md: "xl",
							}}
						/>
					)}
					{!user.profilePic && (
						<Avatar
							name={user.name}
							src='https://bit.ly/broken-link'
							size={{
								base: "md",
								md: "xl",
							}}
						/>
					)}
				</Box>

				<ProfilePicture isOpen={isOpen} onClose={onClose} user={user} />
			</Flex>

			<Text>{user.bio}</Text>

			{currentUser?._id === user._id && (
				<Link as={RouterLink} to='/update'>
					<Button 
						size={"sm"}
						border={colorMode === "light" ? "1px solid #ccc" : ""} // Subtle border for light mode
						borderRadius="4px" // Rounded edges
						px={2} // Horizontal padding
						py={1} // Vertical padding
						bgColor={colorMode === "light" ? "gray.400" : ""}
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
					border={colorMode === "light" ? "1px solid #ccc" : ""} // Subtle border for light mode
					borderRadius="4px" // Rounded edges
					px={2} // Horizontal padding
					py={1} // Vertical padding
				>
					{following ? "Unfollow" : "Follow"}
				</Button>
			)}
			<Flex w={"full"} justifyContent={"space-between"}>
				<Flex gap={2} alignItems={"center"}>
				<Text color="gray.light">
					<Button
						variant="unstyled" // Removes button styles
						color={colorMode === "dark" ? "#00FFFF" : "#333333"} // Text color for the button
						_hover={{ textDecoration: "underline" }} // Optional hover effect
						_active={{ color: "gray.700" }} // Optional active state
						border={colorMode === "light" ? "1px solid #ccc" : ""} // Subtle border for light mode
						borderRadius="4px" // Rounded edges
						px={2} // Horizontal padding
						py={1} // Vertical padding
						//onClick={() => handleClick()} // Navigate to followers page
						//bgColor={colorMode === "light" ? "#40E0D0" : ""}
					>
						{user.followers.length} followers
					</Button>
				</Text>

					<Box w='1' h='1' bg={"gray.light"} borderRadius={"full"}>

					</Box>
					{/*<Link color={"gray.light"}>instagram.com</Link>*/}
					<Button
						variant="unstyled" // Removes button styles
						color={colorMode === "dark" ? "#00FFFF" : "#333333"} // Text color for the button
						_hover={{ textDecoration: "underline" }} // Optional hover effect
						_active={{ color: "gray.700" }} // Optional active state
						border={colorMode === "light" ? "1px solid #ccc" : ""} // Subtle border for light mode
						borderRadius="4px" // Rounded edges
						px={2} // Horizontal padding
						py={1} // Vertical padding
						//bgColor={colorMode === "light" ? "#40E0D0" : ""}
					>
						{user.following.length} following
					</Button>
				</Flex>
				<Flex>
					{/*<Box className='icon-container'>
						<BsInstagram size={24} cursor={"pointer"} />
					</Box>*/}
					<Box className='icon-container'>
						<Menu>
							<MenuButton>
								<CgMoreO size={24} cursor={"pointer"} />
							</MenuButton>
							<Portal>
								<MenuList bg={"gray.dark"}>
									<MenuItem bg={"gray.dark"} onClick={copyURL}>
										Copy link
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
					pb='3' 
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> Mimo</Text>
				</Flex>
				{/*<Flex
					flex={1}
					borderBottom={"1px solid gray"}
					justifyContent={"center"}
					color={"gray.light"}
					pb='3'
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> Replies</Text>
				</Flex>*/}
			</Flex>
		</VStack>
	);
};

export default UserHeader;
