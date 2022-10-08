import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { heightScreen, widthScreen } from '../../utils/layout';
import { Box, Button, CloseIcon, HStack, Divider, Icon, IconButton, Text, VStack, FlatList } from 'native-base';
import { DataContext } from '../../context/DataContext';
import * as Linking from 'expo-linking'
import Empty from "../../assets/svg/home/home.svg";
import { AuthContext } from '../../context/AuthContext';



const Home = () => {


  const { requests, getRequest } = useContext(DataContext);
  const { accessToken } = useContext(AuthContext)

  const [refreshing, setRefreshing] = useState(false);

  const loadRequest = async () => {
    return new Promise(() => {
      getRequest(accessToken)
      setRefreshing(false)
    })
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadRequest()
  }

  return (
    <View style={styles.container}>
      <Box pt='4' pb='4'>
        <Text fontFamily='body' fontWeight='600' fontSize='xl'
          px="4" pt="4">
          List of requests for donations
        </Text>
      </Box>

      {
        requests && requests.length > 0 ?
          <FlatList w='full'
            refreshing={refreshing}
            onRefresh={onRefresh}
            contentContainerStyle={{ paddingVertical: 15 }} data={requests} renderItem={({ item }) => {
              return (
                <Box border="1" mt='3' mb='3' borderRadius="xl"
                  w='full'
                  borderColor='muted.300' borderWidth='1'>
                  <VStack space="2">
                    <Text fontFamily='body' fontWeight='600' fontSize='lg'
                      px="4" pt="4">
                      {item.name}
                    </Text>
                    <Box px="4">
                      {item.email}
                    </Box>
                    <Box px="4">
                      {item.address}
                    </Box>
                    <Box px="4">
                      {item.city}
                    </Box>
                    <Box px="4">
                      {item.pin}
                    </Box>
                    <Box px='4' pb="4">
                      <Button
                        size='md'
                        pl='6'
                        pr='6'
                        fontSize='xl'
                        rounded='xl'
                        onPress={() => {
                          Linking.openURL(`https://maps.google.com/maps?q=${item.location.lat},${item.location.long}`)
                        }}
                      >
                        Donate
                      </Button>
                    </Box>
                  </VStack>
                </Box>
              )
            }} />
          : (<Box justifyContent='center' h='full' alignItems='center'>
            <Empty />
            <Text fontFamily='body' fontWeight='600' fontSize='xl'
              px="4" pt="4" mt='8' textAlign='center'>
              Woohoo! There's no request for blood
            </Text>
          </Box>)
      }
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: widthScreen,
    backgroundColor: "#fff",
    paddingHorizontal: heightScreen > 800 ? 32 : 26,
    // justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});
