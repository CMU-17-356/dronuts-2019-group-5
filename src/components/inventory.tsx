import * as React from 'react';
import { Component, ChangeEvent, FormEvent } from 'react';
import './inventory.css';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


export interface InventoryItemProps{
    id: string;
    name: string;
    ingredients: string;
    priceInCents: number;
    inStock: boolean;
}

export interface InventoryProps {
  items: InventoryItemProps[];
}

export interface InventoryState{
    compilation: {[key: string]: InventoryItemProps};
    newEntry: InventoryItemProps;
    notificationDOMRef: any;
}


export class Inventory extends React.Component<InventoryProps, InventoryState> { 
    constructor(props: InventoryProps) {
    super(props);
        
    let compilation: {[key: string]: InventoryItemProps} = {};
    
    for (let item of this.props.items) {
      compilation[item.id] = item;
    }
    
    let tempEntry: InventoryItemProps = enterEntry();

    this.state = {
      compilation: compilation,
      newEntry: tempEntry,
      notificationDOMRef: React.createRef(),
    };
        
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNotification = this.addNotification.bind(this);
    
  }
     
    render() {
        return (
          <div className="keyed-inventory-container">
            Inventory
            {this.renderInput()}
            {this.renderCompleteInventory()}
            {this.renderNotificationButton()}
          </div>
        );
      }

    addNotification(orderId: string, messageBody : string) {
    let messageFull = orderId.concat(" ", messageBody, " was just ordered");
    return () => this.state.notificationDOMRef.current.addNotification({
      title: "You have a new order!",
      message: messageFull ,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 9000 },
      dismissable: { click: true }
    });
  }

  renderNotificationButton(){
  return (
      <div className="app-content">
        <ReactNotification ref={this.state.notificationDOMRef} />
        <button onClick={this.addNotification(this.state.compilation[1].id, this.state.compilation[1].name)} className="btn btn-primary">
          Add Notification
        </button>
      </div>
    );
   }

  
  handleChange(event: ChangeEvent<HTMLInputElement>){
        const target = event.target;
  
        this.setState({
         newEntry: {
           ...this.state.newEntry,
            [target.name]: target.value
          }
         });
      
      
       if(target.name == "inStock"){
            this.setState({
         newEntry: {
           ...this.state.newEntry,
            [target.name]: target.checked
          }
         });
        }
         
        }
          
  handleSubmit(event: FormEvent) {
        event.preventDefault();
        
        let tempEntry: InventoryItemProps = enterEntry();
        if (this.state.compilation[this.state.newEntry.id]){
            alert('A donut with that ID was already submitted: ');
            }
        else{
            this.setState({
           compilation:{
               ...this.state.compilation,
               [this.state.newEntry.id] : this.state.newEntry
           },
           newEntry: tempEntry
       });
      alert('A donut was submitted: ');
        }
    }

  renderInput() {
    return (
    <div className="input-container">
      <form onSubmit={this.handleSubmit}> 
          <label> ID:
          <input 
              name = "id"
              type="text"
              value={this.state.newEntry.id}
              onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Name:
          <input
              name = "name"
              type="text"
              value={this.state.newEntry.name}
              onChange={this.handleChange} />
        </label>
        <br />
        <label>
         Ingredients:
          <input 
              name ="ingredients"
              type="text"
              value={this.state.newEntry.ingredients}
              onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Price (in cents):
          <input
            name="priceInCents"
            type="number"
            value={this.state.newEntry.priceInCents}
            onChange={this.handleChange} />
        </label>
        <br />
        <label className="checkbox">
            <input
                name="inStock"
                type="checkbox"
                checked={this.state.newEntry.inStock}
                onChange={this.handleChange}
            />
            This is currently in stock
        </label>
        <div className="field">
            <div className="control">
                <input
                  type="submit"
                  value="Submit"
                  className="button is-primary"
                />
            </div>
        </div>
      </form>
      </div>
    )
  }

  renderCompleteInventory() {
    let nonzero: InventoryItemProps[] = [];
    for (let key of Object.keys(this.state.compilation)) {
      if (this.state.compilation[key]) {
        nonzero.push(this.state.compilation[key]);
      }
    }

    if (nonzero.length == 0) {
      return <div className="inventory-container" />;
    }

    const compilationItems = nonzero.map(
      (item: InventoryItemProps) => (this.renderInventoryItem(item))
    );


    return (
      <div className="compilation-container">
        <h1 className="compilation-title">Inventory</h1>
        <table className="compilation">  
          <tbody>
            <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Ingredients</th> 
            <th>Price</th>
            <th>In Stock?</th>
            </tr>
            {compilationItems}
          </tbody>
        </table>
      </div>
    )
  }    

  updateInStock(id:string){
      return () => {
        this.setState(prevState => ({
        ...prevState,
        compilation: {
          ...prevState.compilation,
          [id]: {
            ...prevState.compilation[id],
            inStock: !(prevState.compilation[id].inStock)
          }
        }
      }));
      }
  }

  renderInventoryItem(itemProps: InventoryItemProps){
    const {
        id,
        name,
        ingredients,
        priceInCents,
        inStock
    } = itemProps;

    if (priceInCents < 0) {
        throw new Error(`Illegal price ${priceInCents}`);
    }

    return (
      <tr className="inventory-item" key={id}>
        <td>{id}</td>
            <td className="inventory-item-name">{name}</td>
        <td className="inventory-item-ingredients">{ingredients}</td>
        <td className="inventory-item-price price">{formatPrice(priceInCents)}</td>
        <td className="inventory-item-instock">{displayYesNo(inStock)}</td>
        <span className="inventory-item-instock-value"></span>
          <button className="inventory-item-instock-toggle-button" onClick={this.updateInStock(id)}> Update </button>
      </tr>
    );
  }
    
}
function displayYesNo(inStock: boolean): string{
    if(inStock){
        return "Yes";
    }
    else{
        return "No";
    }
}

function enterEntry(): InventoryItemProps {
    let newEntry = {id:"-1", name: "none", ingredients: "None", priceInCents : 0, inStock: false};
    
    return newEntry;
}

function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}

export default Inventory;