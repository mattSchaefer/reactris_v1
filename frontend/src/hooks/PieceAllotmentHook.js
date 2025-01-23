import React, {useState} from 'react'
import PieceCell from '../components/pieces/PieceCell'
const usePieceAllotment = (type, tickCount, gameBoardAllotment, frameTime) => {
    const [pieceAllotment, setPieceAllotment] = useState([[]])
    
    React.useEffect(() => { 
        if(type == "bar"){
            setPieceAllotment([[{posRow: 0, posCol: 4, color: 'blue'}],       
                [{posRow: 1, posCol: 4, color: 'blue'}],
                [{posRow: 2, posCol: 4, color: 'blue'}],
                [{posRow: 3, posCol: 4, color: 'blue'}],
            ])
        }else if(type == 'square'){
            setPieceAllotment([
                [{posRow: 0, posCol: 3, color: 'blue'}, {posRow: 0, posCol: 4, color: 'blue'}],
                [{posRow: 1, posCol: 3, color: 'blue'}, {posRow: 1, posCol: 4, color: 'blue'}]
            ])
        }else{
            setPieceAllotment([[<PieceCell />]])
        }
    }, [type])
    return [pieceAllotment, setPieceAllotment]
};

export {usePieceAllotment}