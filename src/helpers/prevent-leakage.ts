/** This function helps prevent state update in an unmounted component.*/
export const preventLeakage = () => {
  let subscribed = true;

  return {
    watch:
      (fn: any) =>
      (...args: any) => {
        if (subscribed) {
          return fn(...args);
        }
        return null;
      },
    subscribe: () => {
      subscribed = true;
    },
    unsubscribe: () => {
      subscribed = false;
    },
  };
};
