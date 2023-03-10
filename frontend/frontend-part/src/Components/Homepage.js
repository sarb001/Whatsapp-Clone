
import React from 'react';
import Login from './Login';
import Signup from './Signup';
import { Box, Container } from '@chakra-ui/react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

// iIn original APP
const Homepage = () => {
  return (
    <div style = {{padding:'6%'}}>  
         <Container maxW = '550px'  color='black'>
          <Box bg = 'lightyellow' w ='100%' p={4} color='red'>
            <Tabs  variant = 'soft-rounded' colorScheme = 'green'>
                <TabList>
                    <Tab>  Signup  </Tab>
                    <Tab>  Login   </Tab>
                </TabList>
              <TabPanels>
                    <TabPanel>
                        <div> <Signup  /> </div>
                    </TabPanel>
                      <TabPanel>
                          <div> <Login /> </div>
                      </TabPanel>
              </TabPanels>
        </Tabs>
          </Box>
      </Container>
          </div>
 )}

export default Homepage

