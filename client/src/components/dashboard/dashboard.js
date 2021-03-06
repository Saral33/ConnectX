import React,{Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/profile';
import DashboardAction from './dashboard-action';
import Experience from './Experience'
import Education from './Education'
import Spinner from '../layout/Spinner';


const Dashboard = ({deleteAccount, getCurrentProfile,auth:{user},profile: {profile,loading}}) => {
   
   useEffect(() => {
       getCurrentProfile();
    },[])

    return  loading && profile===null? <Spinner type="ThreeDots"
    color="#00BFFF"
    height={50}
    width={50}/> : <>
        <h1 className='large text-primary'>DashBoard</h1>
        <p className='lead'>
            <i className='fas fa-user'/> Welcome {user && user.name}
        </p>
        {profile!==null? 
        <Fragment>
        <DashboardAction/>
        <Experience experience= {profile.experience}/>
        <Education education={profile.education}/>
        <div className= "my-2">
            <button className= "btn btn-danger" onClick={()=> deleteAccount()}>
                <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
        </div>
        </Fragment>
        
        :
         <Fragment>
        <p>You haven't yet setup your profile, please add some info.</p>
        <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
        </Link>
        </Fragment>
        }
    </>
       
    
}
const mapStateToProps = (state)=>{
    return{
        auth: state.auth,
        profile: state.profile
    }
}
export default  connect(mapStateToProps,{getCurrentProfile, deleteAccount})(Dashboard)
