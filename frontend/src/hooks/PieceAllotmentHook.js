import React, {useState} from 'react'
import PieceCell from '../components/pieces/PieceCell'
import Piece from '../components/pieces/Piece'
const usePieceAllotment = (/*type, tickCount, gameBoardAllotment, frameTime,*/ random_pieces) => {
    const [pieceAllotment, setPieceAllotment] = useState([[]])
    const [nextPieceAllotment, setNextPieceAllotment] = useState  ([[]])
    const [pieceList, setPieceList] = useState(random_pieces)
    React.useEffect(() => {
        if(!pieceList[0]){
            return
        }
        if(pieceList[0].props.type == "bar"){
            setPieceAllotment([
                [{posRow: 0, posCol: 4, color: 'blue', type: pieceList[0].props.type, rot: "v"}],       
                [{posRow: 1, posCol: 4, color: 'blue', type: pieceList[0].props.type, rot: "v"}],
                [{posRow: 2, posCol: 4, color: 'blue', center: true, type: pieceList[0].props.type, rot: "v"}],
                [{posRow: 3, posCol: 4, color: 'blue', type: pieceList[0].props.type, rot: "v"}],
            ])
        }else if(pieceList[0].props.type == 'square'){
            setPieceAllotment([
                [{posRow: 0, posCol: 3, color: 'red', type: pieceList[0].props.type}, {posRow: 0, posCol: 4, color: 'red', type: pieceList[0].props.type}],
                [{posRow: 1, posCol: 3, color: 'red', type: pieceList[0].props.type}, {posRow: 1, posCol: 4, color: 'red', type: pieceList[0].props.type}]
            ])
        }else if(pieceList[0].props.type == "L"){
            setPieceAllotment([
                [{posRow: 0, posCol: 4, color: 'green', type: pieceList[0].props.type, type: pieceList[0].props.type, rot: 1}],       
                [{posRow: 1, posCol: 4, color: 'green', center: true, type: pieceList[0].props.type, rot: 1}],
                [{posRow: 2, posCol: 4, color: 'green', type: pieceList[0].props.type, rot: 1}, {posRow: 2, posCol: 5, color: 'green', type: pieceList[0].props.type, rot: 1}]
            ])
        }else if(pieceList[0].props.type == "Z"){
            setPieceAllotment([
                [{posRow: 0, posCol: 3, color: 'purple', type: pieceList[0].props.type, rot: "h"}, {posRow: 0, posCol: 4, color: 'purple', type: pieceList[0].props.type, center: true, rot: "h"}],
                [{posRow: 1, posCol: 4, color: 'purple', type: pieceList[0].props.type, rot: "h"}, {posRow: 1, posCol: 5, color: 'purple', type: pieceList[0].props.type, rot: "h"}]
            ])
        }else if(pieceList[0].props.type == "S"){
            setPieceAllotment([
                [{posRow: 0, posCol: 3, color: 'yellow', type: pieceList[0].props.type, rot: "h", center: true}, {posRow: 0, posCol: 4, color: 'yellow', type: pieceList[0].props.type, rot: "h"}],
                [{posRow: 1, posCol: 2, color: 'yellow', type: pieceList[0].props.type, rot: "h"}, {posRow: 1, posCol: 3, color: 'yellow', type: pieceList[0].props.type, rot: "h"}]
            ])
        }else if(pieceList[0].props.type == "J"){
            setPieceAllotment([
                [{posRow: 0, posCol: 4, color: 'orange', type: pieceList[0].props.type, rot: 1}],       
                [{posRow: 1, posCol: 4, color: 'orange', type: pieceList[0].props.type, center: true, type: pieceList[0].props.type, rot: 1}],
                [{posRow: 2, posCol: 4, color: 'orange', type: pieceList[0].props.type, rot: 1}, {posRow: 2, posCol: 3, color: 'orange', type: pieceList[0].props.type, rot: 1}]
            ])
        }else if(pieceList[0].props.type == "T"){
            setPieceAllotment([
                [{posRow: 0, posCol: 4, color: 'dark', type: pieceList[0].props.type, rot: 1}],       
                [{posRow: 1, posCol: 3, color: 'dark',  type: pieceList[0].props.type, rot: 1}, {posRow: 1, center: true, rot: 1, posCol: 4, color: 'dark', type: pieceList[0].props.type}, {posRow: 1, rot: 1, posCol: 5, color: 'dark', type: pieceList[0].props.type}]
            ])
        }


        if(pieceList[1].props.type == "bar"){
            setNextPieceAllotment([
                [{posRow: 0, posCol: 2, color: 'blue', type: pieceList[1].props.type, rot: "v"}],       
                [{posRow: 1, posCol: 2, color: 'blue', type: pieceList[1].props.type, rot: "v"}],
                [{posRow: 2, posCol: 2, color: 'blue', center: true, type: pieceList[1].props.type, rot: "v"}],
                [{posRow: 3, posCol: 2, color: 'blue', type: pieceList[1].props.type, rot: "v"}],
            ])
        }else if(pieceList[1].props.type == 'square'){
            setNextPieceAllotment([
                [{posRow: 0, posCol: 2, color: 'red', type: pieceList[1].props.type}, {posRow: 0, posCol: 3, color: 'red', type: pieceList[1].props.type}],
                [{posRow: 1, posCol: 2, color: 'red', type: pieceList[1].props.type}, {posRow: 1, posCol: 3, color: 'red', type: pieceList[1].props.type}]
            ])
        }else if(pieceList[1].props.type == "L"){
            setNextPieceAllotment([
                [{posRow: 0, posCol: 2, color: 'green', type: pieceList[1].props.type, type: pieceList[1].props.type, rot: 1}],       
                [{posRow: 1, posCol: 2, color: 'green', center: true, type: pieceList[1].props.type, rot: 1}],
                [{posRow: 2, posCol: 2, color: 'green', type: pieceList[1].props.type, rot: 1}, {posRow: 2, posCol: 3, color: 'green', type: pieceList[1].props.type, rot: 1}]
            ])
        }else if(pieceList[1].props.type == "Z"){
            setNextPieceAllotment([
                [{posRow: 0, posCol: 2, color: 'purple', type: pieceList[1].props.type, rot: "h"}, {posRow: 0, posCol: 3, color: 'purple', type: pieceList[1].props.type, center: true, rot: "h"}],
                [{posRow: 1, posCol: 3, color: 'purple', type: pieceList[1].props.type, rot: "h"}, {posRow: 1, posCol: 4, color: 'purple', type: pieceList[1].props.type, rot: "h"}]
            ])
        }else if(pieceList[1].props.type == "S"){
            setNextPieceAllotment([
                [{posRow: 0, posCol: 3, color: 'yellow', type: pieceList[1].props.type, rot: "h", center: true}, {posRow: 0, posCol: 4, color: 'yellow', type: pieceList[1].props.type, rot: "h"}],
                [{posRow: 1, posCol: 2, color: 'yellow', type: pieceList[1].props.type, rot: "h"}, {posRow: 1, posCol: 3, color: 'yellow', type: pieceList[1].props.type, rot: "h"}]
            ])
        }else if(pieceList[1].props.type == "J"){
            setNextPieceAllotment([
                [{posRow: 0, posCol: 2, color: 'orange', type: pieceList[1].props.type, rot: 1}],       
                [{posRow: 1, posCol: 2, color: 'orange', type: pieceList[1].props.type, center: true, type: pieceList[1].props.type, rot: 1}],
                [{posRow: 2, posCol: 2, color: 'orange', type: pieceList[1].props.type, rot: 1}, {posRow: 2, posCol: 1, color: 'orange', type: pieceList[1].props.type, rot: 1}]
            ])
        }else if(pieceList[1].props.type == "T"){
            setNextPieceAllotment([
                [{posRow: 0, posCol: 3, color: 'dark', type: pieceList[1].props.type, rot: 1}],       
                [{posRow: 1, posCol: 2, color: 'dark',  type: pieceList[1].props.type, rot: 1}, {posRow: 1, center: true, rot: 1, posCol: 3, color: 'dark', type: pieceList[1].props.type}, {posRow: 1, rot: 1, posCol: 4, color: 'dark', type: pieceList[1].props.type}]
            ])
        }
    }, [pieceList])
    return [pieceAllotment, setPieceAllotment, pieceList, setPieceList, nextPieceAllotment, setNextPieceAllotment]
};
let static_pieces = [<Piece type={'T'} active={true} />, 
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
    <Piece type={'square'} active={true} />]
export {usePieceAllotment}