import './App.css';
import { useEffect,useState } from 'react';
import blue from "./img/blue-candy.png"
import red from "./img/red-candy.png"
import orange from "./img/orange-candy.png"
import green from "./img/green-candy.png"
import purple from "./img/purple-candy.png"
import yellow from "./img/yellow-candy.png"
import blank from "./img/blank.png"
import ScoreBoard from './components/ScoreBoard';
function App() {
  const colors=[blue,red,green,orange,purple,yellow]
  const width=8
const [allColors,setAllColors]=useState([])
const [start,setStart]=useState(null)
const [end,setEnd]=useState(null)
const [isFirstReder,setIsFirstReder]=useState(false)
const [score,setScore]=useState(0)
const fillWithRandomColors=()=>{
  const selected64colors=[]
  for(let i=0;i<width*width;i++){
    const randomColor=colors[Math.floor(Math.random()*colors.length)]
    selected64colors.push(randomColor)
  }
 
  setAllColors(selected64colors)
 
}

useEffect(() => {

  
  fillWithRandomColors()

}, [])


const checkFor4Columns=()=>{
  for(let i=0;i<=39;i++){
    const fourCols=[i,i+width,i+2*width,i+3*width]
 const fitstNumber=allColors[i]
 const isBlank = allColors[i] === blank

 if(fourCols.every(el=>allColors[el]===fitstNumber && !isBlank)){
  setScore((scor)=>scor+4)

  fourCols.forEach(el=>allColors[el]=blank)
  return true
 }

// for(let j=0;j<64;j++){
//   if(allColors[j]===""){
  
//     allColors[j]=allColors[j-width]
//     allColors[j-width]=""
//   }
// }

  }
}
const checkFor4Rows=()=>{
  for(let i=0;i<=64;i++){
    const fourRows=[i,i+1,i+2]
    const notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
 const fitstNumber=allColors[i]
 const isBlank = allColors[i] === blank
if(notValid.includes(i))continue

 if(fourRows.every(el=>allColors[el]===fitstNumber && !isBlank)){
  setScore((scor)=>scor+4)
  fourRows.forEach(el=>allColors[el]=blank)
  return true
 }



  }
}


const checkFor3Columns=()=>{
  for(let i=0;i<=47;i++){
    const threeCols=[i,i+width,i+2*width]
 const fitstNumber=allColors[i]
 const isBlank = allColors[i] === blank
 if(threeCols.every(el=>allColors[el]===fitstNumber && !isBlank)){
  setScore((scor)=>scor+3)
  threeCols.forEach(el=>allColors[el]=blank)
  return true
 }

// for(let j=0;j<64;j++){
//   if(allColors[j]===""){
  
//     allColors[j]=allColors[j-width]
//     allColors[j-width]=""
//   }
// }

  }
}


const checkFor3Rows=()=>{
  for(let i=0;i<=64;i++){
    const threeRows=[i,i+1,i+2]
    const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
 const fitstNumber=allColors[i]
 const isBlank = allColors[i] === blank

if(notValid.includes(i))continue

 if(threeRows.every(el=>allColors[el]===fitstNumber && !isBlank)){
  setScore((scor)=>scor+3)
  threeRows.forEach(el=>allColors[el]=blank)
  return true
 }

//  for(let j=0;j<64;j++){
//   if(allColors[j]===""){
  
//     allColors[j]=allColors[j-width]
//     allColors[j-width]=""
//   }
// }
  }
}


console.log(score);


const moveBlackUp=()=>{
  let firstRow=[0,1,2,3,4,5,6,7]
   for(let j=0;j<64;j++){
      if(firstRow.includes(j)){
        if((firstRow&&allColors[j])===blank){
           const randomNumber=Math.floor(Math.random()*colors.length)
           allColors[j]=colors[randomNumber]
          
        }
      }


  if(allColors[j]===blank){
  
    allColors[j]=allColors[j-width]
    allColors[j-width]=blank
  }
}

}


// const validMoves=[start.dataid+1,start.dataid-1,start.dataid+width,start.dataid+1]


 
 
//   const validMove=[getDataIdOfStart+1,getDataIdOfStart-1,getDataIdOfStart+width,getDataIdOfStart-width]
//  const getDataIdOfEnd=parseInt(end.getAttribute("data-id"))
 
//  if(validMove.includes(getDataIdOfEnd)){
//   let temp=allColors[getDataIdOfStart]
//   allColors[getDataIdOfStart]=allColors[getDataIdOfEnd]
//   allColors[getDataIdOfEnd]=temp
  
//  }




const dragStart=(e)=>{
  
setStart(e.target)
// if(isFirstReder){

//   const getDataIdOfStart=parseInt(start.getAttribute("data-id"))
//   console.log(getDataIdOfStart);
// }
}

const dragDrop=(e)=>{
 setEnd(e.target)

}

const dragEnd=()=>{
 
const startId=parseInt(start.getAttribute('data-id'))
const endId=parseInt(end.getAttribute('data-id'))
if(startId===endId){
  return
}

const isValid=[startId+1,startId-1,startId+width,startId-width]

allColors[endId]=start.getAttribute("src")
allColors[startId]=end.getAttribute("src")
// console.log(allColors[endId],allColors[startId]);
const isValidTrue=isValid.includes(endId)
// console.log(isValidTrue);
let is4Column=checkFor4Columns()
let is4Rows=checkFor4Rows()
let is3Column=checkFor3Columns()
let is3Rows=checkFor3Rows()
if(endId && isValidTrue && (is4Column || is4Rows || is3Column || is3Rows)){
 
  setStart(null)
  setEnd(null)
}else{
  allColors[endId]=end.getAttribute("src")
  allColors[startId]=start.getAttribute("src")
}


}

useEffect(() => {
  const Timer=setInterval(()=>{
    checkFor4Columns()
    checkFor4Rows()
    checkFor3Columns()
    checkFor3Rows()
    moveBlackUp()
    
    setAllColors([...allColors])
  
  },100)
   return()=>clearInterval(Timer)
}, [checkFor4Columns,checkFor4Rows,checkFor3Columns,checkFor3Rows,moveBlackUp])
  return (
    <div className="App">
<ScoreBoard score={score}/>
       <div className="game">
       {allColors.map((color,index)=>(
       <img
      
         key={index}
         alt={color}
         src={color}
         data-id={index}
         draggable={true}
         onDragStart={dragStart}
         onDragOver={(e)=>e.preventDefault()}
         onDragEnter={(e)=>e.preventDefault()}
         onDragLeave={(e)=>e.preventDefault()}
         onDrop={dragDrop}
         onDragEnd={dragEnd}
         
        
         />
       ))}
       </div>
    </div>
  );
}

export default App;
