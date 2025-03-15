import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Location from "../components/Location";
import AddLocation from "../components/AddLocation";
import Map from "../components/Map";
import { MaterialIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

const LOCATIONS = "Locations";
const ADDLOCATIONS = "Add locations";
const MAP = "Map";
const icons = {
    [LOCATIONS]: 'location-on',
    [ADDLOCATIONS]: 'add-location-alt',
    [MAP]: 'map'
}

export default function Navigation() {
    return(
        <Tab.Navigator>
            <Tab.Screen
                name={LOCATIONS}
                component={Location}
                options={{tabBarIcon: () => <MaterialIcons name={icons[LOCATIONS]} size={20}/>}}
            />
            <Tab.Screen
                name={ADDLOCATIONS}
                component={AddLocation}
                options={{tabBarIcon: () => <MaterialIcons name={icons[ADDLOCATIONS]} size={20}/>}}
            />
            <Tab.Screen
                name={MAP}
                component={Map}
                options={{tabBarIcon: () => <MaterialIcons name={icons[MAP]} size={20}/>}}
            />
        </Tab.Navigator>
    );
}