import React, { Fragment, useEffect } from 'react';
import {connect} from 'react-redux';
import {getProfiles} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem'

const Profiles = ({profile:{profiles,loading}, getProfiles}) => {

    useEffect(() => {
        getProfiles();
    }, [])
    return (
       <Fragment>
           {loading? <Spinner type="ThreeDots"
    color="#00BFFF"
    height={50}
    width={50}/>: 
           <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i>
                Browse and connect with other developers
            </p>
            <div className="profiles">
                {profiles.length> 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile= {profile}/>
                    ))
                ) : ''} 
            </div>
            </Fragment>
           }
       </Fragment>
    )
}

const mapStateToProps = state =>{
    return{
        profile: state.profile
    }
}

export default connect(mapStateToProps,{getProfiles})(Profiles)
