import React from 'react';
import Moment from 'react-moment'

const ProfileEducation = ({education:{school,from ,to, description,degree, fieldofstudy }}) => {
    return (
        
             <>
            <h3 class="text-dark">{school}</h3>
            <p> <Moment format="YYYY/MM/DD">{from}</Moment> - {!to? 'Now': <Moment format="YYYY/MM/DD" >{to}</Moment>}</p>
           <p>
               <strong>Degree:</strong> {degree}
           </p>
           <p>
               <strong>Field:</strong> {fieldofstudy}
           </p>
           <p>
           <strong>Description:</strong> {description}
           </p>
        </>
        
    )
}

export default ProfileEducation
