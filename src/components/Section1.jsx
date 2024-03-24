import { useState } from "react"
import Session from "./Session"

export default function Section1() {
    const [inSession, setSession] = useState(null)

    const startSession = function(e) {
        e.preventDefault()
        setSession({
            enemies: e.target["enemyNum"].value
        })
    }
    
    const endSession = function() {
        const conf = window.confirm("End Session?")
        if(conf)    
            setSession(null)
    }
    
    return (
        <section id="shuffler" className="about">
            <div className="container" data-aos="fade-up">

                <div className="section-title">
                    <h2>Shuffler</h2>
                    <p>Automate ordering and enemy behaviour roll</p>
                </div>

                <div className="row">
                    { inSession ? (
                        <Session endSession={()=>endSession()} session={inSession}/>
                    ) : (
                        <form onSubmit={(e)=>startSession(e)}>
                            <label className="row">
                                <span 
                                    className="col-6"
                                    style={{
                                        textAlign: "right"
                                    }}
                                >Number of enemies:</span>
                                <input 
                                    className="col-3" 
                                    type="number" 
                                    required={true} 
                                    defaultValue={1}
                                    min={1} 
                                    max={4} 
                                    name="enemyNum"
                                />
                            </label>
                            <button className="col-8" type="submit">Start</button>
                        </form>
                    )}
                </div>

            </div>
        </section>
    )
}