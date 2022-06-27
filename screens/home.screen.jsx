/**
 * This is the only screen of the project.
 */

import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {fetchStations} from "../utils";
import {AuthContext} from "../contexts/auth.context";
import {EntriesContext} from "../contexts/entries.context";

const HomeScreen = () => {
    const { deviceId, isAuthenticated, loading } = useContext(AuthContext)

    const { entries, addEntry, submitPassengersAsync } = useContext(EntriesContext)

    const [stationId, setStationId] = useState(null)

    const [stations, setStations] = useState([])

    // fetch stations
    useEffect(() => {
        const onFetchStations = async () => {
            const data = await fetchStations()

            setStations(data)
        }

        onFetchStations()
    }, [])

    const handleAddEntry = (id) => {
        const newEntry = {
            originStationId: stationId,
            destinationStationId: id,
            timestamp: new Date()
        }

        addEntry(newEntry)
    }

    // if loading, show loading screen
    if (loading) {
        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator />
                <Text style={{
                    marginTop: 10
                }}>Logging in with Device ID...</Text>
            </SafeAreaView>
        )
    }

    // if not logged in, show that device id is invalid
    // and not registered in the server
    if (!isAuthenticated) {
        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>INVALID DEVICE ID</Text>

                <Text>{deviceId}</Text>
                <Text>Please contact LTFRB PUVSC PIU IT Unit</Text>
            </SafeAreaView>
        )
    }

    // if there is no station id select,
    // prompt user to select one
    if (!stationId) {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontSize: 24,
                    color: '#1434a3'
                }}>SELECT ORIGIN</Text>
                {
                    stations.map(station => (
                        <TouchableOpacity style={{
                            marginTop: 10
                        }} key={station.id} onPress={() => setStationId(station.id)}>
                            <Text>{station.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    // show camera page
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{
                marginTop: 10,
                fontSize: 24
            }}>SELECT DESTINATION</Text>

            {
                stations.map(({ id, name }) => (
                    <TouchableOpacity key={id}
                                      style={{
                        marginTop: 10
                    }} onPress={() => handleAddEntry(id)}>
                        <Text>{name}</Text>
                    </TouchableOpacity>))
            }

            <View style={{
                flexGrow: 1
            }}/>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                <Text>Entered: {entries.length}</Text>

                <TouchableOpacity style={{
                    marginLeft: 20
                }} onPress={submitPassengersAsync}>
                    <Text>Manual Submit</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                flexGrow: 1
            }} />

            <TouchableOpacity onPress={() => setStationId(null)}>
                <Text style={{
                    marginBottom: 20,
                    color: 'red'
                }}>Change</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    camera: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 200,
    }
});

export default HomeScreen
