import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, View, ViewStyle, Text } from "react-native"
import { Button, FlatList, Input } from 'native-base'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  alignItems: "center",
  justifyContent: "center"
}
const FLAT: ViewStyle = {
  flex: 1,
  maxHeight: 100,
  alignSelf: "flex-end",
}
const FLAT_CONTAINER: ViewStyle = {
}

export const HomeScreen = observer(function HomeScreen() {
  let nameInput = ''
  const [apiResult, setApiResult] = useState({
    name: '',
    country: [{
      country_id: '',
      probability: 0
    }]
  });

  const navigation = useNavigation()
  const nextScreen = () => navigation.navigate("demo")

  const natName = () => {
    const URL = `https://api.nationalize.io/?name=${nameInput}`
    console.log(URL)
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setApiResult(data); apiResult.country.forEach(element => console.log(element));
      })
      .catch(error => console.log(error))

  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={ROOT}>
      <Text>HELO</Text>
      <Input onChangeText={text => nameInput = text} />
      <Button onPress={natName}>Analyze name</Button>
      <Button size="sm" variant="ghost" onPress={nextScreen}>Navigate to Welcome Screen</Button>
      
      <View style={FLAT_CONTAINER}> 
      <FlatList style={FLAT} renderItem={({item, index})=><Text>{item.country_id}: {(item.probability*100).toFixed(2)}%</Text>} data={apiResult.country} keyExtractor={item=>item.country_id}></FlatList>
      </View>
    </View>
  )
})
