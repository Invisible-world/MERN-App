import { createContext, useReducer } from "react";

export const AppContext = createContext({});

const initialState = {
  isAuthenticated: false,
  isError: false,
  token: null,
  user: null,
  userTodo: null,
};

function AppReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        token: payload.token,
      };
    case "LOG_USER":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
      };
    case "GET_USER_TODO":
      return {
        ...state,
        userTodo: payload && payload ? payload : "Where is Todo :)",
      };

    default:
      return state;
  }
}

export const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  console.log(state);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
