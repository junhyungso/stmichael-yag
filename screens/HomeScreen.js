import React, { useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { getBirthdays, getCelebrations } from '../util/auth';
import { getNextSevenDayBirthdays } from '../util/getNextSevenDayBdays';

const HomeScreen = () => {
  const { width, height } = useWindowDimensions();

  const [celebrations, setCelebrations] = useState([]);
  const [upcomingBirthdayProfiles, setUpcomingBirthdayProfiles] = useState([]);

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
    const fetchCelebrations = async () => {
      try {
        const result = await getCelebrations();
        setCelebrations(result.celebrations);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUpcomingBirthdays = async () => {
      try {
        const result = await getBirthdays();
        const profilesWithUpcomingBirthdays = getNextSevenDayBirthdays(
          Object.values(result)
        );
        setUpcomingBirthdayProfiles(profilesWithUpcomingBirthdays);
      } catch (error) {
        console.log(error);
      }
    };
    // fetchCelebrations();
    fetchUpcomingBirthdays();
  }, []);

  const renderBirthdayItem = (profile) => {
    return (
      <View>
        <Text>{profile.item.name}</Text>
        <Text>{profile.item.birthday}</Text>
      </View>
    );
  };

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
        <FlatList
          data={upcomingBirthdayProfiles}
          renderItem={renderBirthdayItem}
          keyExtractor={(profile) => profile.birthday}
        ></FlatList>
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
