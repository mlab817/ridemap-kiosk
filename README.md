# RIDEMAP: Passenger Count through Smartphones and Tablets as Kiosk Machine

## Description

This mobile app allows registered smartphones to upload data
of passenger destination station information user inputted
in a device set up like "kiosks".

## Requirements

1. [Free Expo account](https://expo.dev/signup)
2. Laravel for backend development
3. React Native and Expo for mobile app development
4. Smartphones / tablets

The Laravel backend for the Ridemap already supports this app. The
endpoint for submission of data is `/api/kiosks`. The backend
accepts an array of `passengers` with the following attributes: `originStationId`,
`destinationStationId`, and `timestamp`. `device_id` is extracted from a token
used to authenticate the device.

## Building the App

Since this app has been created with [expo](expo.dev),
the app can also be built with it through the
[Expo Application Services](https://docs.expo.dev/eas/).
To do this make sure that `eas-cli` is installed in your
computer with `npm i -g eas-cli`. Then, in your app's root
directory, just run `eas build` and follow the instruction.
You can view the progress in [expo.dev](https://expo.dev/) 
website, i.e. dashboard. Afterwards, you can download the 
app bundle which you can distribute to users or submit to
app / play store.

__Important__: Do not forget to update the api configuration in the
`utils.js` file to point to the url of the API of the backend. Specifically,
this line:

```
export const api = axios.create({
   baseURL: 'https://ridemap-php.herokuapp.com/api'
})
```

## Workflow

### Device Authentication

To use this app, devices must be registered in the server. To do
this, follow the instructions below:

1. Download the app
2. Open the app to connect to the server for the first time
3. The app will show an invalid device message along with the device ID.
Use this device ID to register the device in the server.

`
Note: The device ID does not refer to the actual device ID of the
device but rather the device ID of the app tied to the server. This
is unique for every app that is installed in the device.`

Read more here: [Android](https://docs.expo.dev/versions/v45.0.0/sdk/application/#applicationandroidid)
and [iOS](https://docs.expo.dev/versions/v45.0.0/sdk/application/#applicationgetiosidforvendorasync)

### Using the App

1. Open app
2. Device connects to server
3. Server verifies that device is registered
   1. If device is not registered, display invalid device message along with the device ID. Note that the device ID is not the actual device ID but rather the ID of the device tied with the app.
   2. If device is registered, proceed
4. Prompt user to select station where it is located
5. Set up the device as a kiosk in front of or inside vehicles
6. Passengers can now select their destination

The app will send data for 10 entries. Data submission can also be triggered
manually.

## Table Structure

### - users

Stores data of users of the system

| Attribute | Type      | Description                                            |
|-----------|-----------|--------------------------------------------------------|
| id        | int autoincrement  | Primary key of the table |
| name      | varchar   | Name of the user                 |
| email     | varchar   | Email of the user               |
| email_verified_at     | timestamp   | Timestamp when the user validated their email              |
| password  | varchar   | Hashed password of the user     |
| device_id | varchar   | Device ID of the user               | |
| created_at| timestamp | Timestamp when the record was saved in the database    |
| updated_at| timestamp | Timestamp when the record was updated in the database  |

### - stations

Stores data of stations in EDSA Busway

| Attribute | Type               | Description              |
|-----------|--------------------|--------------------------|
| id        | int autoincrement  | Primary key of the table |
| name      | varchar            | Name of the station      |
| created_at| timestamp | Timestamp when the record was saved in the database    |
| updated_at| timestamp | Timestamp when the record was updated in the database  |

### - passenger_qrs

Stores data on scanned QR codes

| Attribute | Type      | Description                                            |
|-----------|-----------|--------------------------------------------------------|
| id        | int autoincrement | Primary key of the table                 |
| origin_station_id| int       | Foreign key referencing stations table (where data was collected)                 |
| destination_station_id   | varchar   | Foreign key referencing stations table (chosen destination)              |
| captured_at| timestamp | Timestamp when the entry was generated |
| user_id   | int       | Foreign key referencing users table    |
| created_at| timestamp | Timestamp when the record was saved in the database    |
| updated_at| timestamp | Timestamp when the record was updated in the database  |

## Limitations

This app offers the easiest way to collect data on passenger count. 
However, there is no way to ensure the quality of data as anyone can press the 
buttons on the device.

The size of the device matters to fast track inputting by passengers as they
will need to find their destination station in the screen. Providing information
beforehand on the layout of the station buttons would help ease this process.