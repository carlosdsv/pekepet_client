const db = {
  name: 'Maya',
  pets: [
    {
      petId: '1',
      name: 'Arya',
      species: 'dog',
      breed: 'Pembroke Corgi',
      birthDate: '22 Dec 2020',
      notes: 'aditional notes...',
      profilePicture:
        'https://images.unsplash.com/photo-1570566998157-0df9e6f8d5f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=675&q=80',
    },
    {
      petId: '2',
      name: 'Puchi',
      species: 'dog',
      breed: 'Beagle',
      birthDate: '03 Mar 2017',
      notes: 'aditional notes...',
      profilePicture:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80',
    },
  ],
  events: {
    1: {
      11: {
        upcoming: false,
        date: 'Tue Apr 20 2021',
        type: 'vaccine',
        description: 'vacuna',
        notes: 'aditional notes',
      },
      12: {
        upcoming: false,
        date: 'Tue Apr 19 2021',
        type: 'deworm',
        description: 'desparacito',
        notes: 'aditional notes',
      },
      13: {
        upcoming: false,
        date: 'Tue Apr 18 2021',
        type: 'deworm',
        description: 'desparacito',
        notes: 'aditional notes',
      },
      14: {
        upcoming: false,
        date: 'Tue Apr 17 2021',
        type: 'other',
        description: 'ate something at park',
        notes: 'aditional notes',
      },
      15: {
        upcoming: true,
        date: 'Tue Nov 18 2021',
        type: 'deworm',
        description: 'desparacito',
        notes: 'aditional notes',
      },
      16: {
        upcoming: true,
        date: 'Tue Dec 20 2021',
        type: 'vaccine',
        description: 'vacuna',
        notes: 'aditional notes',
      },
    },
    2: {
      11: {
        upcoming: false,
        date: 'Tue Apr 20 2021',
        type: 'vaccine',
        description: 'vacuna',
        notes: 'aditional notes',
      },
      12: {
        upcoming: false,
        date: 'Tue Apr 19 2021',
        type: 'deworm',
        description: 'desparacito',
        notes: 'aditional notes',
      },
      13: {
        upcoming: false,
        date: 'Tue Apr 18 2021',
        type: 'deworm',
        description: 'desparacito',
        notes: 'aditional notes',
      },
      14: {
        upcoming: false,
        date: 'Tue Apr 17 2021',
        type: 'other',
        description: 'ate something at park',
        notes: 'aditional notes',
      },
      15: {
        upcoming: true,
        date: 'Tue Nov 18 2021',
        type: 'deworm',
        description: 'desparacito',
        notes: 'aditional notes',
      },
      16: {
        upcoming: true,
        date: 'Tue Dec 20 2021',
        type: 'vaccine',
        description: 'vacuna',
        notes: 'aditional notes',
      },
    },
  },
}

export default db
