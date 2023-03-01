import * as React from "react"
import MapView , {Callout, Circle, Marker} from "react-native-maps"
import { Dimensions, StyleSheet,  View , Text} from 'react-native';
import * as Location from "expo-location";
export default function CurrentLoc(){

    const [pin, setPin] = React.useState({
        latitude: 35.902705,
        longitude:14.483579,
    })

    React.useEffect(() =>{
        (async () =>{
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({})
            console.log(location)

            setPin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        })(); 
    }, [])

    return(
        <View style={styles.container}>
            <MapView
            style = {styles.map}
            initialRegion={{
                latitude: 35.902705,
                longitude:14.483579,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            }}
                showsUserLocation={true}
                onUserLocationChange={(e) => {
                    console.log("onUserLocationChange", e.nativeEvent.coordinate)

                    setPin({
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                    })
                }}
            >
                <Marker 
                coordinate={pin}
                title = "Test marker"
                description="Test"
                pinColor="red"
                draggable={true}
                onDragStart={(e) => {
                    console.log("Drag Start", e.nativeEvent.coordinate)
                }}
                onDragEnd={(e) => {
                    console.log("Drag End", e.nativeEvent.coordinate)
                    setPin({
                        latitude: e.nativeEvent.latitude,
                        longitude: e.nativeEvent.longitude,
                    })
                }}>
                    <Callout><Text>You are here :)</Text></Callout>
                </Marker>

            <Circle 
            center={pin} 
            radius={60} 
            />
            </MapView>
        </View>
    )
}
const styles= StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        alignItens: "center",
        justifyContent: "center",
    },
    map:{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    }
})