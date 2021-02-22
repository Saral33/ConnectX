import React, { Fragment, useEffect } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner';
import ProfileTop from '../profile/ProfileTop'
import ProfileAbout from '../profile/ProfileAbout'
import ProfileExperience from '../profile/ProfileExperience'
import ProfileEducation from '../profile/ProfileEducation'
import ProfileGithub from '../profile/ProfileGithub'

const Profile = ({match, getProfile, profile:{loading, profile}, auth}) => {
    
    useEffect(() => {
       getProfile(match.params.id);
}, [getProfile, match.params.id])
    
    return (
        <Fragment>
           {profile===null || loading? 
           <Spinner type="ThreeDots"
           color="#00BFFF"
           height={50}
           width={50}/>: 
           <Fragment>
               <Link to ="/profiles" className="btn btn-light">Back to Profiles</Link>
               {auth.isAuthenticated && auth.user._id=== profile.user._id && !auth.loading && <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>}
              <div className="profile-grid my-1">
                  <ProfileTop profile={profile}/> 
                  <ProfileAbout profile={profile}/> 
                  <div class="profile-exp bg-white p-2">
               <h2 class="text-primary">Experience</h2>
                  {profile.experience.length<=0?'No Experience'
                  :
                  <Fragment>
                      {profile.experience.map(exp=> (
                <ProfileExperience key={exp._id} experience={exp}/>
                ))}
                </Fragment>
                } </div>
                 <div class="profile-edu bg-white p-2">
               <h2 class="text-primary">Education</h2>
                  {profile.education.length<=0?'No Education'
                  :
                  <Fragment>
                      {profile.education.map(exp=> (
                <ProfileEducation key={exp._id} education={exp}/>
                ))}
                </Fragment>
                }
                </div>
                {
                    profile.githubusername && (
                        <ProfileGithub username={profile.githubusername}/>
                    )
                } 
              </div>
             
               </Fragment>} 
        </Fragment>
    )
}

const mapStateToProps = state =>{
    return{
        profile: state.profile,
        auth: state.auth
    }
}

export default connect(mapStateToProps,{getProfile})(Profile)
