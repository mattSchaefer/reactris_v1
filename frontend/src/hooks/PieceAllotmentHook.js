import React, {useState} from 'react'
import PieceCell from '../components/pieces/PieceCell'
import Piece from '../components/pieces/Piece'
const usePieceAllotment = (type, tickCount, gameBoardAllotment, frameTime) => {
    const [pieceAllotment, setPieceAllotment] = useState([[]])
    const [pieceList, setPieceList] = useState([
    <Piece type={'L'} active={true} />, 
    <Piece type={'L'} active={true} />, 
    <Piece type={'bar'} active={true} />,  
    <Piece type={'square'} active={true} />,
    <Piece type={'bar'} active={true} />, 
    <Piece type={'square'} active={true} />,  
    <Piece type={'square'} active={true} />, 
    <Piece type={'bar'} active={true} />, 
    <Piece type={'square'} active={true} />,  
    <Piece type={'square'} active={true} />,
    <Piece type={'bar'} active={true} />,
    <Piece type={'square'} active={true} />,
    <Piece type={'square'} active={true} />,
    <Piece type={'square'} active={true} />,
    <Piece type={'square'} active={true} />,
    <Piece type={'square'} active={true} />])
    React.useEffect(() => { 
       // console.log("~~~~pieceAllotment effect")
       // console.log(pieceList)
        //console.log(pieceList[0])
        if(!pieceList[0]){
            return
        }
        if(pieceList[0].props.type == "bar"){
            setPieceAllotment([[{posRow: 0, posCol: 4, color: 'blue'}],       
                [{posRow: 1, posCol: 4, color: 'blue'}],
                [{posRow: 2, posCol: 4, color: 'blue'}],
                [{posRow: 3, posCol: 4, color: 'blue'}],
            ])
        }else if(pieceList[0].props.type == 'square'){
            setPieceAllotment([
                [{posRow: 0, posCol: 3, color: 'red'}, {posRow: 0, posCol: 4, color: 'red'}],
                [{posRow: 1, posCol: 3, color: 'red'}, {posRow: 1, posCol: 4, color: 'red'}]
            ])
        }else if(pieceList[0].props.type == "L"){
            setPieceAllotment([[{posRow: 0, posCol: 4, color: 'green'}],       
                [{posRow: 1, posCol: 4, color: 'green'}],
                [{posRow: 2, posCol: 4, color: 'green'}, {posRow: 2, posCol: 5, color: 'green'}]
            ])
        }
    }, [pieceList])
    return [pieceAllotment, setPieceAllotment, pieceList, setPieceList]
};

export {usePieceAllotment}