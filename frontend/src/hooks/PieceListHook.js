import React, {useState} from 'react'
import PieceCell from '../components/pieces/PieceCell'
import Piece from '../components/pieces/Piece'
const usePieceList = (type, tickCount, gameBoardAllotment, frameTime, pieceAllotment) => {
    const [pieceList, setPieceList] = useState([<Piece type={'bar'} active={true} />, <Piece type={'square'} active={false} />])
    
    React.useEffect(() => { 
        
    }, [])
    return [pieceList, setPieceList]
};
const generatePieceList = (length) => {

}
export {usePieceList}