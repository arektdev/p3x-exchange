window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            P3X.start(window.web3);
        } catch (error) {
            alert('You denied access to your metamask. You will not be able to utilize the site.');
        }
    }
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        P3X.start(window.web3);
    }
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );


const P3X = {
    currency: 'USD',
    P3XAbi: [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "name": "withdrawAfter",
                    "type": "bool"
                }
            ],
            "name": "sell",
            "outputs": [
                {
                    "name": "ethReceieved",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "accountHolder",
                    "type": "address"
                }
            ],
            "name": "gauntletTypeOf",
            "outputs": [
                {
                    "name": "stakeAmount",
                    "type": "uint256"
                },
                {
                    "name": "gType",
                    "type": "uint256"
                },
                {
                    "name": "end",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "name": "extGauntlet",
                    "type": "address"
                }
            ],
            "name": "acquireExternalGauntlet",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "stakingRequirement",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "tokenOwner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "accountHolder",
                    "type": "address"
                },
                {
                    "name": "includeReferralBonus",
                    "type": "bool"
                }
            ],
            "name": "dividendsOf",
            "outputs": [
                {
                    "name": "divs",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "customerAddress",
                    "type": "address"
                }
            ],
            "name": "refBonusOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "name": "gType",
                    "type": "uint8"
                },
                {
                    "name": "end",
                    "type": "uint256"
                }
            ],
            "name": "acquireGauntlet",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "referrer",
                    "type": "address"
                }
            ],
            "name": "setReferrer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "ok",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "ethToReinvest",
                    "type": "uint256"
                },
                {
                    "name": "withdrawAfter",
                    "type": "bool"
                }
            ],
            "name": "reinvestPartial",
            "outputs": [
                {
                    "name": "tokensReceieved",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "accountHolder",
                    "type": "address"
                }
            ],
            "name": "savedReferral",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "exit",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "accountHolder",
                    "type": "address"
                }
            ],
            "name": "usableBalanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "referrerAddress",
                    "type": "address"
                }
            ],
            "name": "buy",
            "outputs": [
                {
                    "name": "tokensReceieved",
                    "type": "uint256"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "reinvest",
            "outputs": [
                {
                    "name": "tokensReceieved",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    P3DAbi: [
        {
            "constant": true,
            "inputs": [{"name": "_customerAddress", "type": "address"}],
            "name": "dividendsOf",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {"constant": true, "inputs": [], "name": "name", "outputs": [{"name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {
            "constant": true,
            "inputs": [{"name": "_ethereumToSpend", "type": "uint256"}],
            "name": "calculateTokensReceived",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {"constant": true, "inputs": [], "name": "totalSupply", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {
            "constant": true,
            "inputs": [{"name": "_tokensToSell", "type": "uint256"}],
            "name": "calculateEthereumReceived",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {"constant": true, "inputs": [], "name": "onlyAmbassadors", "outputs": [{"name": "", "type": "bool"}], "payable": false, "stateMutability": "view", "type": "function"}, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{"name": "", "type": "uint8"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "bytes32"}],
            "name": "administrators",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {"constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {
            "constant": true,
            "inputs": [],
            "name": "sellPrice",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {"constant": true, "inputs": [], "name": "stakingRequirement", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {
            "constant": true,
            "inputs": [{"name": "_includeReferralBonus", "type": "bool"}],
            "name": "myDividends",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {"constant": true, "inputs": [], "name": "totalEthereumBalance", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {
            "constant": true,
            "inputs": [{"name": "_customerAddress", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_amountOfTokens", "type": "uint256"}],
            "name": "setStakingRequirement",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {"constant": true, "inputs": [], "name": "buyPrice", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {
            "constant": false,
            "inputs": [{"name": "_identifier", "type": "bytes32"}, {"name": "_status", "type": "bool"}],
            "name": "setAdministrator",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {"constant": true, "inputs": [], "name": "myTokens", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{"name": "", "type": "string"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {"constant": false, "inputs": [], "name": "disableInitialStage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {
            "constant": false,
            "inputs": [{"name": "_toAddress", "type": "address"}, {"name": "_amountOfTokens", "type": "uint256"}],
            "name": "transfer",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_symbol", "type": "string"}],
            "name": "setSymbol",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {"constant": false, "inputs": [{"name": "_name", "type": "string"}], "name": "setName", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {
            "constant": false,
            "inputs": [{"name": "_amountOfTokens", "type": "uint256"}],
            "name": "sell",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {"constant": false, "inputs": [], "name": "exit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {
            "constant": false,
            "inputs": [{"name": "_referredBy", "type": "address"}],
            "name": "buy",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {"constant": false, "inputs": [], "name": "reinvest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {"payable": true, "stateMutability": "payable", "type": "fallback"}, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "customerAddress", "type": "address"}, {"indexed": false, "name": "incomingEthereum", "type": "uint256"}, {
                "indexed": false,
                "name": "tokensMinted",
                "type": "uint256"
            }, {"indexed": true, "name": "referredBy", "type": "address"}],
            "name": "onTokenPurchase",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "customerAddress", "type": "address"}, {"indexed": false, "name": "tokensBurned", "type": "uint256"}, {
                "indexed": false,
                "name": "ethereumEarned",
                "type": "uint256"
            }],
            "name": "onTokenSell",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "customerAddress", "type": "address"}, {"indexed": false, "name": "ethereumReinvested", "type": "uint256"}, {
                "indexed": false,
                "name": "tokensMinted",
                "type": "uint256"
            }],
            "name": "onReinvestment",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "customerAddress", "type": "address"}, {"indexed": false, "name": "ethereumWithdrawn", "type": "uint256"}],
            "name": "onWithdraw",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "from", "type": "address"}, {"indexed": true, "name": "to", "type": "address"}, {"indexed": false, "name": "tokens", "type": "uint256"}],
            "name": "Transfer",
            "type": "event"
        }],
    playerbookAbi: [
        {"constant": false, "inputs": [], "name": "addMeToAllGames", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {
            "constant": false,
            "inputs": [{"name": "_whatFunction", "type": "bytes32"}],
            "name": "deleteAnyProposal",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "address"}],
            "name": "pIDxAddr_",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {"constant": true, "inputs": [], "name": "registrationFee_", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {
            "constant": true,
            "inputs": [],
            "name": "getNameFee",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "uint256"}, {"name": "", "type": "bytes32"}],
            "name": "plyrNames_",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "address"}],
            "name": "gameNames_",
            "outputs": [{"name": "", "type": "bytes32"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "bytes32"}],
            "name": "pIDxName_",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_nameString", "type": "string"}, {"name": "_affCode", "type": "address"}, {"name": "_all", "type": "bool"}],
            "name": "registerNameXaddr",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_gameAddress", "type": "address"}, {"name": "_gameNameStr", "type": "string"}],
            "name": "addGame",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {"constant": true, "inputs": [], "name": "pID_", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {
            "constant": true,
            "inputs": [{"name": "_pID", "type": "uint256"}],
            "name": "getPlayerAddr",
            "outputs": [{"name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_nameString", "type": "string"}, {"name": "_affCode", "type": "bytes32"}, {"name": "_all", "type": "bool"}],
            "name": "registerNameXname",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_nameStr", "type": "string"}],
            "name": "checkIfNameValid",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_addr", "type": "address"}, {"name": "_name", "type": "bytes32"}, {"name": "_affCode", "type": "bytes32"}, {"name": "_all", "type": "bool"}],
            "name": "registerNameXnameFromDapp",
            "outputs": [{"name": "", "type": "bool"}, {"name": "", "type": "uint256"}],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_whatFunction", "type": "bytes32"}, {"name": "_signerA", "type": "uint256"}, {"name": "_signerB", "type": "uint256"}, {"name": "_signerC", "type": "uint256"}],
            "name": "checkSignersByAddress",
            "outputs": [{"name": "", "type": "address"}, {"name": "", "type": "address"}, {"name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_gameID", "type": "uint256"}],
            "name": "addMeToGame",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_pID", "type": "uint256"}],
            "name": "getPlayerName",
            "outputs": [{"name": "", "type": "bytes32"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_nameString", "type": "string"}, {"name": "_affCode", "type": "uint256"}, {"name": "_all", "type": "bool"}],
            "name": "registerNameXID",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "uint256"}, {"name": "", "type": "uint256"}],
            "name": "plyrNameList_",
            "outputs": [{"name": "", "type": "bytes32"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_whatFunction", "type": "bytes32"}],
            "name": "checkData",
            "outputs": [{"name": "", "type": "bytes32"}, {"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_addr", "type": "address"}, {"name": "_name", "type": "bytes32"}, {"name": "_affCode", "type": "address"}, {"name": "_all", "type": "bool"}],
            "name": "registerNameXaddrFromDapp",
            "outputs": [{"name": "", "type": "bool"}, {"name": "", "type": "uint256"}],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_nameString", "type": "string"}],
            "name": "useMyOldName",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {"constant": true, "inputs": [], "name": "gID_", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {
            "constant": false,
            "inputs": [{"name": "_addr", "type": "address"}, {"name": "_name", "type": "bytes32"}, {"name": "_affCode", "type": "uint256"}, {"name": "_all", "type": "bool"}],
            "name": "registerNameXIDFromDapp",
            "outputs": [{"name": "", "type": "bool"}, {"name": "", "type": "uint256"}],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_fee", "type": "uint256"}],
            "name": "setRegistrationFee",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "uint256"}],
            "name": "games_",
            "outputs": [{"name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "address"}],
            "name": "gameIDs_",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "uint256"}],
            "name": "plyr_",
            "outputs": [{"name": "addr", "type": "address"}, {"name": "name", "type": "bytes32"}, {"name": "laff", "type": "uint256"}, {"name": "names", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_pID", "type": "uint256"}],
            "name": "getPlayerLAff",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_addr", "type": "address"}],
            "name": "getPlayerID",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_whatFunction", "type": "bytes32"}, {"name": "_signerA", "type": "uint256"}, {"name": "_signerB", "type": "uint256"}, {"name": "_signerC", "type": "uint256"}],
            "name": "checkSignersByName",
            "outputs": [{"name": "", "type": "bytes32"}, {"name": "", "type": "bytes32"}, {"name": "", "type": "bytes32"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "playerID", "type": "uint256"}, {"indexed": true, "name": "playerAddress", "type": "address"}, {
                "indexed": true,
                "name": "playerName",
                "type": "bytes32"
            }, {"indexed": false, "name": "isNewPlayer", "type": "bool"}, {"indexed": false, "name": "affiliateID", "type": "uint256"}, {
                "indexed": false,
                "name": "affiliateAddress",
                "type": "address"
            }, {"indexed": false, "name": "affiliateName", "type": "bytes32"}, {"indexed": false, "name": "amountPaid", "type": "uint256"}, {
                "indexed": false,
                "name": "timeStamp",
                "type": "uint256"
            }],
            "name": "onNewName",
            "type": "event"
        }],
    web3: null,
    P3XTokenContract: null,
    P3XTokenAddress: '',
    P3DTokenContract: null,
    P3DTokenAddr: '',
    playerbookContract: null,
    playerbookContractAddr: '',
    txtResponse: {
        genericSendingTransErr: 'There was an error sending the transaction.',
        acquiredTimeGauntlet: {
            dateIsValidErr: 'Date is not valid.',
            balanceOfErr: 'You do not have enough P3X.',
            amtErr: 'Stake amount cannot be 0 or less than 0.',
            transSuccess: 'Your gauntlet order has been sent to the blockchain.'
        },
        acquiredSupplyGauntlet: {
            supplyErr: 'End Supply cannot be 0 or less than 0.',
            balanceOfErr: 'You do not have enough P3X.',
            amtErr: 'Stake amount cannot be 0 or less than 0.',
            transSuccess: 'Your gauntlet order has been sent to the blockchain.'
        },
        buy: {
            amtNotValidErr: 'Please enter a valid number.',
            amtNotZeroErr: 'Buy amount cannot be 0 or less than 0.',
            transSuccess: 'Your buy order has been sent to the blockchain.'
        },
        sell: {
            amtNotValidErr: 'Please enter a valid number.',
            amtNotZeroErr: 'Buy amount cannot be 0 or less than 0.',
            balanceOfErr: 'You do not have enough P3X.',
            transSuccess: 'Your buy order has been sent to the blockchain.'
        },
        transfer: {
            amtNotZero: 'Sell amount cannot be 0 or less than 0.',
            addressNotValid: 'Not a valid Ethereum address.',
            transSuccess: 'Your transfer order has been sent to the blockchain.'
        },
        reinvestPartial: {
            amtErr: 'Reinvest amount cannot be 0 or less than 0.',
            totalDivsErr: 'Cannot reinvest more than your current divs holdings.',
            transSuccess: 'Your partial reinvestment order has been sent to the blockchain.'
        },
        reinvest: {
            transSuccess: 'Your reinvestment order has been sent to the blockchain.'
        },
        setReferrer: {
            addressNotValid: 'Not a valid Ethereum address.',
            transSuccess: 'Your order to set a new referrer has been sent to the blockchain.'
        },
        exit: {
            transSuccess: 'Your exit order has been sent to the blockchain.'
        },
        withdraw: {
            transSuccess: 'Your withdraw order has been sent to the blockchain.'
        }
    },
    _eventListener_AcquiredTimeGauntlet: function () {
        $(document).on('click', '#time-based-gauntlet-acquire', async function () {
            let dt = $('#datetimepicker1').val();
            if (!moment(dt).isValid()) {
                window.p3x.toastr.error(window.p3x.txtResponse.acquiredTimeGauntlet.dateIsValidErr);
                return;
            }
            let ts = moment(dt).unix();
            let amt = window.p3x.web3.toWei($('#time-based-gauntlet-amount').val(), "ether");
            if (amt > window.p3x.contractValues.balanceOf) {
                window.p3x.toastr.error(window.p3x.txtResponse.acquiredTimeGauntlet.balanceOfErr);
                return;
            }
            if (amt <= 0) {
                window.p3x.toastr.error(window.p3x.txtResponse.acquiredTimeGauntlet.amtErr);
                return;
            }
            try {
                await promisify(cb => window.p3x.P3XTokenContract.acquireGauntlet(amt, 1, ts, cb));
                window.p3x.toastr.success(window.p3x.txtResponse.acquiredTimeGauntlet.transSuccess);
            }
            catch (error) {
                window.p3x.toastr.error(window.p3x.txtResponse.genericSendingTransErr);
            }
        });
    },
    _eventListener_AcquiredSupplyGauntlet: function () {
        $(document).on('click', '#supply-based-gauntlet-acquire', async function () {
            let supply = window.p3x.web3.toWei($('#supply-based-gauntlet-supply').val(), "ether");
            let amt = window.p3x.web3.toWei($('#supply-based-gauntlet-amount').val(), "ether");
            if (supply <= 0) {
                window.p3x.toastr.error(window.p3x.txtResponse.acquiredSupplyGauntlet.supplyErr);
                return;
            }
            if (amt > window.p3x.contractValues.balanceOf) {
                window.p3x.toastr.error(window.p3x.txtResponse.acquiredSupplyGauntlet.balanceOfErr);
                return;
            }
            if (amt <= 0) {
                window.p3x.toastr.error(window.p3x.txtResponse.acquiredSupplyGauntlet.amtErr);
                return;
            }
            try {
                await promisify(cb => window.p3x.P3XTokenContract.acquireGauntlet(amt, 2, supply, cb));
                window.p3x.toastr.success(window.p3x.txtResponse.acquiredSupplyGauntlet.transSuccess);
            }
            catch (error) {
                window.p3x.toastr.error(window.p3x.txtResponse.genericSendingTransErr);
            }
        });
    },
    _eventListener_Buy: function () {
        $(document).on('click', '#btn-buy', async function () {
            try {
                let amt = $('#buy-eth-total').val();
                if (!parseFloat(amt)) {
                    window.p3x.toastr.error(window.p3x.txtResponse.buy.amtNotValidErr);
                    return;
                }
                if (amt <= 0) {
                    window.p3x.toastr.error(window.p3x.txtResponse.buy.amtNotZeroErr);
                    return;
                }
                console.log(window.p3x.MN, {gas: 430000, value: window.p3x.web3.toWei(amt, "ether")});
                await promisify(cb => window.p3x.P3XTokenContract.buy(window.p3x.MN, {gas: 430000, value: window.p3x.web3.toWei(amt, "ether")}, cb));
                window.p3x.toastr.success(window.p3x.txtResponse.buy.transSuccess);
            }
            catch (error) {
                console.log(error);

                window.p3x.toastr.error(window.p3x.txtResponse.genericSendingTransErr);
            }
        });
    },
    _eventListener_Sell: function () {
        $(document).on('click', '#btn-sell', async function () {
            let amt = $('#sell-amount-p3x').val();
            if (!parseFloat(amt)) {
                window.p3x.toastr.error(window.p3x.txtResponse.sell.amtNotValidErr);
                return;
            }
            if (amt <= 0) {
                window.p3x.toastr.error(window.p3x.txtResponse.sell.amtNotZeroErr);
                return;
            }
            if (amt > window.p3x.contractValues.balanceOf) {
                window.p3x.toastr.error(window.p3x.txtResponse.sell.balanceOfErr);
                return;
            }
            let serialized = window.p3x.web3.toBigNumber(amt * 1e18);
            try {
                await promisify(cb => window.p3x.P3XTokenContract.sell(serialized, false, cb));
                window.p3x.toastr.success(window.p3x.txtResponse.sell.transSuccess);
            }
            catch (error) {
                window.p3x.toastr.error(window.p3x.txtResponse.genericSendingTransErr);
            }
        });
    },
    _eventListener_Transfer: function () {
        $(document).on('click', '#btn-transfer', async function () {
            let addr = $('#transfer-p3x-address').val();
            let amt = $('#transfer-p3x-amount').val();
            if (amt <= 0) {
                window.p3x.toastr.error(window.p3x.txtResponse.transfer.amtNotZero);
                return;
            }
            if (!window.p3x.web3.isAddress(addr)) {
                window.p3x.toastr.error(window.p3x.txtResponse.transfer.addressNotValid);
                return;
            }
            let serialized = window.p3x.web3.toBigNumber(amt * 1e18);
            try {
                let transfer = await promisify(cb => window.p3x.P3XTokenContract.transfer(addr, serialized, cb));
                window.p3x.toastr.success(window.p3x.txtResponse.transfer.transSuccess);
            }
            catch (error) {
                window.p3x.toastr.error(window.p3x.txtResponse.genericSendingTransErr);
            }
        });
    },
    _eventListener_Reinvest_Partial: function () {
        $(document).on('click', '#btn-reinvest-partial', async function () {
            try {
                let amt = $('#reinvest-eth-amount').val();
                if (amt <= 0) {
                    window.p3x.toastr.error(window.p3x.txtResponse.reinvestPartial.amtErr);
                    return;
                }
                if (amt > window.p3x.contractValues.totalDividendsOf) {
                    window.p3x.toastr.error(window.p3x.txtResponse.reinvestPartial.totalDivsErr);
                    return;
                }
                let withdrawAfter = $(".withdraw-after:checked").val() == 'yes' ? true : false;
                await promisify(cb => window.p3x.P3XTokenContract.reinvestPartial(window.p3x.web3.toWei(amt, "ether"), withdrawAfter, cb));
                window.p3x.toastr.success(window.p3x.txtResponse.reinvestPartial.transSuccess);
            }
            catch (error) {
                window.p3x.toastr.error(window.p3x.txtResponse.genericSendingTransErr);
            }
        });
    },
    _eventListener_Reinvest: function () {
        $(document).on('click', '#btn-reinvest', async function () {
            try {
                await promisify(cb => window.p3x.P3XTokenContract.reinvest({gas: 430000}, cb));
                window.p3x.toastr.success(window.p3x.txtResponse.reinvest.transSuccess);
            }
            catch (error) {
                window.p3x.toastr.error(window.p3x.txtResponse.genericSendingTransErr);
            }
        });
    },
    _eventListener_SetReferrer: function () {
        $(document).on('click', '#btn-set-referrer, .btn-set-referrer', async function () {
            let addr = $('#referrer-address').val();
            if (!window.p3x.web3.isAddress(addr)) {
                window.p3x.toastr.error(window.p3x.txtResponse.setReferrer.addressNotValid);
                return;
            }
            try {
                await promisify(cb => window.p3x.P3XTokenContract.setReferrer(addr, cb));
                window.p3x.toastr.success(window.p3x.txtResponse.setReferrer.transSuccess);
            }
            catch (error) {
                window.p3x.toastr.error(window.p3x.txtResponse.genericSendingTransErr);
            }
        });
    },
    _eventListener_Exit: function () {
        $(document).on('click', '#exit', async function () {
            try {
                await promisify(cb => window.p3x.P3XTokenContract.exit(cb));
                window.p3x.toastr.success(window.p3x.txtResponse.exit.transSuccess);
            }
            catch (error) {
                window.p3x.toastr.error(window.p3x.txtResponse.genericSendingTransErr);
            }
        });
    },
    _eventListener_Withdraw: function () {
        $(document).on('click', '#btn-withdraw', async function () {
            try {
                await promisify(cb => window.p3x.P3XTokenContract.withdraw(cb));
                window.p3x.toastr.success(window.p3x.txtResponse.withdraw.transSuccess);
            }
            catch (error) {
                window.p3x.toastr.error(window.p3x.txtResponse.genericSendingTransErr);
            }
        });
    },
    _eventListener_KeyUps: function () {
        $(document).on('keyup', '#buy-eth-total', async function () {
            try {
                let amt = window.p3x.web3.toWei($('#buy-eth-total').val(), "ether");
                let calculateTokensReceived = await promisify(cb => window.p3x.P3DTokenContract.calculateTokensReceived(amt, cb));
                calculateTokensReceived = window.p3x.web3.fromWei(calculateTokensReceived, "ether").toFixed(4);
                $('#buy-eth-amount').val(calculateTokensReceived);
            }
            catch (error) {
                console.log(error);
                window.p3x.toastr.error(window.p3x.txtResponse.genericSendingTransErr);
            }
        });
        $('#buy-eth-total').keyup();

        $(document).on('keyup', '#sell-amount-p3x', async function () {
            try {
                let amt = window.p3x.web3.toWei($('#sell-amount-p3x').val(), "ether");
                let calculateEthereumReceived = await promisify(cb => window.p3x.P3DTokenContract.calculateEthereumReceived(amt, cb));
                calculateEthereumReceived = window.p3x.web3.fromWei(calculateEthereumReceived, "ether").toFixed(4);
                $('#sell-eth-total').val(calculateEthereumReceived);
            }
            catch (error) {
                console.log(error);
                window.p3x.toastr.error(window.p3x.txtResponse.genericSendingTransErr);
            }
        });
        $('#sell-amount-p3x').keyup();
    },
    _eventListener_Currency: function () {
        $(document).on('change', '#dl-currency-type', async function () {
            localStorage.setItem("currency", $(this).val());
            window.p3x._getCurrency();
            window.p3x._setFiatPrices();
        });
    },
    _setP3DBuyPrice: function () {
        $('#buy-eth-price').val(this.contractValues.buyPrice);
    },
    _setP3DSellPrice: function () {
        $('#sell-eth-price').val(this.contractValues.sellPrice);
    },
    _setP3DTotalEthereumBalance: function () {
        $('#txt-p3d-eth-balance').text(this._formatMoney(this.contractValues.totalEthereumBalance) + ' ETH');
    },
    _setP3DTotalSupply: function () {
        $('#txt-p3d-total-supply').text(this._formatMoney(this.contractValues.totalSupply) + ' P3D');
    },
    _setSavedReferral: function () {
        let savedReferral = this.contractValues.savedReferral;
        if (savedReferral != '0x0000000000000000000000000000000000000000') {
            $('#txt-current-referrer').html('<b>Current Referrer: </b><a href="' + this.etherscanAddr + '/address/' + savedReferral + '" target="_blank">' + savedReferral + '</a>');
        }
        else {
            $('#txt-current-referrer').html('<b>Current Referrer: </b><a href="#"> No Referrer Set</a>');
        }
    },
    _setStakingRequirement: function () {
        $('#txt-staking-requirement').text(BigNumber(this.contractValues.stakingRequirement).toFixed(2) + ' P3X');
    },
    _setUsableBalanceOf: function () {
        let usableBalanceOf = this.contractValues.usableBalanceOf;
        $('#txt-p3x-usable-balance').text(BigNumber(usableBalanceOf).toFixed(2) + ' P3X');
        $('#sell-amount-p3x').val(usableBalanceOf);
        $('#sell-amount-p3x').keyup();

    },
    _setBalanceOf: function () {
        $('#txt-total-balance').text(this.contractValues.balanceOf + ' P3X');
    },
    _setDividendsOf: function () {
        $('#txt-dividends').text(this.contractValues.dividendsOf + ' ETH');
    },
    _setMyReferrals: function () {
        $('#txt-referrals').text(this.contractValues.refBonusOf + ' ETH');
    },
    _setMyTotalDivs: function () {
        let dividendsOf = this.contractValues.totalDividendsOf;
        $('#txt-eth-withdraw').val(dividendsOf);
        $('#reinvest-eth-amount').val(dividendsOf);
        $('#txt-total-dividends').text(dividendsOf + ' ETH');
    },
    _setMyGauntlets: async function () {
        try {
            let that = this, gauntletType = 0, gauntletEnd = 0, gauntletAmount = 0, myGauntlets = [], day = 0;
            myGauntlets = this.contractValues.myGauntlets;
            gauntletType = new BigNumber(myGauntlets[1]), gauntletAmount = new BigNumber(myGauntlets[0]);
            switch (gauntletType.toString()) {
                case '1':
                    day = moment.unix(myGauntlets[2]).local().format('MM/DD/YYYY, h:mm A');
                    $('#current-gauntlet-time').text(day);
                    $('#current-gauntlet-type').text('Time Based Gauntlet');
                    $('#current-gauntlet-end').text('Gauntlet End Date:');
                    break;
                case '2':
                    gauntletEnd = new BigNumber(myGauntlets[2]);
                    $('#current-gauntlet-time').text(that._formatMoney(gauntletEnd.div(1e18).toFixed(2)) + ' P3D');
                    $('#current-gauntlet-type').text('P3D Supply Based Gauntlet');
                    $('#current-gauntlet-end').text('Gauntlet End Supply:');
                    break;
            }
            if (gauntletAmount) {
                $('#current-gauntlet-amount').text(that._formatMoney(gauntletAmount.div(1e18).toFixed(2)) + ' P3X');
                $('#current-gauntlet-amount-eth').text(that.contractValues.totalGauntletEthAmt + ' ETH');
            }
            $('#txt-must-stake-until').text('Minimum Staking Date: ' + moment().add(28, 'days').hours(24).minutes(0).seconds(0).local().format('MM/DD/YYYY, h:mm A'));
            let at = parseInt(this.contractValues.totalSupply) + (parseInt(this.contractValues.totalSupply) / 5) + 10;
            $('#txt-minimum-supply').text('Minimum Supply: ' + BigNumber(at).toFixed(2) + ' P3D');
        }
        catch (error) {
            console.log(error);
        }
    },
    _setFiatPrices: async function () {
        //total Contract fiat
        let totalFiat = parseFloat(this.contractValues.totalEthereumBalance) * this.fiatPrice[this.currency];
        $('#txt-p3d-eth-balance-fiat').text(this._formatMoney(totalFiat.toFixed(2)) + ' ' + this.currency);

        //total gauntlet fiat
        let totalGauntlet = BigNumber(this.contractValues.totalGauntletEthAmt * parseFloat(this.fiatPrice[this.currency])).toFixed(2);
        $('#current-gauntlet-amount-fiat').text(totalGauntlet + ' ' + this.currency);

        //User p3x Balance
        let totalBal = BigNumber(this.contractValues.totalBalanceEthAmt * parseFloat(this.fiatPrice[this.currency])).toFixed(2);
        $('#txt-total-balance-fiat').text(totalBal + ' ' + this.currency);
        $('#txt-total-balance-eth').text(this.contractValues.totalBalanceEthAmt + ' ETH');

        //Divs
        let totalDivs = BigNumber(this.contractValues.totalDividendsOf * parseFloat(this.fiatPrice[this.currency])).toFixed(2);
        $('#txt-total-dividends-fiat').text(totalDivs + ' ' + this.currency);
    },
    _setMasternode: function () {
        //saves masternode to localStorage and builds masternode link
        let masternode = this._getURL(window.location.search.substring(1)).mn;
        if (this.web3.isAddress(masternode)) { //cant support vanity names until arcweb3
            localStorage.setItem("mn", masternode);
        }
        let mn = localStorage.getItem("mn");
        if (mn !== null) {
            this.MN = mn;
        }
        else {
            this.MN = '';
        }
        if (parseFloat(this.contractValues.balanceOf) >= parseFloat(this.contractValues.stakingRequirement)) {
            let path = window.location.protocol + '//' + window.location.hostname;
            $('#masternode-link-address').attr('href', path + '/?mn=' + this.web3.eth.accounts[0]).text(path + '/?mn=' + this.web3.eth.accounts[0]);
        }
        else {
            $('#masternode-link-address').attr('href', '').text('Purchase additional tokens for a Masternode.');
        }
    },
    _getCurrency: function () {
        //gets selected currency
        let currency = localStorage.getItem("currency");
        if (currency !== null) {
            this.currency = currency;
            $('#dl-currency-type').val(currency);
        }
    },
    _getData: async function () {
        //build data so it can be used throughout the program
        this.P3XTokenContract = this.web3.eth.contract(this.P3XAbi).at(this.P3XTokenAddress);
        this.P3DTokenContract = this.web3.eth.contract(this.P3DAbi).at(this.P3DTokenAddr);
        this.playerbookContract = this.web3.eth.contract(this.playerbookAbi).at(this.playerbookContractAddr);

        let that = this, sellPrice = 0, buyPrice = 0, totalEthereumBalance = 0, totalSupply = 0, savedReferral = '', usableBalanceOf = 0, balanceOf = 0, dividendsOf = 0, totalDividendsOf = 0,
            refBonusOf = 0, myGauntlets = {}, stakingRequirement = 0, totalGauntletEthAmt = 0, totalBalanceEthAmt = 0;
        try {
            sellPrice = await promisify(cb => that.P3DTokenContract.sellPrice(cb));
        }
        catch (error) {
            console.log(error);
        }
        try {
            buyPrice = await promisify(cb => that.P3DTokenContract.buyPrice(cb));
        }
        catch (error) {
            console.log(error);
        }
        try {
            totalEthereumBalance = await promisify(cb => that.P3DTokenContract.totalEthereumBalance(cb));
        }
        catch (error) {
            console.log(error);
        }
        try {
            totalSupply = await promisify(cb => that.P3DTokenContract.totalSupply(cb));
        }
        catch (error) {
            console.log(error);
        }
        try {
            savedReferral = await promisify(cb => that.P3XTokenContract.savedReferral(that.web3.eth.accounts[0], cb));
        }
        catch (error) {
            console.log(error);
        }
        try {
            usableBalanceOf = await promisify(cb => that.P3XTokenContract.usableBalanceOf(that.web3.eth.accounts[0], cb));
        }
        catch (error) {
            console.log(error);
        }
        try {
            balanceOf = await promisify(cb => that.P3XTokenContract.balanceOf(that.web3.eth.accounts[0], cb));
        }
        catch (error) {
            console.log(error);
        }
        try {
            dividendsOf = await promisify(cb => that.P3XTokenContract.dividendsOf(that.web3.eth.accounts[0], false, cb));
        }
        catch (error) {
            console.log(error);
        }
        try {
            totalDividendsOf = await promisify(cb => that.P3XTokenContract.dividendsOf(that.web3.eth.accounts[0], true, cb));
        }
        catch (error) {
            console.log(error);
        }
        try {
            refBonusOf = await promisify(cb => that.P3XTokenContract.refBonusOf(that.web3.eth.accounts[0], cb));

        }
        catch (error) {
            console.log(error);
        }
        try {
            myGauntlets = await promisify(cb => window.p3x.P3XTokenContract.gauntletTypeOf(that.web3.eth.accounts[0], cb));
        }
        catch (error) {
            console.log(error);
        }
        try {
            stakingRequirement = await promisify(cb => window.p3x.P3XTokenContract.stakingRequirement(cb));
        }
        catch (error) {
            console.log(error);
        }
        try {
            totalGauntletEthAmt = await promisify(cb => window.p3x.P3DTokenContract.calculateEthereumReceived(myGauntlets[0], cb));
        }
        catch (error) {
            console.log(error);
        }
        try {
            totalBalanceEthAmt = await promisify(cb => window.p3x.P3DTokenContract.calculateEthereumReceived(balanceOf, cb));
        }
        catch (error) {
            console.log(error);
        }
        this.contractValues = {
            sellPrice: that.web3.fromWei(sellPrice, 'ether').toFixed(8),
            buyPrice: that.web3.fromWei(buyPrice, 'ether').toFixed(8),
            totalEthereumBalance: that.web3.fromWei(totalEthereumBalance, 'ether').toFixed(8),
            totalSupply: that.web3.fromWei(totalSupply, 'ether').toFixed(8),
            savedReferral: savedReferral,
            usableBalanceOf: that.web3.fromWei(usableBalanceOf, 'ether').toFixed(4),
            balanceOf: that.web3.fromWei(balanceOf, 'ether').toFixed(2),
            dividendsOf: that.web3.fromWei(dividendsOf, 'ether').toFixed(4),
            refBonusOf: that.web3.fromWei(refBonusOf, 'ether').toFixed(4),
            myGauntlets: myGauntlets,
            totalDividendsOf: that.web3.fromWei(totalDividendsOf, 'ether').toFixed(4),
            stakingRequirement: that.web3.fromWei(stakingRequirement, 'ether').toFixed(4),
            totalGauntletEthAmt: that.web3.fromWei(totalGauntletEthAmt, 'ether').toFixed(4),
            totalBalanceEthAmt: that.web3.fromWei(totalBalanceEthAmt, 'ether').toFixed(4),
        };
        console.log(this.contractValues);
    },
    _getURL: function (query) {
        //used for maternodes
        let vars = query.split("&");
        let query_string = {};
        for (var i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    },
    _getNetwork: async function () {
        //gets the eth network connected, and sets variables accordingly
        let that = this;
        try {
            let getNetwork = await promisify(cb => that.web3.version.getNetwork(cb));
            that.ethNetwork = getNetwork;
            switch (getNetwork) {
                case "1":
                    $('#network-name').html('<span style="font-size:14px;">Network:</span> <b>Mainnet</b>');
                    that.etherscanAddr = 'https://etherscan.io';
                    that.P3XTokenAddress = '0xcd45a142d109bbc8b22ff6028614027d1db4e32f';
                    that.P3DTokenAddr = '0xb3775fb83f7d12a36e0475abdd1fca35c091efbe';
                    that.playerbookContractAddr = '0xD60d353610D9a5Ca478769D371b53CEfAA7B6E4c';
                    $('.p3x-contract-etherscan-link').attr('href', that.etherscanAddr + '/address/' + that.P3XTokenAddress);
                    $('.p3d-contract-etherscan-link').attr('href', that.etherscanAddr + '/address/' + that.P3DTokenAddr);
                    break;
                case "3":
                    $('#network-name').html('<span style="font-size:14px;">Network:</span> <b>Ropsten</b>');
                    that.etherscanAddr = 'https://ropsten.etherscan.io';
                    that.P3XTokenAddress = '0xcd45a142d109bbc8b22ff6028614027d1db4e32f';
                    that.P3DTokenAddr = '0x765a944008f08e8366c4ac4c88db63961f65be79';
                    that.playerbookContractAddr = '0x37ceaad5d949818cba87f155143290a8eb6ae501';
                    $('.p3x-contract-etherscan-link').attr('href', that.etherscanAddr + '/address/' + that.P3XTokenAddress);
                    $('.p3d-contract-etherscan-link').attr('href', that.etherscanAddr + '/address/' + that.P3DTokenAddr);
                    break;
                default:
                    $('#network-name').html('<span style="font-size:14px;">Network:</span> <b>Unknown</b>');
                    this.etherscanAddr = 'https://etherscan.io';
            }
        }
        catch (error) {
            console.log(error);
            window.p3x.toastr.error('There was an error identifying the network.');
        }
    },
    _getExchangePrices: async function () {
        //fetches eth conversion prices
        let that = this;
        $.ajax({
            context: that,
            async: false,
            cache: false,
            type: 'get',
            dataType: 'json',
            timeout: 30000,
            url: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=XMR,BTC,USD,EUR,CAD,JPY,GBP",
            success: async function (result) {
                that.fiatPrice = result;
            }
        });
    },
    _formatMoney: function (n, c, d, t) {
        //adds commas to number
        var c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    },
    _hideOverlay: function () {
        //hide page loading overlay
        $('#loading-animation').fadeOut();
    },
    _watchAccount: function () {
        //reloads the page if account changes
        let that = this, currentAccount = that.web3.eth.accounts[0];
        setInterval(function () {
            if (that.web3.eth.accounts[0] !== currentAccount) {
                window.location.reload();
            }
        }, 100);
    },
    _init: function () {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        this.toastr = toastr;

        $('#datetimepicker1').datetimepicker({
            icons: {
                time: 'fas fa-clock',
                date: 'fas fa-calendar',
                up: 'fas fa-arrow-up',
                down: 'fas fa-arrow-down',
                previous: 'fas fa-arrow-left',
                next: 'fas fa-arrow-right',
                today: 'fas fa-calendar-check',
                clear: 'fas fa-trash',
                close: 'fas fa-window-close'
            },
            locale: moment().locale(),
            minDate: moment().add(28, 'days').hours(24).minutes(0).seconds(0),
            buttons: {
                showClose: true,
                showToday: false,
            },
            viewMode: 'years',
            debug: true
        });
    },
    _setMainValues: async function () {
        await this._setMyGauntlets();
        this._setMasternode();
        this._getCurrency();
        this._setUsableBalanceOf();
        this._setBalanceOf();
        this._setDividendsOf();
        this._setMyReferrals();
        this._setMyTotalDivs();
        this._setP3DTotalEthereumBalance();
        this._setP3DTotalSupply();
        this._setP3DBuyPrice();
        this._setP3DSellPrice();
        this._setSavedReferral();
        this._setStakingRequirement();
        this._eventListener_Currency();
    },
    start: async function (_web3) {
        window.p3x = this;
        this.web3 = _web3;
        console.log(window.p3x);
        this._init();
        await this._getNetwork();
        await this._getData();
        await this._getExchangePrices();
        await this._setMainValues();

        this._eventListener_Buy();
        this._eventListener_Sell();
        this._eventListener_Reinvest();
        this._eventListener_Reinvest_Partial();
        this._eventListener_Transfer();
        this._eventListener_SetReferrer();
        this._eventListener_Withdraw();
        this._eventListener_AcquiredTimeGauntlet();
        this._eventListener_AcquiredSupplyGauntlet();
        this._eventListener_Exit();
        this._eventListener_KeyUps();
        this._setFiatPrices();
        this._watchAccount();

        await this._hideOverlay();
        let that = this;
        setInterval(function () {
            console.log('Updated data.');
            that._getNetwork();
            that._getData();
            that._getExchangePrices();
            that._setMainValues();
        }, 60000);
    }
};