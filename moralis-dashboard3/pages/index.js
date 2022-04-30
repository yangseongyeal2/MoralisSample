import {createRoot} from 'react-dom/client';
import { useMoralis } from "react-moralis"
import Head from "next/head"
import { Button, Flex ,Text,Box, TabList ,Tab,Tabs, TabPanels,TabPanel } from "@chakra-ui/react"
import Header from "../components/Header"
import Profile from "../components/Profile"
import Balance from "../components/Balance"
import Transactions from "../components/Transactions"
import Nft from "../components/Nft"
import Send from "../components/Send"

export default function Home() {
  //https://github.com/yangseongyeal2/Moralis-Sample.git
  const {isAuthenticated, authenticate ,user ,logout ,isLoggingOut } = useMoralis()
  //console.log(isAuthenticated)//
  if(!isAuthenticated){
    return(
     <>
        <Head>
          <title>Login | Dashboard3 </title>
        </Head>    
         <Flex 
         direction="column"
         justifyContent="center"
         alignItems="center"
         width="100vw"
         height="100vh"
         bgGradient="linear(to-br, teal.400,purple.300)" > 
            <Text fontSize="5xl" fontWeight="bold" color="white">Dashboard3</Text>
            <Button colorScheme="purple" size="lg" mt="6" 
            onClick={() => authenticate({
              signingMessage: "Sign to login to Dashbard3"
             }) } >
            Login with Metamask</Button>
         </Flex>
        </>
    )
  }
  return (
    <>
      <Head>
        <title>Dashboard3</title>
      </Head> 
      <Flex direction="column" width="100vw" height="100vh" >
        <Header user={user} logout={logout} isLoggingOut={isLoggingOut} />
        <Box flex="1" bg="purple.100" px="44" py="20" >
          <Tabs size="lg" colorScheme="purple" align="center" variant="enclosed" >
            <TabList>
              <Tab fontWeight="bold">Profile</Tab>
              <Tab fontWeight="bold">Balance</Tab>
              <Tab fontWeight="bold">Transaction</Tab>
              <Tab fontWeight="bold">NFTs</Tab>
              <Tab fontWeight="bold">Send ETH</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Profile user={user}/>
              </TabPanel>
              <TabPanel>
                <Balance user={user} />
              </TabPanel>
              <TabPanel>
              <Transactions user={user} />
              </TabPanel>
              <TabPanel>
                <Nft user={user} />
              </TabPanel>
              <TabPanel>
                <Send/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  )
}
