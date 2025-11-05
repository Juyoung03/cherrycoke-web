import { Geolocation } from '@capacitor/geolocation';

export async function getCurrentPosition(options) {
  if (typeof Geolocation !== 'undefined' && Geolocation.getCurrentPosition) {
    // Capacitor Geolocation 사용 (네이티브 GPS)
    try {
      const position = await Geolocation.getCurrentPosition(options);
      return {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed
        },
        timestamp: position.timestamp
      };
    } catch (error) {
      throw error;
    }
  } else if (navigator.geolocation) {
    // 웹 Geolocation 사용 (폴백)
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  } else {
    throw new Error("Geolocation is not supported by this device or browser.");
  }
}

export async function watchPosition(successCallback, errorCallback, options) {
  if (typeof Geolocation !== 'undefined' && Geolocation.watchPosition) {
    // Capacitor Geolocation 사용 (네이티브 GPS)
    try {
      const watchId = await Geolocation.watchPosition(options, (position, err) => {
        if (err) {
          errorCallback(err);
        } else {
          // Capacitor의 position을 navigator.geolocation 형식으로 변환
          const convertedPosition = {
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              altitude: position.coords.altitude,
              altitudeAccuracy: position.coords.altitudeAccuracy,
              heading: position.coords.heading,
              speed: position.coords.speed
            },
            timestamp: position.timestamp
          };
          successCallback(convertedPosition);
        }
      });
      return watchId;
    } catch (error) {
      errorCallback(error);
      return null;
    }
  } else if (navigator.geolocation) {
    // 웹 Geolocation 사용 (폴백)
    return navigator.geolocation.watchPosition(successCallback, errorCallback, options);
  } else {
    throw new Error("Geolocation is not supported by this device or browser.");
  }
}

export async function clearWatch(watchId) {
  if (typeof Geolocation !== 'undefined' && Geolocation.clearWatch) {
    // Capacitor Geolocation 사용
    await Geolocation.clearWatch({ id: watchId });
  } else if (navigator.geolocation) {
    // 웹 Geolocation 사용
    navigator.geolocation.clearWatch(watchId);
  }
}

