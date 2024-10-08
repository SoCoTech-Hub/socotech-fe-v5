export const initialState = {
  checkedHeader: false,
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
   case "change_checked_header": {
      return {
        ...state,
        checkedHeader: !state?.checkedHeader,
      }
    }
    }
}
