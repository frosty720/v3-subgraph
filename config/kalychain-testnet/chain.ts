import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const FACTORY_ADDRESS = '0x709E8f0C1dd43C81263fEAe6f0847E2d6506e57b'

export const REFERENCE_TOKEN = '0x069255299Bb729399f3CECaBdc73d15d3D10a2A3' // wKLC
export const STABLE_TOKEN_POOL = '0xb1803E9F09D21221827DB2EcDbcC6dc2d64DBDe4' // wKLC/BUSD

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
    '0xA510Df56F2aa3f7241da94F2cF053C1bf02E1168', // BUSD
]

// Add known stablecoins here if any
export const STABLE_COINS: string[] = [
    '0xA510Df56F2aa3f7241da94F2cF053C1bf02E1168', // BUSD
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
