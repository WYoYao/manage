
export default {
  namespace: 'persion',
  state: {
    count: 0,
  },
  reducers: {
    add(state, reducer) {
      let count = ++state.count;
      return { ...state, count };
    },
    remove(state, reducer) {
      let count = --state.count;
      return { ...state, count };
    }
  },
  effects: {},
  subscriptions: {},
};
