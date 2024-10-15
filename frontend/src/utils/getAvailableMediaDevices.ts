// Fetch available media devices

const getAvailableDevices = async () => {
  try {
    const deviceInfos = await navigator.mediaDevices.enumerateDevices();
    return deviceInfos;
  } catch (error) {
    console.error("Error fetching devices:", error);
  }
};

export default getAvailableDevices;
