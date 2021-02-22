import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profile'

const Education = ({education, deleteEducation}) => {

const educations = education.map(el=> (
    <tr key={el._id}>
        <td>{el.school} </td>
        <td className="hide-sm">{el.degree}</td>
        <td> 
            <Moment format="YYYY/MM/DD">
                {el.from}
            </Moment> - {' '} {el.to===null? ('Now'):(<Moment format="YYYY/MM/DD">{el.to}</Moment>)}
        </td>
        <td><button onClick={(e)=> deleteEducation(el._id)} className="btn btn-danger">Delete</button></td>
    </tr>
))

    return (
        <Fragment>
            <h1 className="my-2">Education Credentials</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Years</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>{educations}</tbody>
                </table>
        </Fragment>
    )
}

export default connect(null,{deleteEducation})(Education)
