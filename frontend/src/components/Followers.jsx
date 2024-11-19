import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

const Followers = () => {
  const { userId } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the followers from an API or database using the userId
    const fetchFollowers = async () => {
      try {
        const response = await fetch(`/api/users/:userId/followers`); 
        
        if (!response.ok) {
          throw new Error(`Failed to fetch followers: ${response.statusText}`);
        }
  
        const data = await response.json();
        setFollowers(data.followers);
      } catch (error) {
        console.error('Error fetching followers:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFollowers();
  }, [userId]);
  

  if (loading) {
    return <Text>Loading followers...</Text>;
  }

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">Followers</Text>
      {followers.length === 0 ? (
        <Text>No followers found.</Text>
      ) : (
        followers.map(follower => (
          <Box key={follower._id} p={2} borderBottom="1px solid #ccc">
            <Text>{follower.name}</Text>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Followers;
