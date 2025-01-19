import React, {useState} from 'react'
import PieceCell from '../components/pieces/PieceCell'
const usePieceAllotment = (type) => {
    const [pieceAllotment, setPieceAllotment] = useState([[]])
  
    React.useEffect(() => { 
        if(type == "bar"){
            setPieceAllotment([
                [<PieceCell posRow={0} posCol={4} color={"blue"} />],
                [<PieceCell posRow={1} posCol={4} color={"blue"} />],
                [<PieceCell posRow={2} posCol={4} color={"blue"} />],
                [<PieceCell posRow={3} posCol={4} color={"blue"} />]
            ])
        }else if(type == 'square'){
            setPieceAllotment([
                [<PieceCell />, <PieceCell />],
                [<PieceCell />, <PieceCell />]
            ])
        }else{
            setPieceAllotment([[<PieceCell />]])
        }
    }, [type])
    return [pieceAllotment]
};

export {usePieceAllotment}