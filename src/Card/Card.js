import React from 'react'

export default props => (
    <div className="card">
        <img className="card-img" src={props.img} alt={props.name} />
        <h3>{props.name}</h3>
        <p>{props.price} $</p>
        <button className="item-btn button" onClick={props.btnClick} value={props.name}>Buy</button>
    </div>
)