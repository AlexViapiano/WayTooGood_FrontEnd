import { actionTypes } from './action'

const initialState = {
  products: [],
  selectedDiets: [],
  category: '',
  brand: '',
  sale: false,
  varietyPacks: false,
  searchText: null,
  sort: 'priority',
  sortDirection: 'DESC',
  view: '56',
  start: 0,
  similarProducts: [],
  isLoading: false,
  canLoadMore: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REFRESH_PRODUCTS:
      return {
        ...state,
        products: [],
        start: 0,
      }

    case actionTypes.REQUEST_PRODUCTS:
      return {
        ...state,
        isLoading: true,
        searchText: action.payload.searchText,
      }
    case actionTypes.RECIEVE_PRODUCTS:
      const start = parseInt(action.payload.start)
      const newStart = state.start + start
      const numbProductsReceived = action.payload.products.length
      return {
        ...state,
        products: state.products.concat(action.payload.products),
        start: newStart,
        isLoading: false,
        canLoadMore: numbProductsReceived == start,
      }
    case actionTypes.SET_DIET:
      if (action.payload.reset) {
        return {
          ...state,
          selectedDiets: [action.payload.diet],
          category: '',
          varietyPacks: false,
          sale: false,
          products: [],
          start: 0,
          searchText: null,
        }
      } else if (state.selectedDiets.includes(action.payload.diet)) {
        return state
      } else {
        return {
          ...state,
          selectedDiets: [...state.selectedDiets, action.payload.diet],
          products: [],
          start: 0,
        }
      }

    case actionTypes.REMOVE_DIET:
      var filteredDiets = state.selectedDiets.filter(diet => {
        return diet != action.payload.diet.id
      })
      return {
        ...state,
        selectedDiets: filteredDiets,
        products: [],
        start: 0,
      }
    case actionTypes.SET_CATEGORY:
      if (action.payload.reset) {
        return {
          ...state,
          selectedDiets: [],
          category: action.payload.category,
          varietyPacks: false,
          sale: false,
          products: [],
          start: 0,
          searchText: null,
        }
      } else {
        return {
          ...state,
          category: action.payload.category,
          products: [],
          start: 0,
        }
      }

    case actionTypes.SET_BRAND:
      return {
        ...state,
        brand: action.payload.brand,
        products: [],
        start: 0,
      }
    case actionTypes.SET_SALE:
      const resetCategorySale = action.payload.sale ? true : false
      if (resetCategorySale) {
        return {
          ...state,
          category: '',
          sale: action.payload.sale,
          products: [],
          start: 0,
          searchText: null,
        }
      } else
        return {
          ...state,
          sale: action.payload.sale,
          products: [],
          start: 0,
        }
    case actionTypes.SET_VARIETY_PACKS:
      const resetCategory = action.payload.varietyPacks ? true : false
      if (resetCategory) {
        return {
          ...state,
          category: '',
          varietyPacks: action.payload.varietyPacks,
          products: [],
          start: 0,
          searchText: null,
        }
      } else
        return {
          ...state,
          varietyPacks: action.payload.varietyPacks,
          products: [],
          start: 0,
        }
    case actionTypes.RESET_FILTERS:
      return {
        ...state,
        products: [],
        selectedDiets: [],
        category: '',
        brand: '',
        varietyPacks: false,
        sale: false,
        sort: 'rating',
        sortDirection: 'ASC',
        view: '28',
        start: 0,
        searchText: null,
      }
    case actionTypes.SET_SORT:
      return {
        ...state,
        products: [],
        start: 0,

        sort: action.payload.sort,
      }
    case actionTypes.SET_SORT_DIRECTION:
      return {
        ...state,
        sortDirection: action.payload.sortDirection,
        products: [],
        start: 0,
      }
    case actionTypes.SET_VIEW:
      return {
        ...state,
        view: action.payload.view,
        products: [],
        start: 0,
      }
    case actionTypes.RECIEVE_SIMILAR_PRODUCTS:
      return {
        ...state,
        similarProducts: action.payload.products,
      }

    default:
      return state
  }
}
