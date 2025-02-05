export function rotatePiece(pieceAllotment, pieceList, direction){
    let piece_copy = [...pieceAllotment].flat()
    var center = piece_copy.filter((ele) => ele.center)[0]
    var new_piece = []
    if(pieceList[0].props.type == "Z"){
        if(piece_copy[0].rot == "h"){
            new_piece = piece_copy.map((cell) => ({
                ...cell,
                posCol: cell.center ? cell.posCol: 
                        cell.posCol > center.posCol ? cell.posCol - 2:
                        cell.posCol < center.posCol ? cell.posCol + 1: 
                        cell.posCol - 1,
                posRow: cell.center || cell.posCol > center.posCol ? cell.posRow:
                        cell.posCol < center.posCol ? cell.posRow - 1: 
                        cell.posRow - 1,
                rot: "v"
            }))
        }else{
            new_piece = piece_copy.map((cell) => ({
                ...cell,
                posCol: cell.center ? cell.posCol:
                        cell.posRow > center.posRow && cell.posCol < center.posCol ? cell.posCol + 2: 
                        cell.posCol,
                posRow: cell.center ? cell.posRow:
                        cell.posCol === center.posCol && cell.posRow < center.posRow ? cell.posRow + 2: 
                        cell.posRow,
                rot: "h"
            }))
        }
    }else if(pieceList[0].props.type == "S"){
        if(piece_copy[0].rot == "h"){
            new_piece = piece_copy.map((cell) => ({
                ...cell,
                posCol: cell.center ? cell.posCol :
                    cell.posCol > center.posCol ? cell.posCol :
                    cell.posCol < center.posCol ? cell.posCol + 1 : cell.posCol + 1,
                posRow: cell.center ? cell.posRow :
                    cell.posCol < center.posCol ? cell.posRow - 2 : cell.posRow,
                rot: "v",
            }))
        }else{
            new_piece = piece_copy.map((cell) => ({
                ...cell,
                posCol: cell.center ? cell.posCol :
                    cell.posCol > center.posCol && cell.posRow > center.posRow ? cell.posCol - 2 : cell.posCol,
                posRow: cell.center ? cell.posRow :
                    cell.posCol > center.posCol && cell.posRow === center.posRow ? cell.posRow :
                    center.posRow + 1,
                rot: "h",
            }))
        }
    }else if(pieceList[0].props.type == "bar"){
        if(piece_copy[0].rot == "v"){
            new_piece = piece_copy.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posRow :
                        (cell.posCol == center.posCol && (cell.posRow == (center.posRow - 1))) ? center.posRow: 
                        center.posRow,
                posCol: cell.center ? cell.posCol:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posCol - 1: 
                        (cell.posCol == center.posCol && (cell.posRow == (center.posRow - 1))) ? center.posCol + 1:
                        center.posCol - 2,
                rot: "h",
            }));
        }else{//h
            new_piece = piece_copy.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow - 1:
                        ((cell.posCol == (center.posCol - 1)) && cell.posRow == center.posRow) ? center.posRow + 1: 
                        center.posRow - 2,
                posCol: cell.center ? center.posCol:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol: 
                        ((cell.posCol == (center.posCol - 1)) && cell.posRow == center.posRow) ? center.posCol:
                        center.posCol,
                rot: "v",
            }));
        }
        console.log(new_piece)
    }else if(pieceList[0].props.type == "L" || pieceList[0].props.type == "J" || pieceList[0].props.type == "T"){
        var to_stage
        console.log(piece_copy[0].rot)
        if(piece_copy[0].rot == 1)
            if(direction == "r"){
                to_stage = 2
            }
            else
                to_stage = 4
        else if(piece_copy[0].rot == 2){
            if(direction == "r"){
                to_stage = 3
            }
            else
                to_stage = 1
        }else if(piece_copy[0].rot == 3){
            if(direction == "r"){
                to_stage = 4
            }
            else
                to_stage = 2
        }else if(piece_copy[0].rot == 4){
            if(direction == "r"){
                to_stage = 1
            }
            else
                to_stage = 3
        }
        console.log(piece_copy[0].rot)
        console.log(to_stage)
        new_piece = _setStage(pieceList[0].props.type, to_stage, piece_copy, center, piece_copy[0].rot)
    }else{
        new_piece = [...pieceAllotment]
    }  
    return [new_piece]
}
const _setStage = (type, stage, piece, center, from)  => {
    console.log(type)
    console.log(stage)
    console.log(piece)
    let ret_map = []
    if(type == "L"){
        if((stage == 1 && from == 4)){
                ret_map = piece.map((cell) => ({
                    ...cell,
                    posRow: cell.center ? cell.posRow:
                            cell.posCol > center.posCol && cell.posRow < center.posRow ? center.posRow + 1:
                            cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow + 1: 
                            center.posRow -1,
                    posCol: cell.center ? cell.posCol:
                            cell.posCol > center.posCol && cell.posRow < center.posRow ? cell.posCol: 
                            cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol:
                            center.posCol ,
                    rot: stage
                }));
        }
        else if(stage == 1 && from == 2){//left
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow - 1:
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posRow + 1: 
                        center.posRow + 1,
                posCol: cell.center ? cell.posCol:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol : 
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posCol :
                        center.posCol + 1,
                rot: stage
            }));
        }else if((stage == 2 && from == 1)){
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol > center.posCol && cell.posRow > center.posRow ? center.posRow + 1:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posRow: 
                        center.posRow,
                posCol: cell.center ? cell.posCol:
                        cell.posCol > center.posCol && cell.posRow > center.posRow ? center.posCol - 1: 
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posCol - 1:
                        cell.posCol + 1,
                rot: stage
            }));
           
        }else if(stage == 2 && from == 3){//left
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posRow > center.posRow ? center.posRow :
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posRow: 
                        center.posRow + 1,
                posCol: cell.center ? cell.posCol:
                        cell.posRow > center.posRow ? center.posCol + 1: 
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posCol - 1:
                        center.posCol - 1,
                rot: stage
            }));
        }else if((stage == 3 && from == 2)){
                ret_map = piece.map((cell) => ({
                    ...cell,
                    posRow: cell.center ? cell.posRow:
                            cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow + 1:
                            cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posRow - 1:
                            center.posRow - 1,
                    posCol: cell.center ? cell.posCol:
                            cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol:
                            cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posCol:
                            cell.posCol,
                    rot: stage
                }));
            
        }else if(stage == 3 && from == 4){//left
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow - 1:
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posRow + 1:
                        center.posRow - 1,
                posCol: cell.center ? cell.posCol:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol:
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posCol:
                        center.posCol - 1,
                rot: stage
            }));
        }else{
            if((stage == 4 && from == 3))
                ret_map = piece.map((cell) => ({
                    ...cell,
                    posRow: cell.center ? cell.posRow:
                            cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posRow:
                            cell.posCol < center.posCol && cell.posRow < center.posRow ? center.posRow - 1:
                            center.posRow ,
                    posCol: cell.center ? cell.posCol:
                            cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posCol - 1:
                            cell.posCol < center.posCol && cell.posRow < center.posRow ? center.posCol + 1:
                            cell.posCol + 1,
                    rot: stage
                }));
            else//left stage == 4  && from == 1
                ret_map = piece.map((cell) => ({
                    ...cell,
                    posRow: cell.center ? cell.posRow:
                            cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posRow:
                            cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posRow :
                            center.posRow -1,
                    posCol: cell.center ? cell.posCol:
                            cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posCol + 1:
                            cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posCol - 1:
                            center.posCol + 1,
                    rot: stage
                }));
        }
    }
     if(type == "J"){
        if((stage == 1 && from == 4)){//done
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol > center.posCol && cell.posRow > center.posRow ? center.posRow + 1:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow - 1: 
                        center.posRow  + 1,
                posCol: cell.center ? cell.posCol:
                        cell.posCol > center.posCol && cell.posRow > center.posRow ? center.posCol: 
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol:
                        center.posCol - 1,
                rot: stage
            }));
        }else if(stage == 1 && from == 2){//left //done
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow - 1:
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posRow + 1: 
                        center.posRow + 1,
                posCol: cell.center ? cell.posCol:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol : 
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posCol :
                        center.posCol - 1,
                rot: stage
            }));
        }else if((stage == 2 && from == 1)){//done
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol < center.posCol && cell.posRow > center.posRow ? center.posRow - 1:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posRow: 
                        center.posRow,
                posCol: cell.center ? cell.posCol:
                        cell.posCol > center.posCol && cell.posRow > center.posRow ? center.posCol - 1: 
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posCol+ 1:
                        center.posCol- 1,
                rot: stage
            }));
           
        }else if(stage == 2 && from == 3){//left //done
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posRow > center.posRow ? center.posRow :
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posRow: 
                        center.posRow - 1,
                posCol: cell.center ? cell.posCol:
                        cell.posRow > center.posRow ? center.posCol + 1: 
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posCol - 1:
                        center.posCol - 1,
                rot: stage
            }));
        }
        else if((stage == 3 && from == 2)){ //done
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow + 1:
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posRow - 1:
                        center.posRow - 1,
                posCol: cell.center ? cell.posCol:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol:
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posCol:
                        center.posCol + 1 ,
                rot: stage
            }));
        
        }else if(stage == 3 && from == 4){//left //done
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow - 1:
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posRow + 1:
                        center.posRow - 1,
                posCol: cell.center ? cell.posCol:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol:
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posCol:
                        center.posCol + 1,
                rot: stage
            }));
        }else if((stage == 4 && from == 3)){ //done
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posRow:
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posRow:
                        center.posRow + 1,
                posCol: cell.center ? cell.posCol:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posCol - 1:
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posCol + 1:
                        center.posCol + 1,
                rot: stage
            }));
        }else if((stage == 4 && from == 1)){//done
            ret_map = piece.map((cell) => ({
                    ...cell,
                    posRow: cell.center ? cell.posRow:
                            cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posRow:
                            cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posRow :
                            center.posRow + 1,
                    posCol: cell.center ? cell.posCol:
                            cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posCol + 1:
                            cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posCol - 1:
                            center.posCol + 1,
                    rot: stage
            }));
        }
    }
    if(type == "T"){
        if((stage == 1 && from == 4)){
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posRow :
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? cell.posRow: 
                        cell.posRow,
                posCol: cell.center ? cell.posCol:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posCol + 1: 
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? cell.posCol:
                        cell.posCol,
                rot: stage
            }));
        }else if(stage == 1 && from == 2){//left //done
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posRow:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posRow: 
                        center.posRow - 1,
                posCol: cell.center ? cell.posCol:
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posCol - 1: 
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posCol + 1:
                        center.posCol ,
                rot: stage
            }));
        }else if((stage == 2 && from == 1)){//done
            console.log("first rotation")
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posRow - 1:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow + 1: 
                        center.posRow,
                posCol: cell.center ? cell.posCol:
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posCol: 
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol:
                        center.posCol + 1,
                rot: stage
            }));
           
        }else if(stage == 2 && from == 3){//left //done
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow - 1:
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posRow + 1: 
                        center.posRow ,
                posCol: cell.center ? cell.posCol:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol: 
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? center.posCol:
                        center.posCol + 1,
                rot: stage
            }));
        }
        else if((stage == 3 && from == 2)){ //done
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posRow:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posRow :
                        center.posRow + 1,
                posCol: cell.center ? cell.posCol:
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posCol + 1:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? center.posCol - 1:
                        center.posCol ,
                rot: stage
            }));
        
        }else if(stage == 3 && from == 4){//left //done
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posRow:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ? cell.posRow:
                        cell.posRow,
                posCol: cell.center ? cell.posCol:
                        cell.posCol == center.posCol && cell.posRow < center.posRow ? center.posCol + 1:
                        cell.posCol == center.posCol && cell.posRow > center.posRow ?  cell.posCol:
                        cell.posCol,
                rot: stage
            }));
        }else if((stage == 4 && from == 3)){ //done
            ret_map = piece.map((cell) => ({
                ...cell,
                posRow: cell.center ? cell.posRow:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow - 1://
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? cell.posRow:
                        cell.posRow,
                posCol: cell.center ? cell.posCol:
                        cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol://
                        cell.posCol < center.posCol && cell.posRow == center.posRow ? cell.posCol:
                        cell.posCol,
                rot: stage
            }));
        }else if((stage == 4 && from == 1)){//left
            ret_map = piece.map((cell) => ({
                    ...cell,
                    posRow: cell.center ? cell.posRow:
                            cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posRow + 1:
                            cell.posCol < center.posCol && cell.posRow == center.posRow ? cell.posRow :
                            cell.posRow,
                    posCol: cell.center ? cell.posCol:
                            cell.posCol > center.posCol && cell.posRow == center.posRow ? center.posCol:
                            cell.posCol < center.posCol && cell.posRow == center.posRow ? cell.posCol:
                            cell.posCol,
                    rot: stage
            }));
        }
    }
    console.log(ret_map)
    return ret_map
}
export function movePieceLeft(pieceAllotment){
    return pieceAllotment.map((row) =>
        row.map((piece) => ({
            ...piece,
            posCol: parseInt(piece.posCol) - 1,
        })))
}
export function movePieceRight(pieceAllotment){
    return pieceAllotment.map((row) =>
        row.map((piece) => ({
            ...piece,
            posCol: parseInt(piece.posCol) + 1,
        })))
}
export function progressPieceDownward(pieceAllotment){
    // setPieceAllotment((prevAllotment) =>
    //   {
        return pieceAllotment.map((row) =>
          row.map((piece) => ({
            ...piece,
            posRow: parseInt(piece.posRow) + 1, // Update posRow
          }))
        )
     // }
   // );
  }
