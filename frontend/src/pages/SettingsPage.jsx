import { 
	Box, 
	Button, 
	Divider, 
	Flex, 
	Link, 
	Modal, 
	ModalBody, 
	ModalCloseButton, 
	ModalContent, 
	ModalFooter, 
	ModalHeader, 
	ModalOverlay, 
	Stack, 
	Switch, 
	Text, 
	Tooltip, 
	useColorMode, 
	useDisclosure
} from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";
import { FiLogOut } from "react-icons/fi";
import {IoIosMore, IoIosSnow } from "react-icons/io";
import {MdOutlineMarkEmailUnread, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaInfoCircle, FaRegUser } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export const SettingsPage = ({user}) => {
	const showToast = useShowToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const logout = useLogout();
	const currentUser = useRecoilValue(userAtom); 
	const { colorMode, toggleColorMode } = useColorMode();

	const freezeAccount = async () => {
		if (!window.confirm("Are you sure you want to freeze your account?")) return;

		try {
			const res = await fetch("/api/users/freeze", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (data.error) {
				return showToast("Error", data.error, "error");
			}
			if (data.success) {
				await logout();
				showToast("Success", "Your account has been frozen", "success");
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<Box
			//p={2}
			//w="100%"
			//maxW="600px"
			mx="auto"
			//h="100vh"
			overflowY="auto"
			//boxShadow="m"
			//borderRadius="lg"
			//borderWidth="1px"
		>

			<Text fontSize="2xl" fontWeight="bold" mb={4}>
        		Settings
      		</Text>
			<Stack spacing={6}>
				{/* Freeze Account */}
				{/*<Box>
					<Flex alignItems="center" justifyContent="space-between">
						<Box>
							<Text fontWeight="bold">Freeze Your Account</Text>
							<Text fontSize={"sm"} my={2}color={"gray.600"}>
								You can unfreeze your account anytime by logging in.
							</Text>
						</Box>
						<Box ml={4}>
							<Tooltip
								label="Freeze Your Account"
								aria-label="Freeze account tooltip"
								hasArrow
								bg="teal.500"          // Background color
								color="white"          // Text color
								fontSize="sm"          // Font size
								p={3}                  // Padding
								borderRadius="md"      // Rounded corners
								boxShadow="md"         // Shadow effect
								_hover={{
									bg: "teal.400",      // Background color when hovered
								}}
								isOpen={false}         // Ensure it doesn't stay open permanently
								shouldWrapChildren     // This makes sure Tooltip works correctly with children
							>
								<Box
									as="button"          // Makes the icon behave like a button
									onClick={freezeAccount} // onClick behavior
									_hover={{
										color: "red.500",  // Color change on hover
										transform: "scale(1.1)", // Scale effect on hover
									}}
								>
									<FaShieldAlt size={25} />
								</Box>
							</Tooltip>
						</Box>
					</Flex>
				</Box>*/}

				{/* Appearance Settings */}
				<Box
					p={4}
					w="100%"
					maxW="600px"
					mx="auto"
					//h="100vh"
					overflowY="auto"
					boxShadow="md"
					borderRadius="lg"
					borderWidth="1px"
					bg={colorMode === 'dark' ? "gray.800" : ""}
				
				>
					<Flex direction="column" alignItems="flex-start" w="100%">
						{/* Account Header */}
						<Box mb={2}>
							<Text fontWeight="bold">Account</Text>
						</Box>

						{/* Email */}
						<Flex alignItems="center" mb={1}>
							<MdOutlineMarkEmailUnread size={18} />
							<Text ml={2} color={"gray.600"}>{user?.email}</Text>
						</Flex>

						{/* Username */}
						<Flex alignItems="center" mb={1}>
							<FaRegUser size={18} />
							<Text ml={2} color={"gray.600"}>{user?.username}</Text>
						</Flex>

						{/*Bio*/}
						<Flex alignItems="center" mb={1}>
							<FaInfoCircle size={18} />
							<Text ml={2} color={"gray.600"}>{user?.bio}</Text>
						</Flex>

						{/* Update Button (only visible for the logged-in user) */}
						<Flex alignItems={"center"} justifyContent={"space-between"} w="100%">
							{currentUser?._id === user._id && (
							<Link as={RouterLink} to='/update'>
								<Box mt={4} ml="auto">
									<MdOutlineDriveFileRenameOutline size={20} color="teal" />
								</Box>
							</Link>
							)}

							{currentUser?._id !== user._id && (
							<>
								{/* Add content here for other users, if needed */}
							</>
							)}
						</Flex>

					</Flex>

				</Box>

				<Box
					p={4}
					w="100%"
					maxW="600px"
					mx="auto"
					//h="100vh"
					overflowY="auto"
					boxShadow="md"
					borderRadius="lg"
					borderWidth="1px"
					bg={colorMode === 'dark' ? "gray.800" : ""}
				
				>
					<Flex alignItems={"center"} justifyContent={"space-between"}>
						<Box>
							<Text fontWeight="bold">Appearance</Text>
							<Text color={"gray.600"} fontSize={"sm"} my={2}>
								Dark Mode
							</Text>
						</Box>
						<Box ml={4}>
							<Switch 
								isChecked={colorMode === "dark"} 
								onChange={toggleColorMode}
								size="sm"
							/>
						</Box>
					</Flex>
					
				</Box>

				{/* Report an Issue */}
				<Box
					p={4}
					w="100%"
					maxW="600px"
					mx="auto"
					//h="100vh"
					overflowY="auto"
					boxShadow="md"
					borderRadius="lg"
					borderWidth="1px"
					bg={colorMode === 'dark' ? "gray.800" : ""}
				
				>
					<Flex alignItems="center" justifyContent="space-between" mb={4}>
						<Box>
							<Text fontWeight="bold">Report an Issue</Text>
							<Text color={"gray.600"} fontSize={"sm"} my={2}>
								If you encounter any issues, please report them here.
							</Text>
						</Box>
						<Box ml={4}>
						<Button 
							onClick={()=> window.location.href = "mailto:org.mimo@gmail.com"} 
							backgroundColor={"teal"}  // Set custom background color
							borderRadius="md"          // Set border radius for rounded corners
							padding="5px 10px"         // Set padding for the button
							fontSize="14px"            // Set font size
							fontWeight="bold"          // Set font weight for text
							boxShadow={"lg"}
							_hover={{                  // Hover effect styling
								backgroundColor: "#FF4500", // Change background color on hover
								transform: "scale(1.05)",    // Slightly scale the button on hover
							}} 
							>
							Report
						</Button>
						</Box>
					</Flex>
					<Divider 
						mb={4} 
						borderColor={colorMode === 'light' ? "gray.500" : "gray.700"} 
					/>

					<Box>
						<Text fontWeight="bold">Terms and Privacy Policy</Text>
						<Text color={"gray.600"} fontSize={"xs"} my={2}>
							By using our service, you agree to{" "}
							<Link 
								color="teal.500" 
								href="https://mimo-bc8e9.web.app"
								target="_blank" 
								isExternal
								textDecoration={'underline'}
								cursor={'pointer'}
								_hover={{
									textDecoration: "none",
									color: "teal.400"
								}}
							>
								our terms
							</Link>{" "}
							and{" "}
							<Link 
								color="teal.500" 
								href="https://mimo-bc8e9.web.app"
								target="_blank" 
								isExternal
								textDecoration="underline"
								_hover={{
									textDecoration: "none",
									color: "teal.400",
									cursor:"pointer"
								}}
							>
								privacy policy
							</Link>.
						</Text>
					</Box>
				</Box>

				{/* 2nd section */}
				<Box 
					p={4}
					w="100%"
					maxW="600px"
					mx="auto"
					overflowY="auto"
					boxShadow="md"
					borderRadius="lg"
					borderWidth="1px"
					mb={8}
					bg={colorMode === 'dark' ? "gray.800" : ""}
				>
					{/* Freeze Your Account Section */}
					<Flex alignItems={"center"} justifyContent={"space-between"} mb={4}>
						<Box>
							<Text fontWeight="bold">Freeze Your Account</Text>
							<Text fontSize={"sm"} my={2} color={"gray.600"}>
								You can unfreeze your account anytime by logging in.
							</Text>
						</Box>
						<Box ml={4}>
							<Tooltip
								label="Freeze Your Account"
								aria-label="Freeze account tooltip"
								hasArrow
								bg="teal.500"          // Background color
								color="white"          // Text color
								fontSize="sm"          // Font size
								p={3}                  // Padding
								borderRadius="md"      // Rounded corners
								boxShadow="md"         // Shadow effect
								_hover={{
									bg: "teal.400",      // Background color when hovered
								}}
								isOpen={false}         // Ensure it doesn't stay open permanently
								shouldWrapChildren     // This makes sure Tooltip works correctly with children
							>
								<Box
									as="button"          // Makes the icon behave like a button
									onClick={freezeAccount} // onClick behavior
									_hover={{
										color: "red.500",  // Color change on hover
										transform: "scale(1.1)", // Scale effect on hover
									}}
								>
									<IoIosSnow size={25} />
								</Box>
							</Tooltip>
						</Box>
					</Flex>

					<Divider 
						mb={4} 
						borderColor={colorMode === 'light' ? "gray.500" : "gray.700"} 
					/>

					{/* Logout Section */}
					<Flex alignItems={"center"} justifyContent={"space-between"} mb={4}>
						<Box>
							<Text fontWeight="bold" color={"red"}>Logout</Text>
						</Box>
						
						{/* Aligning the Logout Icon (button) to the right */}
						<Box ml="auto"> {/* Changed to ml="auto" to push it to the right */}
							<FiLogOut 
								size={25} 
								color={"red"} 
								onClick={logout}
								cursor={"pointer"}
							/>
						</Box>
					</Flex>
				</Box>
				
      		</Stack>
			<Box>
				{/* Pressable Text */}
				<Text 
					color={"gray.600"} 
					fontSize={"sm"} 
					my={2} 
					_hover={{ cursor: 'pointer', textDecoration: 'underline' }} 
					onClick={onOpen}
				>
					2024 © Mimo
				</Text>

				{/* Modal for App Information */}
				<Modal isOpen={isOpen} onClose={onClose} isCentered>
					<ModalOverlay />
					<ModalContent>
					<ModalHeader>Mimo</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{/* App Version Info */}
						<Text mb={4}><strong>Version:</strong> 1.0.22.0</Text>
						<Text mb={4}><strong>Release Date:</strong> December 2024</Text>

						{/* Additional App Information */}
						<Text mt={4}><strong>Features:</strong></Text>
						<Text mb={2}>- Authentication</Text>
						<Text mb={2}>- Dark Mode Support</Text>
						<Text mb={2}>- Real-Time Messaging</Text>
						<Text mb={2}>- Account Freeze Option</Text>
						<IoIosMore color="teal" size={20}/>

						{/* Links to Terms and Privacy */}
						<Text mt={4}><strong>Legal:</strong></Text>
						<Link href="https://mimo-bc8e9.web.app" isExternal color="teal.500" target="_blank">Privacy Policy</Link>
						<br />
						<Link href="https://mimo-bc8e9.web.app" isExternal color="teal.500" target="_blank">Terms of Service</Link>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" onClick={onClose}>Close</Button>
					</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
		</Box>
	);
};