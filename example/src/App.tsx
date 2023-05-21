import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
// import { InteractiveGrid } from 'react-native-interactive-grid';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>TODO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
