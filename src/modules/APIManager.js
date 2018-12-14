const remoteURL = "http://localhost:5002"

const APIManager = {

  // This is my datamanager.  This is where I do all my fetching. resource=the name of the array of things I'm grabbing (birds, sightings)

  getEntry(resource, id, ...search) {
    return fetch(`${remoteURL}/${resource}/${id}${search}`)
    .then(data => data.json())
  },

  // this is for grabbing all the things and making them available
  getAllEntries(resource, ...search) {
    return fetch(`${remoteURL}/${resource}${search}`)
    .then(data => data.json())
  },

  // this is for deleting things, you'll need the id of the thing
  deleteEntry(resource, id){
    return fetch(`${remoteURL}/${resource}/${id}`, {method: "DELETE"})
    .then(data => data.json())
  },

  // this is for adding things, it will need a new obj so it knows what to store in the DB
  addEntry(resource, newThing) {
    return fetch(`${remoteURL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newThing)
    }).then(data => data.json())
  },

  // this is for editing things, it will need an id and an edited object to patch to the DB
  editEntry(resource, id, editedThing) {
    return fetch(`${remoteURL}/${resource}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedThing)
    })
  }
}

export default APIManager