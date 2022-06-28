import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import {Platform} from "react-native";
import Toast from "react-native-root-toast";

/**
 * Create axios instance to use in all requests
 * Replace baseURL to point to the API endpoint
 *
 * @type {AxiosInstance}
 */
export const api = axios.create({
    baseURL: 'https://ridemap.thedeveconomist.com/api'
})

/**
 * Add token to request
 */
api.interceptors.request.use(async (config) => {
        const token = Platform.OS !== 'web'
            ? await SecureStore.getItemAsync('RIDEMAP_TOKEN')
            : localStorage.getItem('RIDEMAP_TOKEN')

        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }

        return config
    }, e => console.log(`error in axios config: `, e)
)

/**
 * Handle device authentication
 *
 * @param deviceId
 * @returns {Promise<boolean>}
 */
export const deviceAuthentication = async (deviceId) => {
    try {
        const response = await api.post('/device-auth', {
            device_id: deviceId
        })

        console.log(`token: ${JSON.stringify(response.data.token)}`)

        if (response.data.success) {
            // store token
            if (Platform.OS !== 'web') {
                await SecureStore.setItemAsync('RIDEMAP_TOKEN', response.data.token)
            } else {
                localStorage.setItem('RIDEMAP_TOKEN', response.data.token)
            }

        } else {
            return false
        }

        return true
    } catch (e) {
        console.log(`error in device authentication: `, e)
        return false
    }
}

/**
 * Handle fetching stations from backend
 *
 * @returns {Promise<*[]|any>}
 */
export const fetchStations = async () => {
    try {
        const response = await api.get('/stations')

        return response.data
    } catch (e) {
        console.log(`error in fetching stations: `, e)

        return []
    }
}

/**
 * Handle submission of faces data to backend
 *
 * @returns {Promise<*>}
 * @param passengers
 */
export const submitPassengers = async (passengers) => {
    try {
        const response = await api.post('/kiosks', {
            passengers: passengers
        })

        console.log(response.data)

        Toast.show(response.data.data, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            hideOnPress: true
        })

        return response.data.success
    } catch (e) {
        console.log(`error in submitPassengers: `, e)

        Toast.show(e.message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            hideOnPress: true
        })
    }
}
