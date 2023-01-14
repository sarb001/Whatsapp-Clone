
import React from 'react';
import Login from './Login';
import Signup from './Signup';
import { Box, Container } from '@chakra-ui/react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


const Homepage = () => {
  return (
    <div style = {{padding:'6%'}}>  
         <Container maxW = '550px'  color='black'>
          <Box bg = 'lightyellow' w ='100%' p={4} color='red'>
            <Tabs  variant = 'soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>  Signup  </Tab>
                    <Tab>  Login   </Tab>
                </TabList>
              <TabPanels>
                    <TabPanel>
                        <p> <Signup  /> </p>
                    </TabPanel>
                      <TabPanel>
                          <p> <Login /> </p>
                      </TabPanel>
              </TabPanels>
        </Tabs>
          </Box>
      </Container>
          </div>
 )}

export default Homepage

