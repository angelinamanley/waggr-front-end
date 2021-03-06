const API_ENDPOINT = "http://localhost:3000/";
const POSTS_URL = `${API_ENDPOINT}posts`;
const MEETUPS_URL = `${API_ENDPOINT}meetups`;
const LOGIN_URL = `${API_ENDPOINT}login`;
const VALIDATE_URL = `${API_ENDPOINT}validate`;
const SIGNUP_URL = `${API_ENDPOINT}signup`;
const USERS_URL = `${API_ENDPOINT}users`;
const GROUPS_URL = `${API_ENDPOINT}groups`
const DOGS_URL = `${API_ENDPOINT}dogs`
const ATTENDANCES_URL = `${API_ENDPOINT}attendances`
const MEMBERSHIPS_URL = `${API_ENDPOINT}memberships`
const ADDLOCATION_URL = `${API_ENDPOINT}addlocation`

const jsonHeaders = (more = {}) => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...more
  })
  const authHeader = (more = {}) => ({
    Authorisation: localStorage.getItem('token'),
    ...more
  })
  
  const handleError = (e) => {
    // console.error('something went wrong', e)
    throw e
  }
  
  const handleServerResponse = res => {
    if (res.ok) {
      return res.text().then(text => {
        try {
          return JSON.parse(text)
        } catch (error) {
          return { staticPageContent: text }
        }
      })
    } else if (res.status === 503) {
      return { code: 503 }
    } else if (res.status === 500) {
      return { code: 500, error: 'Something went wrong' }
    } else {
      return res.json().then(data  => {
          throw data
      })
    }
  }
  
  const getPosts = () => fetch(POSTS_URL).then(handleServerResponse)
  const getPost = id => fetch(`${POSTS_URL}/${id}`).then(handleServerResponse)

  const getUser = (id) => {
    return fetch(`${USERS_URL}/${id}`).then(handleServerResponse)  }
  
  const login = userDetails =>
    fetch(LOGIN_URL, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ user: userDetails })
    })
      .then(handleServerResponse)
      .then(userDetails => {
        if (userDetails.token) {
          localStorage.setItem('token', userDetails.token)
        }
        return userDetails.user
      })
      .catch(handleError)

  const signup = userDetails =>
      fetch(SIGNUP_URL, {
        method: 'POST',
        headers: jsonHeaders(),
        body: JSON.stringify({ user: userDetails })
      })
        .then(handleServerResponse)
        .then(userDetails => {
          if (userDetails.token) {
            localStorage.setItem('token', userDetails.token)
          }
          return userDetails.user
        })
        .catch(handleError)
  
  const validateUser = () =>
    fetch(VALIDATE_URL, {
      method: 'POST',
      headers: authHeader()
    })
      .then(handleServerResponse)
      .then(userDetails => {
        if (!userDetails) {
          return { errors: ['something went wrong '] }
        }
        if (userDetails.token) {
          localStorage.setItem('token', userDetails.token)
        }
        return userDetails.user || userDetails
      })
      .catch(handleError)
  
  const postPost = post =>
    fetch(POSTS_URL, {
      method: 'POST',
      headers: jsonHeaders(authHeader()),
      body: JSON.stringify({ post })
    })
      .then(handleServerResponse)
      .catch(handleError)
  
  const logout = () => {
    localStorage.removeItem('token')
  }

  const getGroups = () => fetch(GROUPS_URL).then(handleServerResponse)
  const getGroup = id => fetch(`${GROUPS_URL}/${id}`).then(handleServerResponse)



    const joinGroup = (data) => {
        return fetch(MEMBERSHIPS_URL, {
            method: 'POST',
            headers: jsonHeaders(authHeader()),
            body: JSON.stringify( data )
          })
            .then(handleServerResponse)
            .catch(handleError)
        }

    const addDog = (dog) => {
    return fetch(DOGS_URL, {
        method: 'POST',
        headers: jsonHeaders(authHeader()),
        body: JSON.stringify({ dog })
      })
        .then(handleServerResponse)
        .catch(handleError) 
      }

    const leaveGroup = (id) => {
        return fetch(`${MEMBERSHIPS_URL}/${id}`, {
            method: 'delete' }).then(handleServerResponse)
    }

    const postComment = ( post) => {
        return fetch(POSTS_URL, {
            method: 'POST',
            headers: jsonHeaders(authHeader()),
            body: JSON.stringify({ post })
          })
            .then(handleServerResponse)
            .catch(handleError) 
    }

  

    const postMeetup = (meetup) => {
        return fetch(MEETUPS_URL, {
            method: 'POST', 
            headers: jsonHeaders(authHeader()), 
            body: JSON.stringify({meetup})
        })
        .then(handleServerResponse)
            .catch(handleError) 
    }

    const addLocationToUser = (data) => {
        return fetch(`${ADDLOCATION_URL}`, {
            method: 'PATCH',
        headers: jsonHeaders(),
        body: JSON.stringify(data)
        }).then(handleServerResponse)
        .catch(handleError) 
    }

      const postAttendance = ( userId, meetupId ) => {
      return fetch(ATTENDANCES_URL, {
          method: 'POST',
          headers: jsonHeaders(authHeader()),
          body: JSON.stringify({ user_id: userId, meetup_id: meetupId })
        })
          .then(handleServerResponse)
          .catch(handleError) 
  }

  const cancelAttendance = (id) => {
    return fetch(`${ATTENDANCES_URL}/${id}`, {
        method: 'delete' }).then(handleServerResponse)
}
const deletePost = (id) => {
  return fetch(`${POSTS_URL}/${id}`, {
      method: 'delete' }).then(handleServerResponse)
}

    const postGroup = ( group ) => {
    return fetch(GROUPS_URL, {
      method: 'POST',
      headers: jsonHeaders(authHeader()),
      body: JSON.stringify(group)
    })
      .then(handleServerResponse)
      .catch(handleError) 
}

