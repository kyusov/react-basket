import React, { Component } from 'react';
import './App.css';
import Card from './Card/Card'
import Basket from './BasketList/Basket'

class App extends Component {

  state = {
    cars: [
      { name: 'Porsche 911 Carrera T', price: 20000, img: './pic/porsсhe.jpg' },
      { name: 'BMW M8 GRan Coupe', price: 80000, img: './pic/bmw.jpg' },
      { name: 'Ford Mustang GT', price: 100000, img: './pic/ford.jpg' }
    ],
    basket: JSON.parse(localStorage.getItem('basket')) || [],
    amount: JSON.parse(localStorage.getItem('amount')) || 0,
    count: JSON.parse(localStorage.getItem('count')) || 0
  }

  buyBtnHandler(event) {
    const cardName = event.target.value
    let basket = [...this.state.basket]

    const index = basket.findIndex(el => el.name === cardName) // назодим индекс текущей машины

    if (index >= 0) { // если она есть в корзине +1
      basket[index].count += 1
      this.setState({
        count: this.state.count + 1,
        amount: this.state.amount + basket[index].price
      })
    } else { // если нет, добавляем
      basket.push({
        name: cardName,
        price: this.state.cars.find(el => el.name === cardName).price,
        count: 1
      })
      this.setState({
        count: this.state.count + 1,
        amount: this.state.amount + basket[basket.length - 1].price
      })
    }

    this.setState({ basket })
  }

  deleteBtnHandler(event) {
    const cardName = event.target.value
    let basket = [...this.state.basket]

    const index = basket.findIndex(el => el.name === cardName) // назодим индекс текущей машины

    basket[index].count -= 1

    if (basket[index].count <= 0) {

      const amount = this.state.amount - basket[index].price // сначала уменьшаем amount
      const count = this.state.count - 1 // уменьшаем кол-во

      basket = basket.filter(el => el.count > 0)

      this.setState({ basket, amount, count }) // потом удаляем элемент
    } else {
      this.setState({
        count: this.state.count - 1,
        amount: this.state.amount - basket[index].price
      })
    }

    this.setState({ basket })
  }

  orderBtnHandler() {
    localStorage.setItem('basket', JSON.stringify(this.state.basket, null, '\t'))
    localStorage.setItem('amount', this.state.amount)
    localStorage.setItem('count', this.state.count)
    alert('Заказ сделан! Проверьте localStorage')
  }

  clearOrderBtnHandler() {
    console.log(JSON.parse(localStorage.getItem('basket')))
    this.setState({ basket: [] })
    localStorage.clear()
    alert('Корзина полностью очищена')
  }

  render() {
    return (
      <div className="app">
        <div className="list">
          {this.state.cars.map(e => {
            return (
              <Card
                name={e.name}
                img={e.img}
                price={e.price}
                key={e.name}
                btnClick={this.buyBtnHandler.bind(this)}
              />
            )
          })}
        </div>
        {
          this.state.basket.length > 0
            ?
            <div className="basket">
              <div className="basket-control">
                <button className="button order-btn" onClick={this.orderBtnHandler.bind(this)}>Place an order</button>
                <button className="button clear-btn" onClick={this.clearOrderBtnHandler.bind(this)}>Clear</button>
              </div>
              <Basket
                basket={this.state.basket}
                count={this.state.count}
                amount={this.state.amount}
                deleteItem={this.deleteBtnHandler.bind(this)}
              />
            </div>
            : null
        }

      </div>
    )
  }
}

export default App
