const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject (error)
                }
            );
        } else {
            reject(new Error('Twoja przegladarka nie obsługuje geolokalizacji'));
        }
    })
}

export default getCurrentLocation;