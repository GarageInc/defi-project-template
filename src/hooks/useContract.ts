
import {
  WNATIVE,
} from '@sushiswap/sdk'


import { Contract } from '@ethersproject/contracts'
import EIP_2612_ABI from '../constants/abis/eip-2612.json'
import ERC20_ABI from '../constants/abis/erc20.json'
import WETH9_ABI from '../constants/abis/weth.json'
import { getContract } from '../functions/contract'
import { useActiveWeb3React } from './useActiveWeb3React'
import { useMemo } from 'react'

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612_ABI, false)
}

// returns null on errors
export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETH9Contract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WNATIVE[chainId].address : undefined, WETH9_ABI, withSignerIfPossible)
}
