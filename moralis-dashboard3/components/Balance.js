import { useEffect,useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import { useMoralis,useERC20Balances,useERC721Balances } from "react-moralis";
import CustomContainer from "./CustomContainer";
import {Divider, Text} from "@chakra-ui/react"
import Moralis from "moralis"

export default function Balance({user}) {

    const Web3Api = useMoralisWeb3Api()
    const {fetchERC20Balances, data} = useERC20Balances()
    const [ethBalance,setEthBalance] = useState(0)

    const fetchNativeBalance = async() => {
        const result = await Web3Api.account.getNativeBalance({
            chain: "rinkeby",
            address: user.get('ethAddress')
        }).catch( e => console.log(e) )
       
        if(result.balance){
            setEthBalance(Moralis.Units.FromWei(result.balance))
        }
    }

    useEffect(()=> {
        fetchNativeBalance()
        fetchERC20Balances({
            params: {
                chain: "rinkyby",
                address: user.get('ethAddress')
            }
        })
    },[])

 

    return(
        <CustomContainer>
            <Text mb="6" fontSize="xl" fontWeight="bold">My ERC20 Tokens </Text>
           {ethBalance && <Text>  balance : {ethBalance} <b>ETH</b></Text>}
            <Divider/>
            {data && data.map(token => (
                <div key={token.symbol}>
                    <Text>balance : {Moralis.Units.FromWei(token.balance)}<b>{token.symbol}</b></Text>
                    <Divider/>
                </div>
            ))}
        </CustomContainer>
    )
}