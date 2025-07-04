import AsyncStorage from "@react-native-async-storage/async-storage";


export const saveCity = async (city) => {

    try {
        await AsyncStorage.setItem('city', JSON.stringify(city))
    } catch (error) {
        console.error(error)
    }

}

export const getCity = async () => {
  try {
    const city = await AsyncStorage.getItem('city');
    return JSON.parse(city)
  } catch (error) {
    console.error('Failed to get city :', error);
    return null;
  }
};

