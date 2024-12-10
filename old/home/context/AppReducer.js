export const initialState = {
  checkedHeader: false,
  checkedDark: false,
}
export const AppReducer = (state, action) => {
  switch (action.type) {
    case "init_stored": {
      return action.value
    }

    case "set_checked_header": {
      return {
        ...state,
        checkedHeader: action.value,
      }
    }
    case "set_checked_dark": {
      return {
        ...state,
        checkedDark: action.value,
      }
    }
    case "change_checked_header": {
      return {
        ...state,
        checkedHeader: !state?.checkedHeader,
      }
    }
    case "change_checked_dark": {
      return {
        ...state,
        checkedDark: !state?.checkedDark,
      }
    }
  }
}
