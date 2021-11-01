import React from 'react'
import '../App.css'

const Loading = () => {
    return (
        <section className="loading">
            <div className="loader">
                <div className="upper ball"></div>
                <div className="right ball"></div>
                <div className="lower ball"></div>
                <div className="left ball"></div>
            </div>
        </section>

    )
}

export default Loading
