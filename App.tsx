import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Layout from "./app/layout";
import Login from "./app/login";
import UserHome from "./app/userHome";

const Stack = createStackNavigator();

export default function App() {
  console.log('1')
  return (
    <Layout>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' }
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UserHome" component={UserHome} />
        </Stack.Navigator>
      </NavigationContainer>
    </Layout>
  );
}

