import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function({ endSession, session }) {
    const [currentSeq, setSeq] = useState("gambit")
    const [order, setOrder] = useState([])
    const [prevOrder, setPrevOrder] = useState(null)
    const sequence = ["gambit", "action", "event"]

    const handleSequence = function() {
        
    }

    const orderShuffle = function() {
        const array = [0,1,2,3]
        for(let i = 0; i < session.enemies; i++) {
            array.push(4+i)
        }
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        setPrevOrder(order)
        setOrder(array);
    }

    const restoreOrder = function() {
        setOrder(prevOrder)
        setPrevOrder(null)
    }

    const rollDice = function() {
        const random = Math.ceil(Math.random()*12)
        return random
    }

    useEffect(()=>{
        switch(currentSeq){
            case "gambit":
                orderShuffle()
                break;
            case "action":

                break;
            default:
        }

    },[currentSeq])

    return (
        <>
            { currentSeq === "gambit" ? <Gambit 
                    order={order}   
                    setOrder={(newOrder)=>setOrder(newOrder)} 
                    next={()=>setSeq("action")}
                /> 
                : currentSeq === "action" ? <Action 
                    order={order} 
                    next={()=>setSeq("event")}
                    roll={()=>rollDice()}
                />
                : <Event 
                    next={()=>setSeq("gambit")}
                    roll={()=>rollDice()}
                />
            }
            <button style={{
                marginTop: "2em"
            }} onClick={()=>setSeq("gambit")} disabled={currentSeq === "gambit"}>Shuffle</button>
            <button onClick={()=>restoreOrder()} disabled={prevOrder ? false : true}>Undo Shuffle</button>
            <button onClick={()=>endSession()}>End Session</button>
        </>
    )
}

function Gambit({ next, order, setOrder }) {
    const determineIcon = function(num) {
        switch(num) {
            case 0:
                return "thunder"
            case 1:
                return "comet"
            case 2:
                return "star"
            case 3:
                return "moon"
            default:
                return "skull"
        }
    }
    const skullLoop = function(skulls) {
        const skullLen = new Array(skulls-3).fill(null)
        return (<>
            { skullLen.map((elem) => {
                return (
                    <img 
                        class={`skull${skulls-3}`} 
                        alt={determineIcon(skulls)} 
                        src={`${process.env.PUBLIC_URL}/img/${determineIcon(elem)}.svg`} 
                    />
                )
            })}
        </>)
    };

    // a little function to help us with reordering the result
    const reorder = (list, e) => {
        e.preventDefault()
        const startIndex = e.target["start"].value
        const endIndex = e.target["end"].value
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        setOrder(result);
    };

    return(
        <div>
            <h1>Gambit</h1>
            <form onSubmit={(e)=>reorder(order,e)}>
            { order.map((elem,index) => {
                return (
                    <div key={elem}>
                        <input required={true} type="radio" name="start" value={index}/>
                        {elem < 4 ? (
                                <img class="heroIcon" alt={determineIcon(elem)} src={`${process.env.PUBLIC_URL}/img/${determineIcon(elem)}.svg`} />
                        ) : (
                            <>
                                {skullLoop(elem)}
                            </>
                    )}
                        <input required={true} type="radio" name="end" value={index}/>
                    </div>
                )
            })}
            <button type="submit">Reorder</button>
            </form>
            <button onClick={()=>next()}>Start Action Phase</button>
        </div>
    )
}

function Action({ next, order, roll }) {
    const [currentOrder, setCurrent] = useState(0)
    const [diceNum, setRoll] = useState(0)
    const determineIcon = function(num) {
        switch(num) {
            case 0:
                return "thunder"
            case 1:
                return "comet"
            case 2:
                return "star"
            case 3:
                return "moon"
            default:
                return "skull"
        }
    }
    
    const skullLoop = function(skulls) {
        const skullLen = new Array(skulls-3).fill(null)
        return (<>
            { skullLen.map((elem) => {
                return (
                    <img 
                        class={`skullIconAction${skulls-3}`} 
                        alt={determineIcon(skulls)} 
                        src={`${process.env.PUBLIC_URL}/img/${determineIcon(elem)}.svg`} 
                    />
                )
            })}
        </>)
    };

    useEffect(()=>{
        const diceRoll = roll()
        setRoll(diceRoll)
    },[currentOrder])

    return(
        <div>
            <div className="row">
            { order.map((elem,index) => {
                return (
                    <div key={elem} className={currentOrder === index ? "current-player" : ""}>
                        {elem < 4 ? (<>
                                <img class="heroIconAction" alt={determineIcon(elem)} src={`${process.env.PUBLIC_URL}/img/${determineIcon(elem)}.svg`} />
                                </>
                        ) : (
                            <>
                                {skullLoop(elem)}
                            </>
                    )}
                    </div>
                )
            })}
            </div>
            <div>
                <h1 className="dice-number">{diceNum}</h1>
                <button onClick={()=>setCurrent(currentOrder+1 === order.length ? 0 : currentOrder+1)}>Next Player</button>
            </div>
            <button onClick={()=>next()}>Roll Event Dice</button>
        </div>
    )
}

function Event({ next, roll }) {
    const [diceNum, setRoll] = useState(0)
    useEffect(()=>{
        const diceRoll = roll()
        setRoll(diceRoll)
    },[])

    const getEvent = function() {
        switch(diceNum) {
            case 1: 
                return "Do not make a destiny roll at the start of the next turn."
            case 2: 
            case 3: 
            case 4: 
                return "The hostile group with a model furthest from any hero makes a Move action."
            case 5: 
            case 6: 
                return "Resolve one crisis for your journey from the quest book."
            case 7: 
            case 8: 
                return "Move the nightfall token clockwise one space."
            case 9: 
            case 10: 
                return "Place one hero out of action on the battlefield in the nearest empty space to another hero."
            case 11: 
                return "The leader picks a hero That hero gains 1 inspiration point."
            case 12: 
                return "After the destiny roll is made, move all discarded destiny dice to the available destiny dice section of the skyvessel board."
        }
    }
    return(
        <div>
            <h1>{getEvent()}</h1>
            <button onClick={()=>next()}>New Initiative</button>
        </div>
    )
}