export function willCollideWithOccupiedCell(piece, whichCase){

}
//Z, h V1
 // for(var i = 0; i < piece_copy.length; i++){
                    //     let this_cell = piece_copy[i]
                    //     if(!this_cell.center){
                    //         if(this_cell.posCol > center.posCol){
                    //             new_piece.push({
                    //                 posCol: this_cell.posCol - 2, 
                    //                 posRow: this_cell.posRow /*- 1*/, 
                    //                 color: this_cell.color, 
                    //                 type: this_cell.type, 
                    //                 rot: "v"})
                    //         }else if(this_cell.posCol < center.posCol){
                    //             new_piece.push({
                    //                 posCol: this_cell.posCol + 1, 
                    //                 posRow: this_cell.posRow - 1, 
                    //                 color: this_cell.color, 
                    //                 type: this_cell.type, 
                    //                 rot: "v" })
                    //         }else{
                    //             new_piece.push({
                    //                 posCol: this_cell.posCol - 1, 
                    //                 posRow: this_cell.posRow - 1, 
                    //                 color: this_cell.color, 
                    //                 type: this_cell.type, 
                    //                 rot: "v"})
                    //         }
                    //     }else{//this_cell
                    //         new_piece.push({
                    //             posCol: this_cell.posCol, 
                    //             posRow: this_cell.posRow, 
                    //             color: this_cell.color, 
                    //             type: this_cell.type, 
                    //             rot: "v", center: true
                    //         })
                    //     }
                    // }


