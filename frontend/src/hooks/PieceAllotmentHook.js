import React, {useState} from 'react'
import PieceCell from '../components/pieces/PieceCell'
import Piece from '../components/pieces/Piece'
const usePieceAllotment = (type, tickCount, gameBoardAllotment, frameTime) => {
    const [pieceAllotment, setPieceAllotment] = useState([[]])
    const [pieceList, setPieceList] = useState([
    <Piece type={'T'} active={true} />, 
    <Piece type={'J'} active={true} />, 
    <Piece type={'S'} active={true} />,  
    <Piece type={'Z'} active={true} />,
    <Piece type={'L'} active={true} />, 
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
        if(!pieceList[0]){
            return
        }
        if(pieceList[0].props.type == "bar"){
            setPieceAllotment([
                [{posRow: 0, posCol: 4, color: 'blue'}],       
                [{posRow: 1, posCol: 4, color: 'blue', center: true}],
                [{posRow: 2, posCol: 4, color: 'blue'}],
                [{posRow: 3, posCol: 4, color: 'blue'}],
            ])
        }else if(pieceList[0].props.type == 'square'){
            setPieceAllotment([
                [{posRow: 0, posCol: 3, color: 'red'}, {posRow: 0, posCol: 4, color: 'red'}],
                [{posRow: 1, posCol: 3, color: 'red'}, {posRow: 1, posCol: 4, color: 'red'}]
            ])
        }else if(pieceList[0].props.type == "L"){
            setPieceAllotment([
                [{posRow: 0, posCol: 4, color: 'green'}],       
                [{posRow: 1, posCol: 4, color: 'green', center: true}],
                [{posRow: 2, posCol: 4, color: 'green'}, {posRow: 2, posCol: 5, color: 'green'}]
            ])
        }else if(pieceList[0].props.type == "Z"){
            setPieceAllotment([
                [{posRow: 0, posCol: 3, color: 'purple'}, {posRow: 0, posCol: 4, color: 'purple', center: true}],
                [{posRow: 1, posCol: 4, color: 'purple'}, {posRow: 1, posCol: 5, color: 'purple'}]
            ])
        }else if(pieceList[0].props.type == "S"){
            setPieceAllotment([
                [{posRow: 0, posCol: 3, color: 'yellow'}, {posRow: 0, posCol: 4, color: 'yellow', center: true}],
                [{posRow: 1, posCol: 2, color: 'yellow'}, {posRow: 1, posCol: 3, color: 'yellow'}]
            ])
        }else if(pieceList[0].props.type == "J"){
            setPieceAllotment([
                [{posRow: 0, posCol: 4, color: 'orange'}],       
                [{posRow: 1, posCol: 4, color: 'orange', center: true}],
                [{posRow: 2, posCol: 4, color: 'orange'}, {posRow: 2, posCol: 3, color: 'orange'}]
            ])
        }else if(pieceList[0].props.type == "T"){
            setPieceAllotment([
                [{posRow: 0, posCol: 4, color: 'dark'}],       
                [{posRow: 1, posCol: 3, color: 'dark', center: true}, {posRow: 1, posCol: 4, color: 'dark'}, {posRow: 1, posCol: 5, color: 'dark'}]
            ])
        }
    }, [pieceList])
    return [pieceAllotment, setPieceAllotment, pieceList, setPieceList]
};

export {usePieceAllotment}