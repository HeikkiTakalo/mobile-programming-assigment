import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Location from "../components/Location";
import AddLocation from "../components/AddLocation";
import Map from "../components/Map";

const Tab = createBottomTabNavigator();

const LOCATIONS = "Locations";
const ADDLOCATIONS = "Add locations";
const MAP = "Map";

export default function Navigation() {
    return(
        <Tab.Navigator>
            <Tab.Screen
                name={LOCATIONS}
                component={Location}
            />
            <Tab.Screen
                name={ADDLOCATIONS}
                component={AddLocation}
            />
            <Tab.Screen
                name={MAP}
                component={Map}
            />
        </Tab.Navigator>
    );
}