//Z, v V1
// for(var i = 0; i < piece_copy.length; i++){
                    //     let this_cell = piece_copy[i]
                    //     if(!this_cell.center){
                    //         if(this_cell.posRow > center.posRow && this_cell.posCol < center.posCol){
                    //             console.log("first")
                    //             new_piece.push({
                    //                 posCol: this_cell.posCol + 2, 
                    //                 posRow: this_cell.posRow, 
                    //                 color: this_cell.color, 
                    //                 type: this_cell.type, 
                    //                 rot: "h"})
                    //         }else if(this_cell.posCol == center.posCol && this_cell.posRow < center.posRow){
                    //             console.log("second")
                    //             new_piece.push({
                    //                 posCol: this_cell.posCol, 
                    //                 posRow: this_cell.posRow + 2, 
                    //                 color: this_cell.color, 
                    //                 type: this_cell.type, 
                    //                 rot: "h" })
                    //         }else{
                    //             console.log("thired")
                    //            new_piece.push({posCol: this_cell.posCol , 
                    //             posRow: this_cell.posRow, 
                    //             color: this_cell.color, 
                    //             type: this_cell.type, 
                    //             rot: "h"})
                    //         }
                    //     }else{//this_cell
                    //         new_piece.push({posCol: this_cell.posCol, 
                    //             posRow: this_cell.posRow, 
                    //             color: this_cell.color, 
                    //             type: this_cell.type, 
                    //             rot: "h", 
                    //             center: true})
                    //     }
                    // }
                    // setPieceAllotment((prevAllotment) => {
                    //     return [new_piece]
                    // })




