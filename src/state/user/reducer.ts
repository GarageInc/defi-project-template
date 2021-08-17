import {
  DEFAULT_ARCHER_ETH_TIP,
  DEFAULT_ARCHER_GAS_ESTIMATE,
  DEFAULT_ARCHER_GAS_PRICES,
  DEFAULT_DEADLINE_FROM_NOW,
  INITIAL_ALLOWED_SLIPPAGE,
} from '../../constants'
import {
  SerializedPair,
  SerializedToken,
  updateMatchesDarkMode,
  updateUserDarkMode,
} from './actions'

import { createReducer } from '@reduxjs/toolkit'
import { updateVersion } from '../global/actions'

const currentTimestamp = () => new Date().getTime()

export interface UserState {
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number

  userDarkMode: boolean | null // the user's choice for dark mode or light mode
  matchesDarkMode: boolean // whether the dark mode media query matches

  userExpertMode: boolean

  userSingleHopOnly: boolean // only allow swaps on direct pairs

  // user defined slippage tolerance in bips, used in all txns
  userSlippageTolerance: number | 'auto'

  // deadline set by user in minutes, used in all txns
  userDeadline: number

  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken
    }
  }

  pairs: {
    [chainId: number]: {
      // keyed by token0Address:token1Address
      [key: string]: SerializedPair
    }
  }

  timestamp: number
  URLWarningVisible: boolean

  userArcherUseRelay: boolean // use relay or go directly to router
  userArcherGasPrice: string // Current gas price
  userArcherETHTip: string // ETH tip for relay, as full BigInt string
  userArcherGasEstimate: string // Gas estimate for trade
  userArcherTipManualOverride: boolean // is user manually entering tip
}

function pairKey(token0Address: string, token1Address: string) {
  return `${token0Address};${token1Address}`
}

export const initialState: UserState = {
  userDarkMode: null,
  matchesDarkMode: false,
  userExpertMode: false,
  userSingleHopOnly: false,
  userSlippageTolerance: INITIAL_ALLOWED_SLIPPAGE,
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  tokens: {},
  pairs: {},
  timestamp: currentTimestamp(),
  URLWarningVisible: true,
  userArcherUseRelay: false,
  userArcherGasPrice: DEFAULT_ARCHER_GAS_PRICES[4].toString(),
  userArcherETHTip: DEFAULT_ARCHER_ETH_TIP.toString(),
  userArcherGasEstimate: DEFAULT_ARCHER_GAS_ESTIMATE.toString(),
  userArcherTipManualOverride: false,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateVersion, (state) => {
      // slippage isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (typeof state.userSlippageTolerance !== 'number') {
        state.userSlippageTolerance = INITIAL_ALLOWED_SLIPPAGE
      }

      // deadline isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (typeof state.userDeadline !== 'number') {
        state.userDeadline = DEFAULT_DEADLINE_FROM_NOW
      }

      state.lastUpdateVersionTimestamp = currentTimestamp()
    })
    .addCase(updateUserDarkMode, (state, action) => {
      state.userDarkMode = action.payload.userDarkMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateMatchesDarkMode, (state, action) => {
      state.matchesDarkMode = action.payload.matchesDarkMode
      state.timestamp = currentTimestamp()
    })

)
