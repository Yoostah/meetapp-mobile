// import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const Routes = createAppContainer(
  createSwitchNavigator(
    { SignIn, SignUp },
    {
      /* headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: ({ navigation }) => ({
        header: <Header navigation={navigation} />,
      }),
      cardStyle: {
        backgroundColor: '#111',
      }, */
    }
  )
);

export default Routes;
