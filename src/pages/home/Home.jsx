import { Box } from "@chakra-ui/react"
import Footer from "./footer/Footer"
import PricingSection from "../../components/home/PricingSection"
import AvailableResources from "../../components/home/AvailableResources"
import TypingIndicator from "../../components/home/TypingIndicator"
import NavBar from "./header/NavBar"

const Home = () => {
    // const navigate = useNavigate();

    //  // Function to navigate to the registration page
    //  const handleTryForFree = () => {
    //   navigate("/register");
    //  };

  return (
    <Box>
       <NavBar/>
       <TypingIndicator/>
       {/* <Text textAlign={"center"} mb={"2rem"}>Welcome to home page</Text>  */}
       {/* <CustomButton 
         title="Try for free"
         leftIcon={<VideoIcon width="24px" height="24px" />}
         onClick={handleTryForFree}
         borderRadius={"full"}
         display={"flex"}
         mx={"auto"}
         padding={"10px 20px"}
       /> */}
       <AvailableResources/>
       <PricingSection/>
       <Footer/>
    </Box>
  )
}

export default Home