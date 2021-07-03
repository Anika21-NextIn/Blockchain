import React, {useState} from 'react'
import './custom.css';
export default function Fir({fir, account}) {
    const [data, setData] = useState({firstName: '', lastName: '', nid: '', content: ''});
    const [id, setId] = useState(1);

    const handleChange = e => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleClick = async e => {
        e.preventDefault();
        const { firstName, lastName, nid, content } = data;
        await fir.methods.addFir(nid, firstName, lastName, content)
            .send({from: account});
        setId(val => val + 1);
    }



    return (

        <div className="fir">
            <div  className="bimg">
            <img src="https://seeklogo.com/images/G/Government_of_the_people_s_republic_of_Bangladesh-logo-75C58712F3-seeklogo.com.png" ></img>
            </div> 
            <p className="ptitle">
            Write Down Your FIR
            
            </p>
            <div className="box">
            <label htmlFor="name">First Name</label>
            <input type="text" name="firstName" onChange={handleChange} />

            <label htmlFor="name">Last Name</label>
            <input type="text" name="lastName" onChange={handleChange} />

            <label htmlFor="nid">NID No.</label>
            <input type="text" name="nid" onChange={handleChange} />

            <p><label htmlFor="content" >Fir Content ( Write Down Your Complain in Details )</label></p>
            <textarea name="content" id="" cols="135" rows="5" onChange={handleChange}></textarea>

            <button className="button" onClick={handleClick}>Submit</button>
            </div>
        </div>
    )
}
