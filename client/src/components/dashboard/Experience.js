import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profile'

const Experience = ({experience, deleteExperience}) => {

const experiences = experience.map(el=> (
    <tr key={el._id}>
        <td>{el.company} </td>
        <td className="hide-sm">{el.title}</td>
        <td> 
            <Moment format="YYYY/MM/DD">
                {el.from}
            </Moment> - {' '} {el.to===null? ('Now'):(<Moment format="YYYY/MM/DD">{el.to}</Moment>)}
        </td>
        <td><button onClick={()=> deleteExperience(el._id)} className="btn btn-danger">Delete</button></td>
    </tr>
))

    return (
        <Fragment>
            <h1 className="my-2">Experience Credentials</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th className="hide-sm">Title</th>
                            <th className="hide-sm">Years</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>{experiences}</tbody>
                </table>
        </Fragment>
    )
}

export default connect(null,{deleteExperience})(Experience)