const editGroup = ( group, id ) => {
  return fetch(`${GROUPS_URL}/${id}`, {
    method: 'PATCH',
    headers: jsonHeaders(),
    body: JSON.stringify(group)
  })
    .then(handleServerResponse)
    .catch(handleError) 
}

 const editProfilePicture = (id, data) => {
   return fetch(`${USERS_URL}/${id}`, {
    method: 'PATCH',
    headers: jsonHeaders(),
    body: JSON.stringify({photo: data})
  })
    .then(handleServerResponse)
    .catch(handleError) 
 }

  const getMeetups = () => fetch(MEETUPS_URL).then(handleServerResponse)
   const getMeetup = (id) => fetch(`${MEETUPS_URL}/${id}`).then(handleServerResponse)
  const getDog = (id) => fetch(`${DOGS_URL}/${id}`).then(handleServerResponse)
  const deleteMeetup = (id) => fetch(`${MEETUPS_URL}/${id}`, 
  {
    method: 'DELETE'
  }
  ).then(handleServerResponse)


  const editDog = (id, dog) => fetch(`${DOGS_URL}/${id}`, {
  method: 'PATCH', 
  headers: jsonHeaders(), 
  body: JSON.stringify({dog})
  })
  .then(handleServerResponse)
  
  const deleteDog = (id) => fetch(`${DOGS_URL}/${id}`, 
  {
    method: 'DELETE'
  }
  ).then(handleServerResponse)

  const deleteGroup = (id) => fetch(`${GROUPS_URL}/${id}`, 
  {
    method: 'DELETE'
  }
  ).then(handleServerResponse)


  const editMeetup = (id, meetup) => {
    return fetch(`${MEETUPS_URL}/${id}`, {
        method: 'PATCH', 
        headers: jsonHeaders(authHeader()), 
        body: JSON.stringify({meetup})
    })
    .then(handleServerResponse)
        .catch(handleError) 
}

  export default {
      addDog,
      getGroups, 
    getPosts,
    login,
    validateUser,
    getPost,
    postPost,
    logout, 
    signup, 
    getUser, 
    joinGroup, 
    leaveGroup, 
    postComment, 
    postMeetup, 
    addLocationToUser, 
    getMeetups, 
    postAttendance,
    cancelAttendance, 
    postGroup, 
    editGroup,  
    deletePost, 
    editProfilePicture, 
    getGroup, 
    getMeetup, 
    getDog, 
    deleteMeetup, 
    editMeetup, 
    editDog, deleteDog, deleteGroup
  }
