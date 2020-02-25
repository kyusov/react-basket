import React from 'react'

export default props => (
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Count</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                props.basket.map((el, index) => {
                    return (
                        <tr key={el.name + index}>
                            <td>{el.name}</td>
                            <td>{el.price}</td>
                            <td>{el.count}</td>
                            <td>
                                <button
                                    className="delete-btn button"
                                    value={el.name}
                                    onClick={props.deleteItem}
                                >Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
            <tr>
                <td><span>Total</span>:</td>
                <td>{props.amount}</td>
                <td>{props.count}</td>
                <td></td>
            </tr>
        </tbody>
    </table>
)