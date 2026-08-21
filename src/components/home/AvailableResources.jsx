import { Box, Flex, Grid, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const AvailableResources = () => {
  const headingColor = useColorModeValue("gray.800", "white");//
  const textColor = useColorModeValue("gray.500","gray.50");
  const borderGradient = "linear-gradient(90deg, #0b76D9, #17A128, #1E1E1E)";
  const borderColor = useColorModeValue("2px solid gray.50","2px solid #171A21")

  return (
    <Box>
      <Heading ml={{base:"12%",lg:"8%"}} as="h4" fontWeight={"600"}  size="lg" mb={6}>
        Avaialble Resources
      </Heading>
      <Flex justifyContent="center" alignItems="center">
        <Grid
          flexBasis="88%"
          m="auto"
          templateColumns={{ sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={6}
          p={4}
        >
          {WHYCHOOSEUS_OPTIONS.map((option,index) => (
            <Box
              as="div"
              data-aos={index >= 2 ? "zoom-in" : ""}
              data-aos-easing={index >= 2 ? "ease-out-cubic" : undefined}
              data-aos-duration={index >= 2 ? "1000" : undefined}
              key={option.id}
              borderRadius="md"
              px={5}
              py={4}
              border={borderColor}
              boxShadow="md"
              _hover={{
                transform: "scale(1.03)",
                transition: "0.3s ease-in-out",
              }}
            >
              <Heading className="text-grey-50" as="h5" size="md" mb={3}>
                {option.title}
              </Heading>
              <Text color={textColor} minH="50px">
                {option.description}
              </Text>
            </Box>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};
export default AvailableResources;

const WHYCHOOSEUS_OPTIONS = [
  {
    id: 0,
    title: "Freemium Model",
    description:
      "Basic AI-generated lessons are free, with premium features behind a paywall.",
  },
  {
    id: 1,
    title: "Cloud-Based Deployment",
    description:
      "The platform is accessible on web and mobile devices.",
  },
  {
    id: 2,
    title: "Emotion Responsive Learning",
    description:
      "Xpress AI can detect user gestures and emotions to adapt its responses.",
  },
  {
    id: 3,
    title: "API Access",
    description:
      "Developers and EdTech companies can use the AI models via paid API plans.",
  },
  {
    id: 4,
    title: "AI Model Upgrades",
    description: "Continuous improvements using advanced NLP, computer vision, and deep learning techniques.",
  },
  {
    id: 5,
    title: "Multilingual Support",
    description:
      "Lessons can be delivered in multiple languages with voice customization.",
  },
];
