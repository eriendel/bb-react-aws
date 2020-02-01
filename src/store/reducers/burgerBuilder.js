import * as actionTypes from '../actions/actionTypes';

const DEFAULT_PRICE = 4;

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4
};

const initialState = {
  ingredients: null,
  totalPrice: DEFAULT_PRICE,
  error: false,
  isBuilding: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        isBuilding: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      const newTotalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName];
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: newTotalPrice,
        isBuilding: newTotalPrice !== DEFAULT_PRICE
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: DEFAULT_PRICE,
        error: false,
        isBuilding: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
