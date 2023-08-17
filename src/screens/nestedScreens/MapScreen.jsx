import { Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const MapPostScreen = ({ route }) => {
  const {
    params: {
      locationParams: { latitude, longitude },
    },
  } = route;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title="Тут було зроблено це фото!"
        />
      </MapView>
    </View>
  );
};

export default MapPostScreen;
