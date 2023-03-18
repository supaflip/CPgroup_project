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

//fetch all weeks
const fetchWeeks = async () => {
  const url = BASE_URL
  return await tryCatchFetch(url);
}

//fetch all profiles
const fetchProfiles = async () => {
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


const exportItems = {
  fetchWeeks,
  fetchProfiles,
  fetchProfileByID,
  fetchProfile
}

export default exportItems




// const BASE_URL = "http://127.0.0.1:8000/workouts/";

// const tryCatchFetch = async (url) => {
//   const token = localStorage.getItem("token");

//   const headers = {};
//   if (token) {
//     headers.Authorization = `Token ${token}`;
//   }

//   try {
//     const response = await fetch(url, { headers });
//     if (response.ok) {
//       return await response.json();
//     } else {
//       throw new Error(
//         `Bad response: ${response.status} ${response.statusText}`
//       );
//     }
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };

// //fetch all weeks
// const fetchWeeks = async () => {
//   const url = BASE_URL;
//   return await tryCatchFetch(url);
// };

// //fetch all profiles
// const fetchProfiles = async () => {
//   const url = BASE_URL + "profiles/";
//   return await tryCatchFetch(url);
// };

// //fetch one profile
// const fetchProfilesByID = async (userID) => {
//   const url = BASE_URL + `profile/${userID}/`;
//   return await tryCatchFetch(url);
// };

// const exportItems = {
//   fetchWeeks,
//   fetchProfiles,
//   fetchProfilesByID,
// };

// export default exportItems;