//S, h V1
// for(var i = 0; i < piece_copy.length; i++){
//     let this_cell = piece_copy[i]
//     if(!this_cell.center){
//         if(this_cell.posCol > center.posCol){
//             console.log("fir")
//             new_piece.push({
//                 posCol: this_cell.posCol, 
//                 posRow: this_cell.posRow, 
//                 color: this_cell.color, 
//                 type: this_cell.type, 
//                 rot: "v"})
//         }else if(this_cell.posCol < center.posCol){
//             console.log("sec")
//             new_piece.push({
//                 posCol: this_cell.posCol + 1, 
//                 posRow: this_cell.posRow -2, 
//                 color: this_cell.color, 
//                 type: this_cell.type, 
//                 rot: "v" })
//         }else{
//             console.log("thir")
//             new_piece.push({
//                 posCol: this_cell.posCol  +1, 
//                 posRow: this_cell.posRow , 
//                 color:this_cell.color, 
//                 type: this_cell.type, 
//                 rot: "v"})
//         }
//     }else{//this_cell
//         console.log("cent")
//         new_piece.push({
//             posCol: this_cell.posCol, 
//             posRow: this_cell.posRow, 
//             color: this_cell.color, 
//             type: this_cell.type, 
//             rot: "v", center: true
//         })
//     }
// }
// setPieceAllotment((prevAllotment) => {
//     return [new_piece]
// })




