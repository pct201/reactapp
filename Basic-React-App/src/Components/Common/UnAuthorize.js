import React from 'react'

export default class UnAuthorize extends React.Component {
    render() {
        return (
            <main className="main-content" >
                <div className="container-fluid">
                    <div className="titlebtn">
                        <div className="title">
                            <h1>UnAuthorized Access </h1>
                        </div>
                    </div>
                    <div>
                        <p>You have attempted to access a page that you are not authorized to view.</p>
                        <p>If you have any questions, please contact the site administrator.</p>
                    </div>
                </div>
            </main >
        )
    }
}