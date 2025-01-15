const strategyABI = {
  abi: [
    {
      inputs: [{ internalType: "address", name: "_engine", type: "address" }],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    { inputs: [], name: "CallerNotConnector", type: "error" },
    { inputs: [], name: "CallerNotEngine", type: "error" },
    { inputs: [], name: "InvalidActionType", type: "error" },
    { inputs: [], name: "InvalidAmountRatio", type: "error" },
    { inputs: [], name: "InvalidSteps", type: "error" },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "strategyId", type: "bytes32" },
      ],
      name: "StrategyAlreadyExists",
      type: "error",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "strategyId", type: "bytes32" },
      ],
      name: "StrategyNotFound",
      type: "error",
    },
    { inputs: [], name: "ZeroAddress", type: "error" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "strategyId",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "curator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "strategyDescription",
          type: "string",
        },
        {
          components: [
            { internalType: "address", name: "connector", type: "address" },
            {
              internalType: "enum IConnector.ActionType",
              name: "actionType",
              type: "uint8",
            },
            { internalType: "address[]", name: "assetsIn", type: "address[]" },
            { internalType: "address", name: "assetOut", type: "address" },
            { internalType: "uint256", name: "amountRatio", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          indexed: false,
          internalType: "struct ILiquidStrategy.Step[]",
          name: "steps",
          type: "tuple[]",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "minDeposit",
          type: "uint256",
        },
      ],
      name: "CreateStrategy",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferStarted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "approveConnector",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        {
          internalType: "string",
          name: "_strategyDescription",
          type: "string",
        },
        {
          components: [
            { internalType: "address", name: "connector", type: "address" },
            {
              internalType: "enum IConnector.ActionType",
              name: "actionType",
              type: "uint8",
            },
            { internalType: "address[]", name: "assetsIn", type: "address[]" },
            { internalType: "address", name: "assetOut", type: "address" },
            { internalType: "uint256", name: "amountRatio", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          internalType: "struct ILiquidStrategy.Step[]",
          name: "_steps",
          type: "tuple[]",
        },
        { internalType: "uint256", name: "_minDeposit", type: "uint256" },
      ],
      name: "createStrategy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllStrategies",
      outputs: [
        {
          components: [
            { internalType: "bytes32", name: "strategyId", type: "bytes32" },
            { internalType: "address", name: "curator", type: "address" },
            { internalType: "string", name: "name", type: "string" },
            {
              internalType: "string",
              name: "strategyDescription",
              type: "string",
            },
            {
              components: [
                { internalType: "address", name: "connector", type: "address" },
                {
                  internalType: "enum IConnector.ActionType",
                  name: "actionType",
                  type: "uint8",
                },
                {
                  internalType: "address[]",
                  name: "assetsIn",
                  type: "address[]",
                },
                { internalType: "address", name: "assetOut", type: "address" },
                {
                  internalType: "uint256",
                  name: "amountRatio",
                  type: "uint256",
                },
                { internalType: "bytes", name: "data", type: "bytes" },
              ],
              internalType: "struct ILiquidStrategy.Step[]",
              name: "steps",
              type: "tuple[]",
            },
            { internalType: "uint256", name: "minDeposit", type: "uint256" },
          ],
          internalType: "struct ILiquidStrategy.Strategy[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "_strategyId", type: "bytes32" },
      ],
      name: "getStrategy",
      outputs: [
        {
          components: [
            { internalType: "bytes32", name: "strategyId", type: "bytes32" },
            { internalType: "address", name: "curator", type: "address" },
            { internalType: "string", name: "name", type: "string" },
            {
              internalType: "string",
              name: "strategyDescription",
              type: "string",
            },
            {
              components: [
                { internalType: "address", name: "connector", type: "address" },
                {
                  internalType: "enum IConnector.ActionType",
                  name: "actionType",
                  type: "uint8",
                },
                {
                  internalType: "address[]",
                  name: "assetsIn",
                  type: "address[]",
                },
                { internalType: "address", name: "assetOut", type: "address" },
                {
                  internalType: "uint256",
                  name: "amountRatio",
                  type: "uint256",
                },
                { internalType: "bytes", name: "data", type: "bytes" },
              ],
              internalType: "struct ILiquidStrategy.Step[]",
              name: "steps",
              type: "tuple[]",
            },
            { internalType: "uint256", name: "minDeposit", type: "uint256" },
          ],
          internalType: "struct ILiquidStrategy.Strategy",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_curator", type: "address" }],
      name: "getStrategy",
      outputs: [
        {
          components: [
            { internalType: "bytes32", name: "strategyId", type: "bytes32" },
            { internalType: "address", name: "curator", type: "address" },
            { internalType: "string", name: "name", type: "string" },
            {
              internalType: "string",
              name: "strategyDescription",
              type: "string",
            },
            {
              components: [
                { internalType: "address", name: "connector", type: "address" },
                {
                  internalType: "enum IConnector.ActionType",
                  name: "actionType",
                  type: "uint8",
                },
                {
                  internalType: "address[]",
                  name: "assetsIn",
                  type: "address[]",
                },
                { internalType: "address", name: "assetOut", type: "address" },
                {
                  internalType: "uint256",
                  name: "amountRatio",
                  type: "uint256",
                },
                { internalType: "bytes", name: "data", type: "bytes" },
              ],
              internalType: "struct ILiquidStrategy.Step[]",
              name: "steps",
              type: "tuple[]",
            },
            { internalType: "uint256", name: "minDeposit", type: "uint256" },
          ],
          internalType: "struct ILiquidStrategy.Strategy[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "_strategyId", type: "bytes32" },
        { internalType: "address[]", name: "_assets", type: "address[]" },
      ],
      name: "getStrategyStats",
      outputs: [
        { internalType: "uint256[]", name: "totalDeposits", type: "uint256[]" },
        { internalType: "uint256", name: "totalUsers", type: "uint256" },
        { internalType: "uint256", name: "totalFeeGenerated", type: "uint256" },
        { internalType: "uint256", name: "lastUpdated", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTotalStrategies",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "_strategyId", type: "bytes32" },
        { internalType: "address", name: "_user", type: "address" },
        { internalType: "address[]", name: "_assets", type: "address[]" },
        { internalType: "uint256", name: "_stepIndex", type: "uint256" },
      ],
      name: "getUserAssetBalance",
      outputs: [
        {
          components: [
            { internalType: "address[]", name: "assets", type: "address[]" },
            { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
          ],
          internalType: "struct ILiquidStrategy.AssetBalance",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "_strategyId", type: "bytes32" },
        { internalType: "address", name: "_user", type: "address" },
        { internalType: "address", name: "_protocol", type: "address" },
        { internalType: "address", name: "_shareToken", type: "address" },
        { internalType: "uint256", name: "_stepIndex", type: "uint256" },
      ],
      name: "getUserShareBalance",
      outputs: [
        {
          components: [
            { internalType: "address", name: "protocol", type: "address" },
            { internalType: "address", name: "shareToken", type: "address" },
            { internalType: "uint256", name: "shareAmount", type: "uint256" },
            {
              internalType: "address[]",
              name: "underlyingTokens",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "underlyingAmounts",
              type: "uint256[]",
            },
          ],
          internalType: "struct ILiquidStrategy.ShareBalance",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "getUserStrategies",
      outputs: [{ internalType: "bytes32[]", name: "", type: "bytes32[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "_strategyId", type: "bytes32" },
        { internalType: "address", name: "_user", type: "address" },
      ],
      name: "getUserStrategyStats",
      outputs: [
        {
          components: [
            { internalType: "uint256", name: "joinTimestamp", type: "uint256" },
            {
              internalType: "uint256",
              name: "lastActionTimestamp",
              type: "uint256",
            },
            {
              components: [
                {
                  internalType: "address[]",
                  name: "assets",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
              ],
              internalType: "struct ILiquidStrategy.AssetBalance[]",
              name: "tokenBalances",
              type: "tuple[]",
            },
            {
              components: [
                { internalType: "address", name: "protocol", type: "address" },
                {
                  internalType: "address",
                  name: "shareToken",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "shareAmount",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "underlyingTokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "underlyingAmounts",
                  type: "uint256[]",
                },
              ],
              internalType: "struct ILiquidStrategy.ShareBalance[]",
              name: "shareBalances",
              type: "tuple[]",
            },
          ],
          internalType: "struct ILiquidStrategy.UserStats",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "_strategyId", type: "bytes32" },
        { internalType: "address", name: "_user", type: "address" },
        { internalType: "address", name: "_token", type: "address" },
      ],
      name: "getUserTokenBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pendingOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "_strategyId", type: "bytes32" },
        { internalType: "address", name: "_user", type: "address" },
        { internalType: "bool", name: "_status", type: "bool" },
      ],
      name: "setJoinedStrategy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_connector", type: "address" },
      ],
      name: "toggleConnector",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_token", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "transferToken",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "_strategyId", type: "bytes32" },
        { internalType: "address[]", name: "_assets", type: "address[]" },
        { internalType: "uint256[]", name: "_amounts", type: "uint256[]" },
        { internalType: "address", name: "_user", type: "address" },
        { internalType: "uint256", name: "_performanceFee", type: "uint256" },
        { internalType: "uint256", name: "_indicator", type: "uint256" },
      ],
      name: "updateStrategyStats",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "_strategyId", type: "bytes32" },
        { internalType: "address", name: "_userAddress", type: "address" },
        { internalType: "address", name: "_protocol", type: "address" },
        { internalType: "address[]", name: "_assets", type: "address[]" },
        { internalType: "uint256[]", name: "_assetsAmount", type: "uint256[]" },
        { internalType: "address", name: "_shareToken", type: "address" },
        { internalType: "uint256", name: "_shareAmount", type: "uint256" },
        {
          internalType: "address[]",
          name: "_underlyingTokens",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "_underlyingAmounts",
          type: "uint256[]",
        },
        { internalType: "uint256", name: "stepIndex", type: "uint256" },
      ],
      name: "updateUserStats",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "_strategyId", type: "bytes32" },
        { internalType: "address", name: "_user", type: "address" },
        { internalType: "uint256", name: "_indicator", type: "uint256" },
      ],
      name: "updateUserStrategy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "_strategyId", type: "bytes32" },
        { internalType: "address", name: "_user", type: "address" },
        { internalType: "address", name: "_token", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
        { internalType: "uint256", name: "_indicator", type: "uint256" },
      ],
      name: "updateUserTokenBalance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
} as const;

export default strategyABI;
