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
import { GlobalStyles } from '../constants/styles';
import { getBirthdays, getCelebrations } from '../util/api';
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
    fetchCelebrations();
    fetchUpcomingBirthdays();
  }, []);

  const renderBirthdayItem = (profile) => {
    return (
      <View style={styles.birthdayContainer}>
        <Text>{profile.item.name}</Text>
        <Text>{profile.item.birthday}</Text>
      </View>
    );
  };

  return (
    <>
      <View>
        <View
          style={[
            styles.celebrationContainer,
            { backgroundColor: celebrations[0]?.colour },
          ]}
        >
          <Text style={styles.date}>{dayNames[dayOfWeek]}</Text>
          <Text style={styles.date}>{today.toLocaleDateString()}</Text>
          <View>
            {celebrations?.map((celebration) => {
              return (
                <Text style={styles.celebration} key={celebration.title}>
                  {celebration.title}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/praisenight.jpg')}
        />
      </View>
      <View>
        <Text style={styles.birthdayTitle}>Upcoming Birthdays...</Text>
        <FlatList
          data={upcomingBirthdayProfiles}
          renderItem={renderBirthdayItem}
          keyExtractor={(profile) => profile.birthday}
        ></FlatList>
      </View>

      <View style={styles.massSchedule}>
        <Text style={styles.massScheduleText}>Mass Time: </Text>
        <Text style={styles.massScheduleText}>Every Sunday 5:30pm</Text>
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
  date: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  celebrationContainer: {
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 10,
  },
  celebration: {
    fontSize: 14,
  },
  birthdayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  birthdayContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 'auto',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary400,
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : '100%',
    // height: deviceWidth < 380 ? 150 : '20%',
  },
  image: {
    width: '100%',
    height: 200,
  },
  massSchedule: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  massScheduleText: {
    fontSize: 16,
  },
});
