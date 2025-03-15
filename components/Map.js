import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';

const MapScreen = () => {
    const route = useRoute();
    const mapRef = useRef(null);
    const defaultLocation = { latitude: 65.0800, longitude: 25.4800 };
    const location = route.params?.location || defaultLocation;

    useEffect(() => {
        if (mapRef.current && location) {
            setTimeout(() => {
                mapRef.current.animateToRegion({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.30,
                    longitudeDelta: 0.30,
                }, 1000);
            }, 500);
        }
    }, [location]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.30,
                    longitudeDelta: 0.30,
                }}
            >
                <Marker coordinate={location} title="Reviewed Location" />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
});

export default MapScreen;
