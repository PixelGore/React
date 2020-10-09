//Imports
import React, { useEffect } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, saveProfile } from '../../Redux/Reducers/profileReducer'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/reduxStore';
import { ProfileType } from '../../types/types';


//ProfileContainer
// const ProfileContainerF: React.FC<PropsType> = (props) => {

//     const refreshProfile = () => {
//         let userId: number | null = +props.match.params.userId;
//         if (!userId) {
//             userId = props.loggedUserId;
//             if (!userId) {
//                 props.history.push("/login");
//             }
//         }

//         if (!userId) {
//             console.error('No userId')
//         } else {
//             props.getUserProfile(userId)
//             props.getStatus(userId)
//         }
//     }


//     useEffect(() => {
//         refreshProfile()
//     }, [props.match.params.userId])

//     return (
//         <Profile {...props}
//             isOwner={!props.match.params.userId} />
//     )

// }

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.loggedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }

        if (!userId) {
            console.error('No userId')
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }

    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                isOwner={!this.props.match.params.userId} />
        )
    }
}
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<{ userId: string }>;


//MSTP
let mapStateToProps = (state: AppStateType) => ({
    loggedUserId: state.auth.userId,
    // isAuth: state.auth.isAuth,
})
type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

//Export
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { getUserProfile, getStatus, saveProfile }),
)(ProfileContainer)