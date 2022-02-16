function createSubscribable() {
  const subscribers = new Set();

  const subscribe = (subscriber) => {
    subscribers.add(subscriber);
    return () => subscribers.delete(subscriber);
  };

  const publish = (msg) => {
    subscribers.forEach((subscriber) => subscriber(msg));
  };

  return { subscribe, publish };
}

function createStore(initialState) {
  const { subscribe, publish } = createSubscribable();

  const state = new Proxy(initialState, {
    set: (target, prop, value) => {
      // ⚠️ Slow comparison whether or not the subscribers should be notified.
      // Keep in mind that this could lead to performance issues (should be fine in this case).
      if (JSON.stringify(target[prop]) !== JSON.stringify(value)) {
        Reflect.set(target, prop, value);
        publish({ target, prop });
        return true;
      }
    },
  });

  /** Readonly state */
  const getState = () => {
    const stateCopy = { ...state };
    return Object.freeze(stateCopy);
  };

  const setState = (fn) => {
    let newState = {};

    if (typeof fn === "function") {
      newState = fn(state);
    } else {
      newState = fn ?? {};
    }

    Object.entries(newState).forEach(([key, value]) => {
      if (!state.hasOwnProperty(key)) {
        return;
      }
      state[key] = value;
    });
  };

  const dispatch = (newState) => {
    setState(newState);
  };

  return { getState, subscribe, dispatch };
}

export { createStore };
