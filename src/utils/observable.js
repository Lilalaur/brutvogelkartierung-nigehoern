const createSubscribable = () => {
  const subscribers = new Set();

  return {
    subscribe(cb) {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },

    publish(msg) {
      subscribers.forEach((cb) => cb(msg));
    },
  };
};

export const createObservable = (data) => {
  const subscribers = createSubscribable();

  return new Proxy(
    {
      ...data,
      subscribe: subscribers.subscribe,
    },
    {
      set: function (target, prop, value) {
        Reflect.set(target, prop, value);
        subscribers.publish({
          target,
          prop,
        });
        return true;
      },
    }
  );
};
