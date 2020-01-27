import React from 'react';
import { dashBoardService } from '../../Services'

class Dashboard extends React.Component {
    state = {
        totalUsers: 0,
        activeUsers: 0,
        inActiveUsers: 0
    }
    componentDidMount = () => {
        dashBoardService.dashboardDetail().then(result => {
            this.setState({
                totalUsers: result.total_Users,
                activeUsers: result.active_Users,
                inActiveUsers: result.inActive_Users
            })
        })
    }
    render() {
        return (
            <main className="main-content">
                <div className="container-fluid">
                    <div className="title">
                        <h1>Dashboard</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <div className="ct-tile ct-sales">
                            <img src={require('../../images/ic-user-mgmt.svg')} alt="" />
                            <p>Active Users</p>
                            <h3>{this.state.activeUsers}</h3>
                            <span></span>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="ct-tile ct-views">
                        <img src={require('../../images/ic-user-mgmt.svg')} alt="" />
                            <p>Inactive Users</p>
                            <h3>{this.state.inActiveUsers}</h3>
                            <span></span>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="ct-tile ct-users">
                        <img src={require('../../images/ic-user-mgmt.svg')} alt="" />
                            <p>Total Users</p>
                            <h3>{this.state.totalUsers}</h3>
                            <span></span>
                        </div>
                    </div>                   
                </div>



            </main>
        );
    }
}
export default Dashboard;