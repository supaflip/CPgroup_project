const BASE_URL = "http://127.0.0.1:8000/workouts/"  

const tryCatchFetch = async (url) => {

  const token = localStorage.getItem("token")
  
  const headers = {}
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  try {
    const response = await fetch(url, {headers})
    if (response.ok) {
      return await response.json()
    }
    else {
      throw new Error(`Bad response: ${response.status} ${response.statusText}`)
    }
  }
  catch (e) {
    console.error(e)
    return null
  }
}

const tryPost = async (url, data) => {

  const token = localStorage.getItem("token")
  
  const headers = {"Content-type": 'application/json'}
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  try {
    const response = await fetch(url, {method: 'POST', body: JSON.stringify(data), headers})
    if (response.ok) {
      return await response.json()
    }
  else {
      throw new Error(`Bad response: ${response.status} ${response.statusText}`)
    }
  }
  catch (e) {
    console.error(e)
    return null
}
}

//fetch all weeks
const fetchWeeks = async () => {
  const url = BASE_URL
  return await tryCatchFetch(url);
}

//fetch all profiles
const fetchAllProfiles = async () => {
  const url = BASE_URL + "profiles/"
  return await tryCatchFetch(url);
}

//fetch one profile
const fetchProfileByID = async (userID) => {
  const url = BASE_URL + `profile/${userID}/`
  return await tryCatchFetch(url);
}

const fetchProfile = async () => {
  const url = BASE_URL + `profile/`
  return await tryCatchFetch(url);
}

const fetchMuscleWorkout = async (muscle) => {
  const url = BASE_URL + 'helper/'
  //console.log(muscle)
  const data = {"muscle": muscle}
  return await tryPost(url, data);
}

//fetch all profiles
const fetchProfilesForCoachesOnly = async () => {
  const url = BASE_URL + "is_coach/profiles/"
  return await tryCatchFetch(url);
}

//fetch one profile
const fetchProfileByIDForCoachesOnly = async (userID) => {
  const url = BASE_URL + `is_coach/profile/${userID}/`
  return await tryCatchFetch(url);
}


const exportItems = {
  fetchWeeks,
  fetchAllProfiles,
  fetchProfileByID,
  fetchProfile,
  fetchMuscleWorkout,
  fetchProfilesForCoachesOnly,
  fetchProfileByIDForCoachesOnly
}

export default exportItems
