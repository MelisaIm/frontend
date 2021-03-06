import React, {PureComponent} from "react";
import UserProfileComponentItem from './UserProfileComponentItem'

export default class UserProfileComponent extends PureComponent {

    render() {
        return (
            <div>
                <h3 style={{margin: "20px 10px 10px 20px"}}>{this.props.title}</h3>
                {!this.props.data ?
                    <div style={{padding: "30px"}}>
                        Loading...
                    </div>
                    :
                    <div>
                        {this.props.data.map(component =>
                            <div key={component.id}>
                                <UserProfileComponentItem
                                    data={component}
                                    userId={this.props.userId}
                                    authenticatedId={this.props.authenticatedId}
                                    controls={this.props.controls}
                                    handleDeleteFan={this.props.handleDeleteFan}
                                    history={this.props.history}
                                />
                            </div>
                        )}
                    </div>
                }
            </div>

        )
    }

}
