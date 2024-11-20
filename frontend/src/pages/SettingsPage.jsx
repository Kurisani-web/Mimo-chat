import { Box, Button, Divider, Flex, Link, Stack, Switch, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";
import { FiLogOut } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";

export const SettingsPage = ({user}) => {
	const showToast = useShowToast();
	const logout = useLogout();
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
				<Box>
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

				<Divider />

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
							onClick={()=> window.location.href = "mailto:kurisani2@gmail.com"} 
							backgroundColor={"teal"}  // Set custom background color
							borderRadius="md"          // Set border radius for rounded corners
							padding="5px 10px"         // Set padding for the button
							fontSize="14px"            // Set font size
							fontWeight="bold"          // Set font weight for text
							_hover={{                  // Hover effect styling
								backgroundColor: "#FF4500", // Change background color on hover
								transform: "scale(1.05)",    // Slightly scale the button on hover
							}} 
							>
							Report
						</Button>
						</Box>
					</Flex>
					<Box>
						<Text fontWeight="bold">Terms and Privacy Policy</Text>
						<Text color={"gray.600"} fontSize={"xs"} my={2}>
							By using our service, you agree to{" "}
							<Link 
								color="teal.500" 
								href="https://your-terms-url.com" 
								isExternal
								textDecoration="underline"
							>
								our terms
							</Link>{" "}
							and{" "}
							<Link 
								color="teal.500" 
								href="https://your-privacy-policy-url.com" 
								isExternal
								textDecoration="underline"
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
									<FaShieldAlt size={25} />
								</Box>
							</Tooltip>
						</Box>
					</Flex>

					{/* Logout Section */}
					<Flex alignItems={"center"} justifyContent={"space-between"} mb={4}>
						<Box>
							<Text fontWeight="bold">Logout</Text>
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
		</Box>
	);
};
