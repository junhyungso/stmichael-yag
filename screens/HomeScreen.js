import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const DUMMY_PROFILES = [
  {
    id: 'p1',
    name: 'Junhyung So',
    baptismalName: 'John Bosco',
    birthday: '1998-03-21',
  },
];

const HomeScreen = () => {
  const { width, height } = useWindowDimensions();

  const [celebrations, setCelebrations] = useState([]);

  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/today'
        );
        setCelebrations(response.data.celebrations);
      } catch (error) {
        console.log(error);
      }
    };
    // fetchData();
  }, []);

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/praisenight.jpg')}
        />
      </View>
      <View style={{ backgroundColor: celebrations[0]?.colour }}>
        <View style={styles.dateContainer}>
          <Text>{dayNames[dayOfWeek]}</Text>
          <Text>{today.toLocaleDateString()}</Text>
        </View>
        <View>
          {celebrations?.map((celebration) => {
            return <Text>{celebration.title}</Text>;
          })}
        </View>
      </View>

      <View>
        <Text> Upcoming Birthdays...</Text>
      </View>
    </>
  );
};

export default HomeScreen;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : '100%',
    // height: deviceWidth < 380 ? 150 : '20%',
  },
  image: {
    width: '100%',
    height: 200,
  },
});
