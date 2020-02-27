export const state = () => ({
  users: [
    {
      name: "Alex",
      id: 1
    }
  ]
});

export const mutations = {
  add(state, user) {
    let lastId = [...state.users].pop().id;
    let o = {
      ...user,
      id: lastId + 1
    };
    state.users = [...state.users, o];
  },
  delete(state, userName) {
    let users = [...state.users];
    let len = users.length;
    let index = null;
    for (let i = 0; i < len; i++) {
      if (userName === users[i].name) {
        index = i;
        break;
      }
    }
    users.splice(index, 1);
    state.users = [...users];
  },
  init(state, users) {
    state.users = [...users];
  }
};
