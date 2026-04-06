import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const FACTORY_ADDRESS = '0x93d72B9f57bed44Ada9712c022ccB3a9B2dA07BE'

export const REFERENCE_TOKEN = '0x069255299Bb729399f3CECaBdc73d15d3D10a2A3' // wKLC
export const STABLE_TOKEN_POOL = '' // Will be set once first KLC/stablecoin V3 pool is created

export const TVL_MULTIPLIER_THRESHOLD = '2'
export const MATURE_MARKET = '100'
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('1')

export const ROLL_DELETE_HOUR = 768
export const ROLL_DELETE_MINUTE = 1680

export const ROLL_DELETE_HOUR_LIMITER = BigInt.fromI32(500)
export const ROLL_DELETE_MINUTE_LIMITER = BigInt.fromI32(1000)

// token where amounts should contribute to tracked volume and liquidity
export const WHITELIST_TOKENS: string[] = [
    REFERENCE_TOKEN, // wKLC
    '0x2CA775C77B922A51FcF3097F52bFFdbc0250D99A', // USDT
    '0x9cAb0c396cF0F4325913f2269a0b72BD4d46E3A9', // USDC
    '0x6E92CAC380F7A7B86f4163fad0df2F277B16Edc6', // DAI
    '0xaA77D4a26d432B82DB07F8a47B7f7F623fd92455', // WBTC
    '0xfdbB253753dDE60b11211B169dC872AaE672879b', // ETH
    '0x0e2318b62a096AC68ad2D7F37592CBf0cA9c4Ddb', // BNB
    '0xCC93b84cEed74Dc28c746b7697d6fA477ffFf65a', // KSWAP
]

// Known stablecoins on KalyChain mainnet
export const STABLE_COINS: string[] = [
    '0x2CA775C77B922A51FcF3097F52bFFdbc0250D99A', // USDT
    '0x9cAb0c396cF0F4325913f2269a0b72BD4d46E3A9', // USDC
    '0x6E92CAC380F7A7B86f4163fad0df2F277B16Edc6', // DAI
]

export const SKIP_POOLS: string[] = []

export const POOL_MAPINGS: Array<Address[]> = []

export class TokenDefinition {
    address: Address
    symbol: string
    name: string
    decimals: BigInt
}

export const STATIC_TOKEN_DEFINITIONS: TokenDefinition[] = []
