import React from 'react';
import {Link} from 'react-router-dom';
import { logout} from '../../actions/auth';
import {connect} from 'react-redux'

const Navbar = ({auth:{isAuthenticated, loading}, logout}) => {



  const authLinks =(
    <ul>
      <li>
        <Link to ='/profiles'>
         Developers
        </Link>
      </li>
      <li>
        <Link to ='/posts'>
         Posts
        </Link>
      </li>
      <li>
        <Link to ='/dashboard'>
          <i className='fas fa-user'/>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      
        <li><a onClick={logout} href="#!">
          <i className='fas fa-sign-out-alt'/>{' '}
          <span className='hide-sm'>Log Out</span>
          </a>
          </li>
      </ul>
  )

  const guestlinks =(
    <ul>
       <li>
        <Link to ='/profiles'>
         Developers
        </Link>
      </li>
    
    <li><Link to="/signup">Sign Up</Link></li>
    <li><Link to="/login">Login</Link></li>
  </ul>
  )

    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> ConnectX</Link>
      </h1>
      {!loading && (
      <>
        {isAuthenticated? authLinks:guestlinks}
      </>)}
    </nav>
    )
}

const mapStateToProps=(state)=>{
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps,{logout})(Navbar);