// //S, v V1
// for(var i = 0; i < piece_copy.length; i++){
//     let this_cell = piece_copy[i]
//     if(!this_cell.center){
//         if(this_cell.posCol > center.posCol && this_cell.posRow > center.posRow){
//             console.log("fir")
//             new_piece.push({
//                 posCol: this_cell.posCol - 2, 
//                 posRow: this_cell.posRow , 
//                 color: "blue",//this_cell.color, 
//                 type: this_cell.type, 
//                 rot: "h"})
//         }else if(this_cell.posCol > center.posCol && this_cell.posRow == center.posRow){
//             console.log("sec")
//             new_piece.push({
//                 posCol: this_cell.posCol , 
//                 posRow: this_cell.posRow , 
//                 color: "red",//this_cell.color, 
//                 type: this_cell.type, 
//                 rot: "h" })
//         }else{
//             console.log("thir")
//             new_piece.push({
//                 posCol: center.posCol, 
//                 posRow: center.posRow + 1, 
//                 color: "green",//this_cell.color, 
//                 type: this_cell.type, 
//                 rot: "h"})
//         }
        
//     }else{//this_cell
//         console.log("cent")
//         new_piece.push({
//             posCol: this_cell.posCol, 
//             posRow: this_cell.posRow, 
//             color: this_cell.color, 
//             type: this_cell.type, 
//             rot: "h", center: true
//         })
//     }
// }