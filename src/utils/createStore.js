const createSubscribable = () => {
  const subscribers = new Set();

  const subscribe = (subscriber) => {
    subscribers.add(subscriber);
    return () => subscribers.delete(subscriber);
  };

  const publish = (msg) => {
    subscribers.forEach((subscriber) => subscriber(msg));
  };

  return { subscribe, publish };
};

export const createStore = (initialState) => {
  const { subscribe, publish } = createSubscribable();

  let state = new Proxy(initialState, {
    set: (target, prop, value) => {
      // ⚠️ Slow comparison whether or not the subscribers should be notified.
      // Keep in mind that this could lead to performance issues (should be fine in this case).
      if (JSON.stringify(target[prop]) === JSON.stringify(value)) {
        return true;
      } else {
        Reflect.set(target, prop, value);
        publish({ target, prop });
        return true;
      }
    },
  });

  const getState = () => state;

  return { getState, subscribe };
};
