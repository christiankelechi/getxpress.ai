import {
    Box,
    SimpleGrid,
    Heading,
    Button,
    List,
    ListItem,
    VStack,
    useColorModeValue,
    Divider,
    Flex,
  } from '@chakra-ui/react';
  import CustomButton from '../CustomButton';
import { useNavigate } from 'react-router-dom';
  
  const plans = [
    {
      title: 'Basic',
      benefits: [
        'Limited AI interactions',
        'Advanced analytics and data',
        'Priority support',
        'Get Limited Video Feedback',
      ],
      buttonText: 'Free',
    },
    {
      title: 'Pro',
      benefits: [
        'Unlimited AI interactions',
        'Advanced analytics and data',
        'Priority support',
        'Early access to new features',
        'Full data control',
        'Download/Pause Videos',
      ],
      buttonText: 'Upgrade to Pro',
    },
  ];
  
  const PricingSection = () => {
    const planCardBg = useColorModeValue('white', '#0f121c');
    const navigate = useNavigate();


    const handleNavigate = () => {
        navigate("/register");
       };
  
    return (
      <Box py={10} px={4} bg={useColorModeValue('gray.50', '#0f121c')}>
        <Heading textAlign="center" fontWeight={"600"} mb={10}>
          Pricing Plan
        </Heading>
  
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={8}
          maxW="4xl"
          mx="auto"
          alignItems="stretch"
        >
          {plans.map((plan) => (
            <Flex
              key={plan.title}
              direction="column"
              borderWidth="1px"
              borderRadius="xl"
              p={6}
              bg={planCardBg}
              shadow="md"
              w="100%"
              maxW="423px"
              mx="auto"
            >
              <Heading
                fontSize="36px"
                fontWeight="600"
                textAlign="center"
                mb={4}
              >
                {plan.title}
              </Heading>
  
              <Divider mb={4} />
  
              <List spacing={3} mb={6} flex="1">
                {plan.benefits.map((benefit, idx) => (
                  <ListItem key={idx} display="flex" mb={"24px"} alignItems="center">
                    <Box
                      w="8px"
                      h="8px"
                      bg="gray.400"
                      borderRadius="full"
                      mr={2}
                      flexShrink={0}
                    />
                    {benefit}
                  </ListItem>
                ))}
              </List>
  
              <Box mt="auto">
                <CustomButton
                  title={plan.buttonText}
                  borderRadius="md"
                  display="flex"
                  padding="10px 20px"
                  mx="auto"
                  w="full"
                  onClick={handleNavigate}
                />
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
    );
  };
  
  export default PricingSection;
  